import { Link } from "react-router";
import Footer from "../components/Footer";

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
      <Footer />
    </>
  );
}
