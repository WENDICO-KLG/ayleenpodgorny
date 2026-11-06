"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/Arrows";
import { CONTACT_EMAIL } from "@/lib/site";

const TOPICS = ["Kooperation", "Shooting", "Social Media", "Sonstiges"];

// Anfrage-Formular ohne Server: setzt die Angaben in eine E-Mail und öffnet das Mailprogramm.
export default function InquiryForm() {
  const [topic, setTopic] = useState(TOPICS[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const message = String(f.get("message") || "").trim();
    const subject = `Anfrage: ${topic}${name ? ` – ${name}` : ""}`;
    const body = `${message}\n\n${name}`.trim();
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="inquiry" onSubmit={onSubmit}>
      <fieldset className="inquiry-topics">
        <legend className="kicker">Worum geht es?</legend>
        {TOPICS.map((t) => (
          <label key={t} className={t === topic ? "is-active" : undefined}>
            <input type="radio" name="topic" value={t} checked={t === topic} onChange={() => setTopic(t)} />
            {t}
          </label>
        ))}
      </fieldset>
      <label className="inquiry-field">
        <span className="kicker">Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className="inquiry-field">
        <span className="kicker">Nachricht</span>
        <textarea name="message" rows={4} required />
      </label>
      <button type="submit" className="btn btn--light">E-Mail schreiben <ArrowRight /></button>
      <p className="inquiry-note">Öffnet dein Mailprogramm mit einer Nachricht an {CONTACT_EMAIL}.</p>
    </form>
  );
}
