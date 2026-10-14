const baseUrl = import.meta.env.BASE_URL;

function localEventImage(eventId) {
  return `${baseUrl}images/events/event-${eventId}.webp`;
}

export const events = [
  {
    id: 1,
    title: "Lyd mellem husene",
    summary: "En intim aften med nye elektroniske navne og visuelle installationer.",
    description:
      "Oplev tre upcoming artister i et midlertidigt scenerum mellem Godsbanens værksteder. Aftenen kombinerer elektronisk musik, lys og korte artist talks.",
    date: "2026-09-12T17:30:00+00:00",
    venueName: "Godsbanen",
    venueAddress: "Skovgaardsgade 3",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://godsbanen.dk/",
    category: "Koncert",
    image: localEventImage(1),
    price: 120
  },
  {
    id: 2,
    title: "Byen efter mørke",
    summary: "En talk om lys, tryghed og de steder, vi deler efter solnedgang.",
    description:
      "Arkitekter, designere og lokale beboere mødes til en samtale om, hvordan lys og byrumsdesign påvirker vores oplevelse af byen efter mørkets frembrud.",
    date: "2026-09-18T15:00:00+00:00",
    venueName: "Dokk1",
    venueAddress: "Hack Kampmanns Plads 2",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://dokk1.dk/",
    category: "Talk",
    image: localEventImage(2),
    price: 0
  },
  {
    id: 3,
    title: "Tryk din egen plakat",
    summary: "Workshop i analogt tryk med former, farver og typografi.",
    description:
      "En praktisk workshop for begyndere. Du udvikler et enkelt motiv og trykker din egen A3-plakat. Materialer er inkluderet, og du behøver ingen erfaring.",
    date: "2026-09-26T08:00:00+00:00",
    venueName: "Institut for X",
    venueAddress: "Skovgaardsgade 3F",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://institutforx.dk/",
    category: "Workshop",
    image: localEventImage(3),
    price: 175
  },
  {
    id: 4,
    title: "Langbord og lokale råvarer",
    summary: "Fællesspisning med sæsonens grønt og historier fra producenterne.",
    description:
      "Vi dækker langbord i gårdrummet og serverer en enkel menu baseret på lokale råvarer. Undervejs fortæller producenterne om råvarerne og arbejdet bag.",
    date: "2026-10-02T16:00:00+00:00",
    venueName: "Folkestedet",
    venueAddress: "Carl Blochs Gade 28",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://aarhus.dk/folkestedet/om-folkestedet",
    category: "Fællesskab",
    image: localEventImage(4),
    price: 95
  },
  {
    id: 5,
    title: "Nye stemmer på scenen",
    summary: "Poetry slam, oplæsning og åbent mikrofonformat for nye skribenter.",
    description:
      "En scene for korte tekster, spoken word og nye idéer. Aftenen begynder med inviterede oplæsere og slutter med åben mikrofon.",
    date: "2026-10-08T17:00:00+00:00",
    venueName: "Lynfabrikken",
    venueAddress: "Vestergade 49B",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: null,
    category: "Scene",
    image: localEventImage(5),
    price: 60
  },
  {
    id: 6,
    title: "Tegn byen sammen",
    summary: "En rolig søndag med skitsebog, kaffe og fælles byrumsstudier.",
    description:
      "Vi mødes ved Dokk1 og går en kort rute gennem midtbyen, mens vi tegner undervejs. Til sidst samler vi skitserne over kaffe og deler teknikker og observationer.",
    date: "2026-10-18T09:00:00+00:00",
    venueName: "Dokk1",
    venueAddress: "Hack Kampmanns Plads 2",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://dokk1.dk/",
    category: "Workshop",
    image: localEventImage(6),
    price: 40
  },
  {
    id: 7,
    title: "Arkitekturvandring på Aarhus Ø",
    summary: "En guidet tur gennem bydelens markante bygninger og nye byrum.",
    description:
      "Kom tæt på arkitekturen omkring havnen, og hør fortællingerne om materialer, fællesskab og livet mellem bygningerne.",
    date: "2026-10-24T11:00:00+00:00",
    venueName: "Aarhus Ø",
    venueAddress: "Bernhardt Jensens Boulevard 175",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: null,
    category: "Byvandring",
    image: localEventImage(7),
    price: 75
  },
  {
    id: 8,
    title: "Keramik efter fyraften",
    summary: "En aften med ler, enkle teknikker og plads til at arbejde med hænderne.",
    description:
      "Du lærer at forme en lille kop eller skål i hånden. Underviseren hjælper undervejs, og dit arbejde bliver glaseret og brændt efter workshoppen.",
    date: "2026-11-04T16:30:00+00:00",
    venueName: "Godsbanen",
    venueAddress: "Skovgaardsgade 3",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: "https://godsbanen.dk/",
    category: "Workshop",
    image: localEventImage(8),
    price: 220
  },
  {
    id: 9,
    title: "Søndagsjazz ved åen",
    summary: "En eftermiddag med levende jazz, varme drikke og udsigt til byen.",
    description:
      "En lokal kvartet spiller to korte sæt med både klassikere og nye kompositioner. Arrangementet foregår udendørs, hvis vejret tillader det.",
    date: "2026-11-15T13:00:00+00:00",
    venueName: "Åboulevarden",
    venueAddress: "Åboulevarden 55",
    venuePostalCode: "8000",
    venueCity: "Aarhus C",
    venueWebsite: null,
    category: "Koncert",
    image: localEventImage(9),
    price: 85
  }
];

export function getEvents() {
  return events;
}

export function getEventById(eventId) {
  return events.find((event) => String(event.id) === String(eventId)) ?? null;
}
