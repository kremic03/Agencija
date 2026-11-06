import { ServicePage, serviceMetadata } from "@/components/service/ServicePage";

const slug = "izrada-sajtova";

export const metadata = serviceMetadata(slug);

export default function Page() {
  return <ServicePage slug={slug} />;
}
