import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import Footer from "../components/Footer";
import { getEventById, getEvents } from "../data/events";
import { createRegistration } from "../lib/supabase";

export default function EventPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigationEvent = location.state?.event;
  const matchingNavigationEvent = String(navigationEvent?.id) === eventId ? navigationEvent : null;
  const event = matchingNavigationEvent ?? getEventById(eventId);
  const relatedEvents = getEvents()
    .filter((item) => item.id !== event?.id)
    .slice(0, 3);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState("experience");
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const formMessageId = "signup-message";

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setFormStatus("error");
      setFormMessage("Udfyld både navn og e-mail.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormStatus("error");
      setFormMessage("Skriv en gyldig e-mailadresse.");
      return;
    }

    setFormStatus("loading");
    setFormMessage("");

    try {
      await createRegistration(event, {
        name: trimmedName,
        email: trimmedEmail
      });

      setName("");
      setEmail("");
      setFormStatus("success");
      setFormMessage("Din tilmelding er modtaget. Du får en bekræftelsesmail fra arrangøren.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(`Tilmeldingen kunne ikke gemmes. ${error.message}`);
    }
  }

  if (!event) {
    return (
      <>
        <main className="event-page">
          <Link className="back-link" to="/">
            ← Alle events
          </Link>
          <section className="message" role="status">
            <h1>Eventet findes ikke</h1>
            <p>Det event, du leder efter, er ikke tilgængeligt.</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const date = new Date(event.date);
  const isSubmitting = formStatus === "loading";
  const formattedDate = date.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const formattedTime = date.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const priceLabel = event.price === 0 ? "Gratis" : `${event.price} kr.`;

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>

        <section className="event-hero-detail">
          <div className="event-hero-image">
            <img
              src={event.image}
              alt={`Stemningsbillede for ${event.title}`}
              width="1200"
              height="900"
              decoding="async"
              fetchPriority="high"
              loading="eager"
            />
          </div>

          <aside className="event-booking-card" aria-labelledby="event-title">
            <p className="event-category">{event.category}</p>
            <h1 id="event-title">{event.title}</h1>
            <p>{event.summary}</p>

            <dl className="event-facts">
              <div>
                <dt>Dato</dt>
                <dd>
                  {formattedDate} · {formattedTime}
                </dd>
              </div>
              <div>
                <dt>Sted</dt>
                <dd>
                  {event.venueName}, {event.venueCity}
                </dd>
              </div>
              <div>
                <dt>Pris</dt>
                <dd>{priceLabel}</dd>
              </div>
            </dl>

            <form className="booking-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <label>
                Navn
                <input
                  autoComplete="name"
                  aria-describedby={formMessage ? formMessageId : undefined}
                  value={name}
                  onChange={(inputEvent) => {
                    setName(inputEvent.target.value);
                    setFormStatus("idle");
                    setFormMessage("");
                  }}
                  required
                  disabled={isSubmitting}
                  name="name"
                />
              </label>
              <label>
                E-mail
                <input
                  autoComplete="email"
                  aria-describedby={formMessage ? formMessageId : undefined}
                  type="email"
                  value={email}
                  onChange={(inputEvent) => {
                    setEmail(inputEvent.target.value);
                    setFormStatus("idle");
                    setFormMessage("");
                  }}
                  placeholder="dig@example.com"
                  required
                  disabled={isSubmitting}
                  name="email"
                />
              </label>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sender..." : "Reserver din plads"}
                <span aria-hidden="true">→</span>
              </button>
              <p className="booking-note">Tilmeldingen sendes til arrangøren. Du får en bekræftelse på e-mail.</p>
              {formMessage && (
                <p
                  className={`form-message ${formStatus}`}
                  id={formMessageId}
                  role={formStatus === "error" ? "alert" : "status"}
                >
                  {formMessage}
                </p>
              )}
            </form>
          </aside>
        </section>

        <div className="event-tabs" aria-label="Eventindhold" role="tablist">
          <button
            aria-controls="event-tab-panel"
            aria-selected={activeTab === "experience"}
            className={activeTab === "experience" ? "active" : undefined}
            role="tab"
            type="button"
            onClick={() => setActiveTab("experience")}
          >
            Om oplevelsen
          </button>
          <button
            aria-controls="event-tab-panel"
            aria-selected={activeTab === "program"}
            className={activeTab === "program" ? "active" : undefined}
            role="tab"
            type="button"
            onClick={() => setActiveTab("program")}
          >
            Program
          </button>
        </div>

        <section className="event-panel" id="event-tab-panel" role="tabpanel">
          {activeTab === "experience" ? (
            <div className="event-story">
              <h2>Om oplevelsen</h2>
              <p>{event.description}</p>
              <p>
                Arrangementet er for dig, der vil tættere på Aarhus' levende kulturliv og dele oplevelsen med andre.
              </p>
            </div>
          ) : (
            <div className="event-story">
              <h2>Program</h2>
              <ol className="program-list">
                <li>
                  <span>Velkomst</span>
                  <p>Vi samles ved venue og får en kort introduktion til aftenen.</p>
                </li>
                <li>
                  <span>Oplevelse</span>
                  <p>Hovedaktiviteten begynder, og der er plads til både fordybelse og samtale.</p>
                </li>
                <li>
                  <span>Afrunding</span>
                  <p>Aftenen rundes af med mulighed for spørgsmål og uformel snak.</p>
                </li>
              </ol>
            </div>
          )}
        </section>

        <section className="related-events" aria-labelledby="related-title">
          <div className="section-heading">
            <h2 id="related-title">Relaterede events</h2>
            <Link to="/">
              Se alle events <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="related-grid">
            {relatedEvents.map((item) => {
              const relatedDate = new Date(item.date);

              return (
                <article className="related-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={`Stemningsbillede for ${item.title}`}
                    width="500"
                    height="320"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="event-category">{item.category}</p>
                    <h3>{item.title}</h3>
                    <p>
                      {relatedDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" })} ·{" "}
                      {relatedDate.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <strong>{item.price === 0 ? "Gratis" : `${item.price} kr.`}</strong>
                    <Link className="card-link" to={`/events/${item.id}`} state={{ event: item }}>
                      <span className="visually-hidden">Læs mere om {item.title}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
