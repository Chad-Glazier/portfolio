import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Portfolio.module.css";
import theme from "@/styles/themes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Media } from "@/lib";

const themeStyles = theme.get("Portfolio")!;
const styles = mergeStyles(themeStyles, pageStyles);

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={styles.page}
    >
      <article
        className={styles.projects}
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
            >
              <h1>
                {title}
              </h1>
              <Media
                className={styles.media}
                url={media}
                height={900}
                width={900}
                active={true}
              />
              <div
                className={styles.description}
              >
                {description}
              </div>
            </section>
          )
        }
      </article>
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
    </div>
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
    media: "https://youtu.be/J03WOW2iSSg",
    description: <>
      <p>
        This website was created for the Greater Vernon Museum &amp;
        Archives to create and display virtual exhibits. Their <Link href="https://vernonmuseum.ca/" target="_blank">original site</Link> was built with Wordpress,
        and they tasked me with creating a simpler content-management system that was more
        specific to their needs.
      </p>
      <p>
        At the time of writing, the website is not yet fully deployed but you can still
        visit it at the link above. Since the backend of the CMS is meant for museum staff
        only, I&apos;ve included the video above to demonstrate the system.
      </p>
    </>
  },
  {
    links: {
      github: "https://github.com/Chad-Glazier/r5rs-accumulator-machine"
    },
    title: "OOP in Lisp",
    media: "/wizard.png",
    description: <>
      <h2>Preface</h2>
      <p>
        I will first point out that this project isn&apos;t by any means intended to be a performant or
        genuinely useful library. Rather, it was an exploratory problem to put myself into the
        shoes of those programmers who were writing Lisp before OOP even existed. It was a fun project that forced me to go out of my comfort zone
        and seriously consider the underlying implementation of objects.
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
        My personal goals with this task quickly outgrew the scope of the actual assignment;
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
        includes both. If the pure R5RS example were a true analogy, it would be twice as verbose as it
        already is.
      </em>
      <h2>Read More</h2>
      <p>
        I would encourage you to check out the <Link href="https://github.com/Chad-Glazier/r5rs-accumulator-machine" target="_blank">Github repo</Link> if
        you want to learn a bit about how I approach problems like this and some of my personal thoughts
        on OOP. The repository has a second <Link href="https://github.com/Chad-Glazier/r5rs-accumulator-machine/tree/master/objects#readme" target="_blank">README</Link> that
        ignores the accumulator machine and solely focuses on the small library I wrote.
      </p>
    </>
  }
]
