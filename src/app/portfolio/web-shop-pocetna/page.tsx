import { ProjectPage, projectMetadata } from "@/components/portfolio/ProjectPage";

const id = "web-shop-pocetna";

export const metadata = projectMetadata(id);

export default function Page() {
  return <ProjectPage id={id} />;
}
