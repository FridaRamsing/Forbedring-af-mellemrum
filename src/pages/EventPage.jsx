import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Footer from "../components/Footer";
import { createRegistration, getEventById } from "../lib/supabase";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pageStatus, setPageStatus] = useState("loading");
  const [pageMessage, setPageMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function loadEvent() {
      setPageStatus("loading");
      setPageMessage("");

      try {
        const data = await getEventById(eventId);

        if (!isCancelled) {
          setEvent(data);
          setPageStatus(data ? "ready" : "not-found");
        }
      } catch (error) {
        if (!isCancelled) {
          setPageMessage(error.message);
          setPageStatus("error");
        }
      }
    }

    loadEvent();

    return () => {
      isCancelled = true;
    };
  }, [eventId]);

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
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>
        <p className="message" role="status">
          Henter event...
        </p>
      </main>
    );
  }

  if (pageStatus === "error") {
    return (
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>
        <section className="message error-message" role="alert">
          <h1>Eventet kunne ikke hentes</h1>
          <p>{pageMessage}</p>
        </section>
      </main>
    );
  }

  if (pageStatus === "not-found") {
    return (
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>
        <section className="message" role="status">
          <h1>Eventet findes ikke</h1>
          <p>Det event, du leder efter, er ikke tilgængeligt.</p>
        </section>
      </main>
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
          <img src={event.image} alt={`Stemningsbillede for ${event.title}`} />
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
                      <a href={event.venueWebsite} target="_blank" rel="noreferrer">
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

          <form onSubmit={handleSubmit}>
            <label>
              Navn
              <input
                value={name}
                onChange={(inputEvent) => setName(inputEvent.target.value)}
                required
                disabled={isSubmitting}
              />
            </label>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(inputEvent) => setEmail(inputEvent.target.value)}
                placeholder="dig@example.com"
                required
                disabled={isSubmitting}
              />
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sender..." : "Tilmeld mig"}
            </button>
            {formMessage && (
              <p className={`form-message ${formStatus}`} role={formStatus === "error" ? "alert" : "status"}>
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
