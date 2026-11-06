import { ProjectPage, projectMetadata } from "@/components/portfolio/ProjectPage";

const id = "beograd-kula";

export const metadata = projectMetadata(id);

export default function Page() {
  return <ProjectPage id={id} />;
}
