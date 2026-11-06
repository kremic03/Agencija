import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "O nama",
  description: `Ko stoji iza agencije ${site.name}: tim koji pravi sajtove, aplikacije i video iz vazduha za mala i srednja preduzeća.`,
  path: "/o-nama",
});

// PRIVREMENO: stranica „O nama” još nema dizajn; tekst je sastavljen od podataka sa ostatka sajta, bez tima i fotografija
export default function AboutPage() {
  return (
    <SimplePage
      title="O nama"
      intro="Jedan tim za ceo digitalni nastup malih i srednjih preduzeća — od ideje do lansiranja."
    >
      <p>
        Pravimo veb sajtove, web shopove, mobilne i veb aplikacije i snimamo dronom za firme iz cele Srbije.
        Sastanci su uživo ili online, a za snimanje dolazimo na lokaciju.
      </p>
      <p>
        Svaki projekat počinje besplatnim konsultacijama, a fiksnu cenu znate pre početka rada. Posle lansiranja
        ostajemo dostupni tri meseca bez doplate.
      </p>
    </SimplePage>
  );
}
