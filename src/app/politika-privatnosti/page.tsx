import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/sections/SimplePage";

export const metadata = pageMetadata({
  title: "Politika privatnosti",
  description: `Kako ${site.name} prikuplja, koristi i čuva lične podatke poslate preko kontakt forme.`,
  path: "/politika-privatnosti",
});

// PRIVREMENO: pravni tekst mora pripremiti ili proveriti vlasnik sajta
export default function PrivacyPage() {
  return (
    <SimplePage
      title="Politika privatnosti"
      intro="Ovde će biti objašnjeno koje podatke prikupljamo preko kontakt forme, zašto i koliko dugo ih čuvamo."
    >
      <p>[Pravni tekst politike privatnosti, usklađen sa Zakonom o zaštiti podataka o ličnosti.]</p>
    </SimplePage>
  );
}
