import { Link } from "react-router";

export default function RegistrationsPage() {
  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>Persondata vises ikke i den offentlige app.</p>
      </header>
      <main>
        <section className="message admin-notice">
          <h2>Brug Supabase til det interne overblik</h2>
          <p>
            Tilmeldinger indeholder navne og e-mails. Derfor skal de ikke hentes i React med den offentlige
            Supabase-nøgle. Se dem i Supabase Table Editor eller byg et rigtigt loginflow, før siden viser data igen.
          </p>
          <Link className="card-link" to="/">
            Tilbage til events
          </Link>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-brand">
              mellemrum<span>.</span>
            </p>
            <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <div className="footer-link-group">
              <p className="footer-heading">Udforsk</p>
              <Link to="/">Events</Link>
              <Link to="/om">Om Mellemrum</Link>
            </div>
            <div className="footer-link-group">
              <p className="footer-heading">For arrangører</p>
              <a href="mailto:hej@mellemrum.dk">Kontakt os</a>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-meta">© 2025 Mellemrum</p>
          <p>Aarhus, Danmark</p>
        </div>
      </footer>
    </>
  );
}
