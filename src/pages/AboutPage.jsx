import { useEffect, useState } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { getEvents } from "../data/events";

const aboutCityImage = `${import.meta.env.BASE_URL}images/pages/about-city.webp`;

export default function AboutPage() {
  const examples = getEvents().slice(0, 3);
  const [showOrganizerForm, setShowOrganizerForm] = useState(false);
  const [organizerStatus, setOrganizerStatus] = useState("idle");
  const organizerMessageId = "organizer-form-message";

  function handleOrganizerSubmit(submitEvent) {
    submitEvent.preventDefault();
    submitEvent.currentTarget.reset();
    setOrganizerStatus("sent");
  }

  useEffect(() => {
    if (!showOrganizerForm) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowOrganizerForm(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showOrganizerForm]);

  return (
    <>
      <header className="about-hero">
        <img
          className="about-hero-bg"
          src={aboutCityImage}
          alt=""
          width="1200"
          height="800"
          decoding="async"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="about-header-content">
          <h1>Mere plads til mennesker.</h1>
          <p>
            Mellemrum er en platform for kultur, fællesskab og oplevelser i Aarhus. Vi samler events, der bringer
            mennesker sammen og skaber nye perspektiver.
          </p>
        </div>
      </header>

      <main className="about-page">
        <section className="about-audiences" aria-labelledby="about-audiences-title">
          <h2 className="visually-hidden" id="about-audiences-title">
            Hvem Mellemrum er for
          </h2>
          <div className="about-audience-split">
            <article>
              <span>For dig</span>
              <h3>Der vil opleve byen</h3>
              <p>Find unikke events, opdag nye steder og vær en del af fællesskabet i Aarhus.</p>
              <Link to="/">Find events →</Link>
            </article>
            <article>
              <span>Del et event</span>
              <h3>Del dine events</h3>
              <p>Vi gør det nemt at nå ud til et engageret lokalt publikum.</p>
              <button
                className="about-action"
                type="button"
                onClick={() => {
                  setShowOrganizerForm(true);
                  setOrganizerStatus("idle");
                }}
              >
                Opret event →
              </button>
            </article>
          </div>

          {showOrganizerForm && (
            <div className="modal-backdrop" onMouseDown={() => setShowOrganizerForm(false)}>
              <form
                className="organizer-form modal-card"
                onSubmit={handleOrganizerSubmit}
                role="dialog"
                aria-modal="true"
                aria-labelledby="organizer-form-title"
                aria-describedby={organizerStatus === "sent" ? organizerMessageId : undefined}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button
                  className="modal-close"
                  type="button"
                  aria-label="Luk formular"
                  onClick={() => setShowOrganizerForm(false)}
                >
                  ×
                </button>
                <div>
                  <h3 id="organizer-form-title">Fortæl os om dit event</h3>
                  <p>Send en kort beskrivelse, så vender vi tilbage til dig.</p>
                </div>
                <label>
                  Dit navn
                  <input name="organizerName" autoComplete="name" required />
                </label>
                <label>
                  E-mail
                  <input name="organizerEmail" type="email" autoComplete="email" required />
                </label>
                <label>
                  Eventidé
                  <textarea
                    name="eventIdea"
                    rows="5"
                    placeholder="Skriv kort hvad eventet handler om, hvor det foregår, og hvornår det ca. skal være."
                    required
                  />
                </label>
                <button type="submit">Send forslag →</button>
                {organizerStatus === "sent" && (
                  <p className="form-message success" id={organizerMessageId} role="status">
                    Tak. Vi har modtaget dit forslag og vender tilbage til dig hurtigst muligt.
                  </p>
                )}
              </form>
            </div>
          )}
        </section>

        <section className="about-examples" aria-labelledby="about-examples-title">
          <div className="section-heading">
            <h2 id="about-examples-title">Eksempler på oplevelser</h2>
            <Link to="/">
              Se alle events <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="about-example-grid">
            {examples.map((event) => (
              <Link className="about-example-card" key={event.id} to={`/events/${event.id}`} state={{ event }}>
                <img
                  src={event.image}
                  alt={`Stemningsbillede for ${event.title}`}
                  width="500"
                  height="320"
                  loading="lazy"
                  decoding="async"
                />
                <span>{event.category}</span>
                <strong>{event.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-city" aria-labelledby="about-city-title">
          <div>
            <h2 id="about-city-title">Vi samler kultur og fællesskab ét sted i Aarhus.</h2>
            <p>
              Uanset om du deltager i events eller arrangerer dine egne, er Mellemrum her for at skabe forbindelser.
            </p>
            <Link className="about-cta" to="/">
              Find events →
            </Link>
          </div>
          <img
            src={aboutCityImage}
            alt="Moderne arkitektur med lyse facader og turkise altaner"
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
