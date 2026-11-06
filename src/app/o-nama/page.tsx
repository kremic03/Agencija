import Link from "next/link";
import { services, serviceHref } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "O nama: agencija iz Beograda",
  description: `Ko stoji iza agencije ${site.name}: tim iz Beograda koji pravi sajtove, aplikacije i video iz vazduha za mala i srednja preduzeća širom Srbije.`,
  path: "/o-nama",
});

const heading = "pt-4 text-card-title text-fg";

const principles = [
  {
    title: "Cena je poznata pre početka.",
    text: "Posle besplatnih konsultacija dobijate pisanu ponudu sa fiksnom cenom, rokovima i spiskom svega što je uključeno. Cena se ne menja tokom rada.",
  },
  {
    title: "Vidite napredak svake nedelje.",
    text: "Radimo u kratkim ciklusima i šaljemo vam ono što je gotovo. Ne idemo dalje dok ne odobrite prethodni korak.",
  },
  {
    title: "Govorimo jezikom koji razumete.",
    text: "Ne morate da znate tehničke izraze. Recite nam cilj, a mi predlažemo rešenje, objašnjavamo ga jednostavno i na kraju vas obučimo da sami menjate sadržaj.",
  },
  {
    title: "Ostajemo i posle lansiranja.",
    text: "Kada projekat ugleda svetlo dana, ne nestajemo. Tu smo i posle objave, da sve nastavi da radi kako treba.",
  },
];

// PRIVREMENO: stranica „O nama” još nema dizajn; tekst je sastavljen od podataka sa ostatka sajta, bez tima i fotografija
export default function AboutPage() {
  return (
    <SimplePage
      title="O nama"
      intro="Jedan tim za ceo digitalni nastup malih i srednjih preduzeća — od ideje do lansiranja."
    >
      <p>
        Nalazimo se u Beogradu. Pravimo veb sajtove, web shopove, mobilne i veb aplikacije i snimamo dronom za firme iz cele Srbije.
        Sastanci su uživo ili online, a za snimanje dolazimo na lokaciju. Umesto da sajt, aplikaciju i video
        tražite na tri mesta, sve radi jedan tim.
      </p>
      <p>
        Dronom snimamo više od 15 godina, između ostalog za produkciju „Žigosani u reketu” i emisiju „Lepi Brka”, sa
        kojom smo uz profesionalnu ekipu snimatelja obilazili mesta širom Srbije. Iza nas je i desetak projekata veb
        aplikacija.
      </p>

      <h2 className={heading}>Kako radimo</h2>
      <ul className="flex flex-col gap-4">
        {principles.map((p) => (
          <li key={p.title}>
            <h3 className="font-semibold text-fg">{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>

      <h2 className={heading}>Šta radimo</h2>
      <ul className="flex flex-col gap-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={serviceHref(s.slug)} className="font-semibold text-fg underline underline-offset-4 hover:text-accent-text">
              {s.name}
            </Link>
            : {s.summary.toLowerCase()}.
          </li>
        ))}
      </ul>
      <p>
        Primere možete da pogledate u{" "}
        <Link href="/portfolio" className="text-fg underline underline-offset-4 hover:text-accent-text">
          portfoliju
        </Link>
        .
      </p>
    </SimplePage>
  );
}
