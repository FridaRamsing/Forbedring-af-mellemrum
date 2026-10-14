import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import Footer from "../components/Footer";
import { createRegistration, getEventById } from "../lib/supabase";

export default function EventPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigationEvent = location.state?.event;
  const matchingNavigationEvent = String(navigationEvent?.id) === eventId ? navigationEvent : null;
  const [event, setEvent] = useState(matchingNavigationEvent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pageStatus, setPageStatus] = useState(matchingNavigationEvent ? "ready" : "loading");
  const [pageMessage, setPageMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");
  const formMessageId = "signup-message";

  useEffect(() => {
    let isCancelled = false;
    const hasNavigationEvent = Boolean(matchingNavigationEvent);

    async function loadEvent() {
      if (hasNavigationEvent) {
        setEvent(matchingNavigationEvent);
        setPageStatus("ready");
      } else {
        setEvent(null);
        setPageStatus("loading");
      }

      setPageMessage("");

      try {
        const data = await getEventById(eventId);

        if (!isCancelled) {
          setEvent(data);
          setPageStatus(data ? "ready" : "not-found");
        }
      } catch (error) {
        if (!isCancelled) {
          if (!hasNavigationEvent) {
            setPageMessage(error.message);
            setPageStatus("error");
          }
        }
      }
    }

    loadEvent();

    return () => {
      isCancelled = true;
    };
  }, [eventId, matchingNavigationEvent]);

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
      setFormMessage("Din tilmelding er modtaget.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(`Tilmeldingen kunne ikke gemmes. ${error.message}`);
    }
  }

  if (pageStatus === "loading") {
    return (
      <>
        <main className="event-page">
          <Link className="back-link" to="/">
            ← Alle events
          </Link>
          <p className="message" role="status">
            Henter event...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (pageStatus === "error") {
    return (
      <>
        <main className="event-page">
          <Link className="back-link" to="/">
            ← Alle events
          </Link>
          <section className="message error-message" role="alert">
            <h1>Eventet kunne ikke hentes</h1>
            <p>{pageMessage}</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (pageStatus === "not-found") {
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

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>

        <section className="event-detail">
          <div className="event-detail-visual">
            <div className="event-detail-media">
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
            <div className="event-detail-badges" aria-label="Eventoverblik">
              {event.category && <span>{event.category}</span>}
              <span>{event.price === 0 ? "Gratis" : `${event.price} kr.`}</span>
              {event.venueCity && <span>{event.venueCity}</span>}
            </div>
          </div>
          <div className="event-detail-content">
            <p className="event-category">{event.category}</p>
            <h1>{event.title}</h1>
            <p className="lead">{event.summary}</p>
            <div className="detail-list">
              <p>
                <strong>Dato</strong>
                {date.toLocaleDateString("da-DK", { weekday: "long", day: "numeric", month: "long" })} kl.{" "}
                {date.toLocaleTimeString("da-DK", { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p>
                <strong>Sted</strong>
                <span>
                  {event.venueName}
                  <br />
                  {event.venueAddress}, {event.venuePostalCode} {event.venueCity}
                  {event.venueWebsite && (
                    <>
                      <br />
                      <a href={event.venueWebsite} target="_blank" rel="noopener noreferrer">
                        Besøg venue
                      </a>
                    </>
                  )}
                </span>
              </p>
              <p>
                <strong>Pris</strong>
                {event.price === 0 ? "Gratis" : `${event.price} kr.`}
              </p>
            </div>
            <p>{event.description}</p>
          </div>
        </section>

        <section className="signup-panel">
          <div>
            <p className="eyebrow dark">Tilmelding</p>
            <h2>Reserver din plads</h2>
            <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
          </div>

          <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
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
              {isSubmitting ? "Sender..." : "Tilmeld mig"}
            </button>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
