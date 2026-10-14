import { useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { getEvents } from "../data/events";

const homeHeroImage = `${import.meta.env.BASE_URL}images/pages/home-hero.webp`;

export default function HomePage() {
  const events = getEvents();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");

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
        <img
          className="hero-image"
          src={homeHeroImage}
          alt=""
          width="1800"
          height="1200"
          decoding="async"
          fetchPriority="high"
          aria-hidden="true"
        />
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

        {filteredEvents.length === 0 && (
          <p className="message" role="status">
            Der er ingen events, der matcher din søgning.
          </p>
        )}

        {filteredEvents.length > 0 && (
          <section className="event-grid">
            {filteredEvents.map((event) => (
              <article className="event-card" key={event.id}>
                <img
                  src={event.image}
                  alt={`Stemningsbillede for ${event.title}`}
                  width="800"
                  height="600"
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
                  <Link className="card-link" to={`/events/${event.id}`} state={{ event }}>
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
