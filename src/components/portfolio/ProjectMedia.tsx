import Image from "next/image";
import type { Project } from "@/content/portfolio";
import { ExampleVideo } from "@/components/service/ExampleVideo";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

// Mreža portfolija: 12 kolona do 1200 px od 1100 px, 2 kolone od 700 px, jedna ispod toga
function sizesFor({ cols }: Project) {
  const tablet = cols >= 7 ? "100vw" : "50vw";
  return `(min-width: 1100px) ${Math.round((cols / 12) * 1200)}px, (min-width: 700px) ${tablet}, 100vw`;
}

/** Medij kartice u portfoliju; prva kartica je LCP pa se njen poster preuzima odmah */
export function ProjectMedia({
  project,
  highPriority = false,
  sizes = sizesFor(project),
}: {
  project: Project;
  highPriority?: boolean;
  /** Širina prikaza van mreže portfolija (stranica projekta) */
  sizes?: string;
}) {
  const priority = highPriority ? ({ fetchPriority: "high", loading: "eager" } as const) : {};

  if (project.media === "video" && project.video) {
    const { title, tag, image, video } = project;
    return <ExampleVideo example={{ title, tag, image, video }} sizes={sizes} {...priority} />;
  }

  const image = (
    <Image
      src={project.image.src}
      alt={project.image.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      className={project.media === "photo" ? "object-cover" : "object-cover object-left-top"}
      {...priority}
    />
  );

  if (project.media === "site") {
    return (
      <div className="absolute inset-0 flex flex-col bg-raised px-6 pt-6">
        <BrowserFrame url={project.url} className="min-h-0 flex-1">
          {image}
        </BrowserFrame>
      </div>
    );
  }

  if (project.media === "phone") {
    return (
      <div className="absolute inset-0 bg-raised">
        <PhoneFrame screenClassName="relative">{image}</PhoneFrame>
      </div>
    );
  }

  return image;
}
