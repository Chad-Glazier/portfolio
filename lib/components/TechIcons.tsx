import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/components/TechIcons.module.css";

type Tech = "c-sharp" | "c" | "css-modules" | "css3" | "express" | "html5" | "java" | "jquery" | "js" | "mysql" | "next" | "node" | "react" | "scheme" | "sqlite" | "prisma" | "php" | "oracle" | "ts" | "zod";

const techIcons: Map<Tech, string> = new Map([
  ["c-sharp", "/c-sharp.svg"],
  ["c", "/c.svg"],
  ["css-modules", "/css-modules.svg"],
  ["css3", "/css3.svg"],
  ["express", "/express.svg"],
  ["html5", "/html5.svg"],
  ["java", "/java.svg"],
  ["jquery", "/jquery.svg"],
  ["js", "/js.svg"],
  ["mysql", "/mysql.svg"],
  ["next", "/next.svg"],
  ["node", "/node.png"],
  ["react", "/react.svg"],
  ["scheme", "/scheme.svg"],
  ["sqlite", "/sqlite.svg"],
  ["prisma", "/prisma.svg"],
  ["php", "/php.svg"],
  ["oracle", "/oracle.svg"],
  ["ts", "/ts.svg"],
  ["zod", "/zod.svg"],
]);

const techLinks: Map<Tech, string> = new Map([
  ["c-sharp", "https://www.youtube.com/watch?v=U3aXWizDbQ4"],
  ["c", "https://www.youtube.com/watch?v=U3aXWizDbQ4&pp=ygUKZmlyZXNoaXAgYw%3D%3D"],
  ["css-modules", "https://youtu.be/ouncVBiye_M?t=77"],
  ["css3", "https://www.youtube.com/watch?v=OEV8gMkCHXQ"],
  ["express", "https://expressjs.com/"],
  ["html5", "https://www.youtube.com/watch?v=ok-plXXHlWw"],
  ["java", "https://www.youtube.com/watch?v=m4-HM_sCvtQ"],
  ["jquery", "https://www.youtube.com/watch?v=UU-GebNqdbg"],
  ["js", "https://www.youtube.com/watch?v=aXOChLn5ZdQ"],
  ["mysql", "https://www.youtube.com/watch?v=Cz3WcZLRaWc&t=362s"],
  ["next", "https://nextjs.org"],
  ["node", "https://nodejs.org/en/about"],
  ["react", "https://www.youtube.com/watch?v=Tn6-PIqc4UM"],
  ["scheme", "https://www.youtube.com/watch?v=INUHCQST7CU"],
  ["sqlite", "https://www.sqlite.org/index.html"],
  ["prisma", "https://www.youtube.com/watch?v=rLRIB6AF2Dg"],
  ["php", "https://www.youtube.com/watch?v=a7_WFUlFS94"],
  ["oracle", "https://www.oracle.com/ca-en/database/technologies/appdev/plsql.html"],
  ["ts", "https://www.youtube.com/watch?v=zQnBQ4tB3ZA"],
  ["zod", "https://github.com/colinhacks/zod#readme"]
]);

export default function TechIcons({ 
  tech,
  size
}: { 
  size?: number,
  tech: Tech[] 
}) {
  return (
    <div
      className={styles.container}
    >
      {
        tech.map(el =>
          <Link
            target="_blank"
            href={techLinks.get(el)!}
          >
            <Image
              key={el}
              src={techIcons.get(el)!}
              alt={el}
              height={size ?? 40}
              width={size ?? 40}
            />            
          </Link>
        )
      }
    </div>
  )
}