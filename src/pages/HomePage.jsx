import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { getEvents } from "../lib/supabase";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loadEvents() {
      try {
        const data = await getEvents();

        if (!isCancelled) {
          setEvents(data);
          setStatus("ready");
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(error.message);
          setStatus("error");
        }
      }
    }

    loadEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = ["Alle", ...new Set(events.map((event) => event.category).filter(Boolean))];

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title ?? ""} ${event.summary ?? ""} ${event.venueName ?? ""}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  function formatEventDate(eventDate) {
    const date = new Date(eventDate);
    const formattedDate = date.toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter.
        </p>
        <a className="hero-link" href="#events">
          Se kommende events ↓
        </a>
      </header>

      <main id="events">
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Det sker</p>
            <h2>Kommende events</h2>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <section className="filters">
          <label>
            Søg
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Søg efter titel eller sted"
            />
          </label>
          <label>
            Kategori
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        {status === "loading" && (
          <p className="message" role="status">
            Henter events...
          </p>
        )}

        {status === "error" && (
          <p className="message error-message" role="alert">
            Vi kunne ikke hente events lige nu. {errorMessage}
          </p>
        )}

        {status === "ready" && filteredEvents.length === 0 && (
          <p className="message" role="status">
            Der er ingen events, der matcher din søgning.
          </p>
        )}

        {status === "ready" && filteredEvents.length > 0 && (
          <section className="event-grid">
            {filteredEvents.map((event) => (
              <article className="event-card" key={event.id}>
                <img
                  src={event.image}
                  alt={`Stemningsbillede for ${event.title}`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="event-card-content">
                  <p className="event-category">{event.category}</p>
                  <h3>{event.title}</h3>
                  <p>{event.summary}</p>
                  <div className="event-meta">
                    <span>{formatEventDate(event.date)}</span>
                    <span>{event.venueName}</span>
                  </div>
                  <Link className="card-link" to={`/events/${event.id}`}>
                    Læs mere
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
