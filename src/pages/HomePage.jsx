import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import Footer from "../components/Footer";
import { getEvents } from "../data/events";

const homeHeroImage = `${import.meta.env.BASE_URL}images/pages/home-hero.webp`;
const communityImage = `${import.meta.env.BASE_URL}images/pages/about-hero.webp`;

export default function HomePage() {
  const location = useLocation();
  const eventControlsRef = useRef(null);
  const searchInputRef = useRef(null);
  const events = getEvents();
  const [category, setCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  const categories = ["Alle", ...new Set(events.map((event) => event.category).filter(Boolean))];
  const focusTarget = new URLSearchParams(location.search).get("focus");

  useEffect(() => {
    if (focusTarget !== "search" && focusTarget !== "events") {
      return;
    }

    window.requestAnimationFrame(() => {
      eventControlsRef.current?.scrollIntoView({ block: "start" });

      if (focusTarget === "search") {
        searchInputRef.current?.focus({ preventScroll: true });
      }
    });
  }, [focusTarget, location.search]);

  const searchTerm = search.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    const matchesCategory = category === "Alle" || event.category === category;
    const searchableText = [
      event.title,
      event.summary,
      event.description,
      event.category,
      event.venueName,
      event.venueCity
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesCategory && (!searchTerm || searchableText.includes(searchTerm));
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

  function formatPrice(price) {
    return price === 0 ? "Gratis" : `${price} kr.`;
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
          Se kommende events <span aria-hidden="true">→</span>
        </a>
      </header>

      <main className="home-page" id="events">
        <section className="event-controls" aria-labelledby="events-title" ref={eventControlsRef}>
          <div className="section-heading">
            <h2 id="events-title">Kommende events</h2>
            <p>Filtrer efter kategori eller søg på titel, sted og type.</p>
          </div>

          <label className="event-search">
            <span>Søg efter event</span>
            <input
              ref={searchInputRef}
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCategory("Alle");
              }}
              placeholder="Søg efter koncert, Dokk1, workshop..."
            />
          </label>

          <div className="category-list" aria-label="Vælg kategori">
            {categories.map((item) => (
              <button
                className={item === category ? "active" : undefined}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
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
                  <div className="event-meta">
                    <span>
                      <span aria-hidden="true">◷</span>
                      {formatEventDate(event.date)}
                    </span>
                    <span>
                      <span aria-hidden="true">⌖</span>
                      {event.venueName}, {event.venueCity}
                    </span>
                    <strong>{formatPrice(event.price)}</strong>
                  </div>
                  <Link className="card-link" to={`/events/${event.id}`} state={{ event }}>
                    <span className="visually-hidden">Læs mere om {event.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="home-cta">
          <div>
            <h2>Små oplevelser. Store forbindelser.</h2>
            <p>Mellemrum skaber plads til mennesker, kultur og fællesskab i Aarhus.</p>
            <Link to="/om">
              Læs mere om Mellemrum <span aria-hidden="true">→</span>
            </Link>
          </div>
          <img
            src={communityImage}
            alt="Mennesker samlet ved en udendørs kulturoplevelse i Aarhus"
            width="1400"
            height="933"
            loading="lazy"
            decoding="async"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
