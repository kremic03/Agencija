import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

const slug = "snimanje-dronom-za-tv-emisije";

export const metadata = serviceMetadata(slug);

export default function Page() {
  return <ServicePage slug={slug} />;
}
