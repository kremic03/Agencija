import { SimplePage } from "@/components/sections/SimplePage";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Stranica nije pronađena" };

export default function NotFound() {
  return (
    <SimplePage title="Stranica nije pronađena" intro="Adresa je možda pogrešno ukucana ili je stranica premeštena.">
      <div>
        <ButtonLink href="/" variant="secondary">
          Nazad na početnu
        </ButtonLink>
      </div>
    </SimplePage>
  );
}
