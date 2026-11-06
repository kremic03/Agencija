"use client";

import { useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { sendQuote } from "@/app/kontakt/actions";
import { site } from "@/content/site";
import { AlertIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

const STEPS = ["Usluga", "Detalji", "Budžet i rok", "Kontakt"];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const input =
  "min-h-12 w-full rounded-md border border-line-control bg-bg px-3.5 py-3 text-base leading-[1.4] text-fg outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgb(255_107_44/0.22)] aria-invalid:border-error aria-invalid:shadow-[0_0_0_3px_rgb(248_113_113/0.18)]";
const labelText = "text-[14.5px] leading-[1.3] font-medium";

/** Izbor kao „čip”: nativni radio/checkbox, stilizovan preko roditeljskog labela */
function Chip({ type, name, value, defaultChecked }: { type: "radio" | "checkbox"; name: string; value: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center justify-center rounded-lg border border-line-control px-4.5 text-center text-[15px] leading-[1.2] font-medium text-muted transition-colors hover:border-subtle has-checked:border-accent has-checked:bg-accent/12 has-checked:font-semibold has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-text">
      <input type={type} name={name} value={value} defaultChecked={defaultChecked} className="sr-only" />
      {value}
    </label>
  );
}

function ChoiceGroup({ legend, children, wide }: { legend: string; children: ReactNode; wide?: boolean }) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className={`${labelText} pb-2.5`}>{legend}</legend>
      <div className={wide ? "grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2" : "flex flex-wrap gap-2"}>
        {children}
      </div>
    </fieldset>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} className="flex items-center gap-1.5 text-[13.5px] leading-[1.3] font-medium text-error-text">
      <AlertIcon />
      {children}
    </span>
  );
}

/** Usluge za prvi korak, grupisane; stižu sa servera (samo polja koja forma koristi) */
export type ServiceOptionGroup = {
  group: string;
  label: string;
  items: { slug: string; name: string; shortName: string; summary: string }[];
};

function CheckBox() {
  return (
    <span
      aria-hidden="true"
      className="mt-px grid size-5 flex-none place-items-center rounded-[5px] border-[1.5px] border-subtle text-on-accent group-has-checked:border-accent group-has-checked:bg-accent"
    >
      <CheckIcon size={12} strokeWidth={2.2} className="hidden group-has-checked:block" />
    </span>
  );
}

