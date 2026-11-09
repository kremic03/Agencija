import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

const slug = "snimanje-prirode-dronom";

export const metadata = serviceMetadata(slug);

export default function Page() {
  return <ServicePage slug={slug} />;
}
