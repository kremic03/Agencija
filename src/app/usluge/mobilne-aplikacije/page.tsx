import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

const slug = "mobilne-aplikacije";

export const metadata = serviceMetadata(slug);

export default function Page() {
  return <ServicePage slug={slug} />;
}
