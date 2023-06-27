import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Portfolio.module.css";
import theme from "@/styles/themes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Media, Swipeable, TechIcons, isYouTube } from "@/lib";

const themeStyles = theme.get("Portfolio")!;
const styles = mergeStyles(themeStyles, pageStyles);

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swipeable 
      className={styles.page}
      onSwipeLeft={() => {
        setActiveIndex(prev => prev < projects.length - 1 ? prev + 1 : prev);
      }}
      onSwipeRight={() => {
        setActiveIndex(prev => prev ? prev - 1 : prev)
      }}
    >
      {
        projects.map(({ title, media, description }, index) => 
          <section
            className={styles.project}
            key={title}
            data-status={
              index === activeIndex ? "active" 
              : index > activeIndex ? "right"
              : "left"
            }
            data-type={isYouTube(media) ? "video" : "image"}
          >
            <h1>
              {title}
            </h1>
            <div
              className={styles.description}
            >
              {description}
            </div>
            <Media
              className={styles.media}
              url={media}
              height={900}
              width={900}
              active={true}
            />
          </section>
        )
      }
      <nav
        className={styles.controls}
      >
        <button
          className={styles.arrowButton}
          onClick={() => {
            setActiveIndex(prev => prev ? prev - 1 : projects.length - 1)
          }}
        >
          <Image
            className={styles.arrowImage}
            src="/arrow.svg"
            height={50}
            width={50}
            alt="<"
            style={{ transform: "rotate(-90deg)"}}
          />          
        </button>
        <button
          className={styles.arrowButton}
          onClick={() => {
            setActiveIndex(prev => (prev + 1) % projects.length);
          }}
        >
          <Image
            className={styles.arrowImage}
            src="/arrow.svg"
            height={50}
            width={50}
            alt=">"
            style={{ transform: "rotate(90deg)" }}
          />          
        </button>
      </nav>
    </Swipeable>
  );
}

const projects: {
  title: string;
  media: string;
  description: JSX.Element;
  links: {
    live?: string;
    github?: string;
  };
}[] = [
  {
    links: {
      live: "https://exhibit-site.vercel.app/",
      github: "https://github.com/Chad-Glazier/exhibit-site"
    },
    title: "Vernon Museum Exhibits",
    media: "https://youtu.be/uMmL0QWMFNg",
    description: <div>
      <ProjectButtons
        links={{
          live: "https://exhibit-site.vercel.app/",
          github: "https://github.com/Chad-Glazier/exhibit-site"
        }}
      />
      <h2>Overview</h2>
      <p>
        This website was created for the Greater Vernon Museum &amp;
        Archives to create and display virtual exhibits. Their <Link className={styles.link} href="https://vernonmuseum.ca/" target="_blank">original site</Link> was built with Wordpress,
        and they tasked me with creating a simpler content-management system that was more
        specific to their needs.
      </p>
      <em>
        At the time of writing, the website is not yet fully deployed but you can still
        visit it at the link above. Since the backend of the CMS is meant for museum staff
        only, I&apos;ve included a video to demonstrate the system.
      </em>
      <h2>Features</h2>
      <p>
        This project supports a number of features, including:
      </p>
      <ul>
        <li>User authentication</li>
        <li>Rich text editing</li>
        <li>Image uploads</li>
      </ul>
      <h2>Tech Stack</h2>
      <TechIcons
        tech={[
          "ts",
          "next",
          "react",
          "zod",
          "mysql",
          "prisma"
        ]}
      />
      <p>
        This project uses TypeScript from front to back, with React/Next for the client and Next&apos;s
        built-in API routes for the Rest API. The database is MySQL, which is mapped by Prisma. Zod is
        used throughout client/server interactions to ensure type-safety.
      </p>
    </div>
  },
  {
    links: {
      github: "https://github.com/Chad-Glazier/r5rs-accumulator-machine"
    },
    title: "OOP in Lisp",
    media: "/wizard.png",
    description: <div>
      <ProjectButtons
        links={{ github: "https://github.com/Chad-Glazier/r5rs-accumulator-machine" }}
      />
      <h2>TL;DR</h2>
      <p>
        I created a library for Scheme that facilitates object-oriented programming by providing a concise
        way to create closures that represent object state. The objects support basic access modifiers, 
        type-checking, polymorphism, and prototypal inheritance.
      </p>
      <h2>Preface</h2>
      <p>
        I will first point out that this project isn&apos;t by any means intended to be a performant or
        genuinely useful library. Rather, it was an exploratory problem to put myself into the
        shoes of those programmers who were writing Lisp before OOP even existed. It was a fun project that forced me to go out of my comfort zone
        and consider the underlying implementation of objects.
      </p>
      <h2>The Problem</h2>
      <p>
        This project originally started as an assignment for one of my courses, where we
        were tasked with implementing a rudimentary accumulator machine in an object-oriented
        way while using Scheme. Since Scheme (like all dialects of Lisp) is a functional language,
        implementing any sort of object is verbose and complex, relying on the state of closures
        instead of structs or other complex datatypes conveniently included in most languages.
      </p>
      <Image
        src="/bad-object-definition.png"
        alt="the most beautiful code you've ever seen"
        width={400}
        height={1000}
        priority={true}
      />
      <h2>The Solution</h2>
      <p>
        I decided right away that instead of just implementing a bunch of closures by hand to represent
        the components of an accumulator machine, I would rather create a library for R5RS (the specification
        of Scheme that we were using) that made implementing such closures simple and somewhat
        syntactically familiar to non-Lisp programmers. The snippet below is an example from the 
        end result.
      </p>
      <Image
        src="/good-object-definition.png"
        alt="a bunch of ugly code"
        width={400}
        height={1000}
        priority={true}
      />
      <em>
        You might also notice that the first example, with the explicit closure, doesn&apos;t include
        any type-checking, input validation, or access modification of any sort, while the second example (using the library)
        includes all three. If the pure R5RS example were a true analogy, it would be twice as verbose as it
        already is.
      </em>
      <h2>Read More</h2>
      <p>
        I would encourage you to check out the <Link className={styles.link} href="https://github.com/Chad-Glazier/r5rs-accumulator-machine" target="_blank">Github repo</Link> if
        you want to learn a bit about how I approach problems like this and some of my personal thoughts
        on OOP. The repository has a second <Link className={styles.link} href="https://github.com/Chad-Glazier/r5rs-accumulator-machine/tree/master/objects#readme" target="_blank">README</Link> that
        ignores the accumulator machine and solely focuses on the small library I wrote.
      </p>
    </div>
  }
]

function ProjectButtons({
  links
}: {
  links: {
    live?: string;
    github?: string;
  }
}) {
  if (!links.live && !links.github) return <></>;

  return <div
    className={styles.projectButtons}
  >
    {
      links.live && 
        <Link 
          className={styles.projectButton}
          href={links.live} 
          target="_blank"
        >
          <Image 
            src="/globe.svg"
            alt="live"
            height={20}
            width={20}
          />
          View Live
      </Link>
    }
    {
      links.github && 
        <Link 
          className={styles.projectButton}
          href={links.github} 
          target="_blank"
        >
          <Image 
            src="/github-light.svg"
            alt="live"
            height={20}
            width={20}
          />
          <div>
            View Source
          </div>
      </Link>
    }
  </div>
}