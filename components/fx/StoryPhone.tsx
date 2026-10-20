"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { IconCalendar, IconCamera, IconChart, IconIdea } from "@/components/Icons";
import Img from "@/components/Img";
import { Mix } from "@/components/Type";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { BRAND, IMG } from "@/lib/site";

const STEPS = [
  { title: "Idee", text: "Themen und Formate, die zur Marke passen.", Icon: IconIdea },
  { title: "Planung", text: "Redaktionsplan statt Zufall.", Icon: IconCalendar },
  { title: "Produktion", text: "Foto, Video und Text aus einer Hand.", Icon: IconCamera },
  { title: "Auswertung", text: "Zahlen lesen, besser werden.", Icon: IconChart },
];
const PLAN = [["Mo", "Reel"], ["Di", ""], ["Mi", "Carousel"], ["Do", ""], ["Fr", "Story"], ["Sa", ""], ["So", "Post"]];
const STATS = [38, 52, 46, 70, 64, 88];

// Ablauf als Instagram-Story: Beim Scrollen füllen sich die Story-Balken,
// das Handy wechselt von Idee über Planung und Produktion zur Auswertung.
export default function StoryPhone() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const fills = q(".story-bar i") as HTMLElement[];
      const n = STEPS.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.5,
          onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
        },
      });
      fills.forEach((f, i) => tl.fromTo(f, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i));
      gsap.from(q(".phone"), { yPercent: 12, opacity: 0, duration: 1.4, scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
    });
  }, { scope: root });

  return (
    <section ref={root} className="story-scene" data-own aria-label="Ablauf: Idee, Planung, Produktion, Auswertung">
      <div className="story-sticky">
        <div className="container story-grid">
          <div>
            <span className="kicker">Ablauf</span>
            <Mix text="Von der Idee bis zum *Post*" />
            <ol className="story-steps">
              {STEPS.map(({ title, text, Icon }, i) => (
                <li key={title} className={i === active ? "is-active" : i < active ? "is-done" : undefined}>
                  <Icon />
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <span className="num">0{i + 1}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="phone" aria-hidden="true">
            <div className="phone-screen">
              <div className="story-bars">{STEPS.map((s) => <span key={s.title} className="story-bar"><i /></span>)}</div>
              <div className="story-user"><span className="story-avatar"><img src={BRAND.monogrammWeiss} alt="" width="45" height="48" /></span>Social Media · Wendico</div>

              <div className={`story-slide${active === 0 ? " is-active" : ""}`}>
                <Img name={IMG.berge} alt="" sizes="20rem" />
                <p className="story-caption"><b>01 Idee</b>Was passt zur Marke?</p>
              </div>
              <div className={`story-slide story-slide--plan${active === 1 ? " is-active" : ""}`}>
                <p className="story-h">Redaktionsplan</p>
                <ul className="story-plan">
                  {PLAN.map(([d, t]) => <li key={d}><span>{d}</span>{t ? <b>{t}</b> : <em>–</em>}</li>)}
                </ul>
                <p className="story-caption"><b>02 Planung</b>Jede Woche ein Plan.</p>
              </div>
              <div className={`story-slide story-slide--post${active === 2 ? " is-active" : ""}`}>
                <figure className="story-post"><Img name={IMG.edKamera} alt="" sizes="16rem" /><span>Neuer Beitrag</span></figure>
                <p className="story-caption"><b>03 Produktion</b>Foto, Video, Text.</p>
              </div>
              <div className={`story-slide story-slide--stats${active === 3 ? " is-active" : ""}`}>
                <p className="story-h">Auswertung</p>
                <div className="story-chart">{STATS.map((v, i) => <i key={i} style={{ ["--h" as string]: `${v}%`, ["--d" as string]: `${i * 0.07}s` }} />)}</div>
                <p className="story-caption"><b>04 Auswertung</b>Was hat funktioniert?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
