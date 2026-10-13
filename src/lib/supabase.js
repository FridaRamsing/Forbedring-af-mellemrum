const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_APIKEY = import.meta.env.VITE_SUPABASE_APIKEY;

function getSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_APIKEY) {
    throw new Error("Supabase mangler URL eller API-nøgle.");
  }

  return {
    url: SUPABASE_URL,
    key: SUPABASE_APIKEY
  };
}

async function requestSupabase(path, options = {}) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Supabase svarede med en fejl.");
  }

  return data;
}

export function getEvents() {
  return requestSupabase("/events?select=*&order=date.asc");
}

export async function getEventById(eventId) {
  if (!/^\d+$/.test(eventId)) {
    return null;
  }

  const data = await requestSupabase(`/events?select=*&id=eq.${encodeURIComponent(eventId)}&limit=1`);

  return data[0] ?? null;
}

export function createRegistration(event, attendee) {
  return requestSupabase("/registrations", {
    method: "POST",
    headers: {
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      name: attendee.name,
      email: attendee.email,
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.venueName
    })
  });
}
