import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "O nama",
  description: `Ko stoji iza agencije ${site.name}: tim koji pravi sajtove, aplikacije i video iz vazduha za mala i srednja preduzeća.`,
  path: "/o-nama",
});

// PRIVREMENO: stranica „O nama” još nema dizajn ni sadržaj
export default function AboutPage() {
  return (
    <SimplePage
      title="O nama"
      intro="Jedan tim za ceo digitalni nastup malih i srednjih preduzeća — od ideje do lansiranja."
    >
      <p>[Tekst o agenciji: ko ste, od kada radite, gde se nalazite i kako radite sa klijentima.]</p>
      <p>[Tim: imena, uloge i fotografije članova tima, uz njihovu saglasnost.]</p>
    </SimplePage>
  );
}