export function QuoteForm({ serviceOptions }: { serviceOptions: ServiceOptionGroup[] }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, startSending] = useTransition();
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const sentHeading = useRef<HTMLHeadingElement>(null);

  const goTo = (next: number) => {
    setStep(next);
    // Fokus na naslov novog koraka, da čitač ekrana najavi promenu
    requestAnimationFrame(() => headingRefs.current[next - 1]?.focus());
  };

  const nextDisabled = step === 1 && selected.length === 0;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nextDisabled || sending) return;
    if (step < 4) return goTo(step + 1);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextErrors = { name: !name, email: !EMAIL_RE.test(email) };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email) {
      // Fokus posle iscrtavanja: aria-invalid se postavlja tek ovim renderom
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setFailure(null);
    startSending(async () => {
      try {
        const result = await sendQuote(data);
        if (result.ok) {
          setSent(true);
          requestAnimationFrame(() => sentHeading.current?.focus());
        } else {
          setFailure(result.message);
          if (result.fields) setErrors(result.fields);
        }
      } catch {
        // Prekinuta veza ili pad servera; upisani podaci ostaju u formi
        setFailure(`Slanje nije uspelo. Proverite vezu i pokušajte ponovo, ili pišite na ${site.email}.`);
      }
    });
  };

  const startOver = () => {
    setSent(false);
    setStep(1);
    setSelected([]);
    setErrors({});
    setFailure(null);
  };

  if (sent) {
    return (
      <div className="flex min-w-0 flex-[2_1_520px] flex-col items-start gap-4 rounded-xl border border-line bg-surface p-[clamp(20px,3.4vw,40px)]">
        <h2
          ref={sentHeading}
          tabIndex={-1}
          className="text-[clamp(22px,2vw,28px)] leading-[1.2] font-semibold tracking-[-0.025em] outline-none"
        >
          Hvala, upit je poslat.
        </h2>
        <p className="text-[15.5px] leading-normal text-muted">Javljamo se u roku od 24 sata.</p>
        <button
          type="button"
          onClick={startOver}
          className="flex h-12 cursor-pointer items-center rounded-lg border border-line-strong px-4 text-[15px] font-semibold hover:bg-raised active:bg-pressed"
        >
          Pošalji novi upit
        </button>
      </div>
    );
  }

  const heading = (i: number, title: string, text: string) => (
    <div className="flex flex-col gap-2">
      <h2
        ref={(el) => {
          headingRefs.current[i] = el;
        }}
        tabIndex={-1}
        className="text-[clamp(22px,2vw,28px)] leading-[1.2] font-semibold tracking-[-0.025em] outline-none"
      >
        {title}
      </h2>
      <p className="text-[15.5px] leading-normal text-muted">{text}</p>
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="min-w-0 flex-[2_1_520px] overflow-hidden rounded-xl border border-line bg-surface"
      aria-label="Zahtev za ponudu"
    >
      {/* Zamka za botove: ljudi ovo polje ne vide i ne dolaze do njega tasterom Tab */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Potvrda adrese sajta
          <input type="text" name="websiteConfirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-3.5 px-[clamp(20px,3.4vw,40px)] pt-[clamp(20px,3vw,32px)]">
        <p className="flex justify-between gap-3 font-mono text-[12.5px] leading-none tracking-[0.04em] text-subtle">
          <span>
            KORAK {step} OD {STEPS.length}
          </span>
          <span className="text-fg">{STEPS[step - 1]}</span>
        </p>
        <ol className="grid grid-cols-4 gap-1.5">
          {STEPS.map((name, i) => {
            const n = i + 1;
            return (
              <li key={name} aria-current={n === step ? "step" : undefined} className="flex flex-col gap-2.5">
                <span
                  aria-hidden="true"
                  className={`h-1 rounded-xs ${n < step ? "bg-accent" : n === step ? "bg-fg" : "bg-line-strong"}`}
                />
                <span
                  className={`text-[13px] leading-[1.2] font-medium whitespace-nowrap ${n <= step ? "text-fg" : "text-subtle"} ${n === step ? "" : "max-[699px]:sr-only"}`}
                >
                  {name}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex min-h-105 flex-col gap-6 px-[clamp(20px,3.4vw,40px)] py-[clamp(28px,3.4vw,40px)]">
        {/* Korak 1 */}
        <div hidden={step !== 1} className="flex flex-col gap-6">
          {heading(0, "Šta vam je potrebno?", "Izaberite jednu ili više usluga.")}
          {serviceOptions.map(({ group, label, items }) => (
            <fieldset key={group} className="flex flex-col gap-2.5">
              <legend className="eyebrow pb-2.5">{label}</legend>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
                {items.map((s) => (
                  <label
                    key={s.slug}
                    className="group flex min-h-19 cursor-pointer items-start gap-3 rounded-lg border border-line-control bg-surface p-4 transition-colors hover:border-subtle has-checked:border-accent has-checked:bg-[color-mix(in_srgb,var(--color-accent)_10%,var(--color-surface))] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-text"
                  >
                    <input
                      type="checkbox"
                      name="services"
                      value={s.name}
                      className="sr-only"
                      onChange={(e) =>
                        setSelected((sel) => (e.target.checked ? [...sel, s.slug] : sel.filter((x) => x !== s.slug)))
                      }
                    />
                    <CheckBox />
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-[15.5px] leading-[1.25] font-semibold">{s.shortName}</span>
                      <span className="text-[13.5px] leading-[1.4] text-muted">{s.summary}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>

        {/* Korak 2 */}
        <div hidden={step !== 2} className="flex flex-col gap-6">
          {heading(1, "Recite nam nešto o projektu", "Dovoljno je par rečenica. Detalje razjašnjavamo u razgovoru.")}
          <label className="flex flex-col gap-2">
            <span className={labelText}>Šta želite da postignete?</span>
            <textarea
              name="about"
              rows={4}
              placeholder="Npr. Imamo stomatološku ordinaciju i želimo sajt na kom pacijenti mogu da zakažu pregled."
              className={`${input} resize-y leading-[1.55]`}
            />
          </label>
          <ChoiceGroup legend="Da li već imate sajt ili materijal?">
            {["Da", "Ne", "Delimično"].map((v) => (
              <Chip key={v} type="radio" name="hasMaterial" value={v} />
            ))}
          </ChoiceGroup>
          <label className="flex flex-col gap-2">
            <span className={labelText}>
              Link do postojećeg sajta <span className="font-normal text-subtle">(opciono)</span>
            </span>
            <input type="url" name="website" inputMode="url" placeholder="www.vasafirma.rs" className={input} />
          </label>
          {selected.includes("snimanje-dronom") && (
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-[2_1_240px] flex-col gap-2">
                <span className={labelText}>Lokacija snimanja</span>
                <input type="text" name="location" placeholder="Npr. Zlatibor, naselje Palisad" className={input} />
              </label>
              <label className="flex flex-[1_1_160px] flex-col gap-2">
                <span className={labelText}>Okvirni datum</span>
                <input type="text" name="date" placeholder="Npr. sredina maja" className={input} />
              </label>
            </div>
          )}
        </div>

        {/* Korak 3 */}
        <div hidden={step !== 3} className="flex flex-col gap-6">
          {heading(2, "Budžet i rok", "Okviran budžet nam pomaže da predložimo realno rešenje. Ne obavezuje vas.")}
          <ChoiceGroup legend="Okvirni budžet" wide>
            {["Do 500 €", "500–1.500 €", "1.500–5.000 €", "Preko 5.000 €", "Nisam siguran/na"].map((v) => (
              <Chip key={v} type="radio" name="budget" value={v} />
            ))}
          </ChoiceGroup>
          <ChoiceGroup legend="Kada vam treba?" wide>
            {["Što pre", "U narednih mesec dana", "U naredna 1–3 meseca", "Fleksibilno"].map((v) => (
              <Chip key={v} type="radio" name="timeline" value={v} />
            ))}
          </ChoiceGroup>
        </div>

        {/* Korak 4 */}
        <div hidden={step !== 4} className="flex flex-col gap-6">
          {heading(3, "Gde da vam pošaljemo ponudu?", "Polja označena zvezdicom su obavezna.")}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            {/* Greška je van <label>, da se ne čita dvaput (u nazivu polja i kroz aria-describedby) */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col gap-2">
                <span className={labelText}>Ime i prezime *</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Marija Petrović"
                  aria-invalid={errors.name || undefined}
                  aria-describedby={errors.name ? "greska-ime" : undefined}
                  className={input}
                />
              </label>
              {errors.name && <FieldError id="greska-ime">Unesite ime da znamo kome se obraćamo.</FieldError>}
            </div>
            <label className="flex flex-col gap-2">
              <span className={labelText}>Naziv firme</span>
              <input type="text" name="company" autoComplete="organization" placeholder="Ordinacija Osmeh" className={input} />
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex flex-col gap-2">
                <span className={labelText}>Email *</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="ime@firma.rs"
                  aria-invalid={errors.email || undefined}
                  aria-describedby={errors.email ? "greska-email" : undefined}
                  className={input}
                />
              </label>
              {errors.email && (
                <FieldError id="greska-email">Proverite email — izgleda da nedostaje „@“ ili domen.</FieldError>
              )}
            </div>
            <label className="flex flex-col gap-2">
              <span className={labelText}>Telefon</span>
              <input type="tel" name="phone" autoComplete="tel" placeholder="+381 6x xxx xxxx" className={input} />
            </label>
          </div>
          <ChoiceGroup legend="Kako najradije komunicirate?">
            {["Email", "Telefon", "Viber"].map((v) => (
              <Chip key={v} type="radio" name="contactPreference" value={v} defaultChecked={v === "Email"} />
            ))}
          </ChoiceGroup>
          <label className="group flex min-h-11 cursor-pointer items-start gap-3 text-[14.5px] leading-normal text-muted has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-text">
            <input type="checkbox" name="consent" value="da" className="sr-only" />
            <CheckBox />
            Slažem se da me {site.name} kontaktira u vezi sa ovim upitom. Podatke ne delimo sa trećim licima.
          </label>
          {failure && (
            <p role="alert" className="rounded-lg border border-error bg-raised p-4 text-[15px] leading-normal text-error-text">
              {failure}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-bg px-[clamp(20px,3.4vw,40px)] py-5">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="flex h-12 cursor-pointer items-center gap-2 rounded-lg border border-line-strong px-4 text-[15px] font-semibold hover:bg-raised active:bg-pressed"
          >
            <ArrowLeftIcon />
            Nazad
          </button>
        ) : (
          <span className="text-[13.5px] leading-[1.4] text-subtle">
            {selected.length ? `Izabrano: ${selected.length}` : "Izaberite bar jednu uslugu"}
          </span>
        )}
        <button
          type="submit"
          aria-disabled={nextDisabled || sending || undefined}
          className="ml-auto flex h-12 cursor-pointer items-center gap-2 rounded-lg bg-accent px-5 text-[15px] leading-none font-semibold text-on-accent hover:bg-accent-hover active:bg-accent-active focus-visible:outline-fg focus-visible:outline-offset-3 aria-disabled:cursor-not-allowed aria-disabled:bg-pressed aria-disabled:text-subtle"
        >
          {step === 4 ? (sending ? "Šaljem…" : "Pošalji upit") : "Dalje"}
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
