import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Skills.module.css";
import theme from "@/styles/themes";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

const styles = mergeStyles(theme.get("Skills")!, pageStyles);

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article className={styles.page}>
      <section
        className={styles.content}
      >
        {contentSlides.map((slide, idx) => 
          <ContentSlide 
            status={
              idx == activeIndex ? "center"
              : idx > activeIndex ? "right"
              : "left" 
            }
            key={slide.heading} 
            {...slide} 
          />
        )}
      </section>
      <nav
        className={styles.controls}
      >
        <button
          className={styles.arrowButton}
          onClick={() => {
            setActiveIndex(prev => prev ? prev - 1 : contentSlides.length - 1)
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
            setActiveIndex(prev => (prev + 1) % contentSlides.length);
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
    </article>
  )
}

function Skill({
  name,
  urls,
  description
}: {
  name: string;
  urls: string[];
  description: string;
}) {
  return <div className={styles.skill}>
    <h1>{name}</h1>
    <div className={styles.icons}>
      {urls.map(url => <Image
        key={url}
        src={url}
        alt="icon"
        height={url == "/css-modules.svg" || url == "/mysql.svg" ? 50 : 30}
        width={url == "/next.svg" || url == "/css-modules.svg" || url == "/mysql.svg" ? 50 : url == "/scheme.svg" ? 20 : 30}
        priority={true}
      />)}
    </div>    
    <p>{description}</p>
  </div>
}

const contentSlides = [
  {
    heading: "Technical Skills",
    image: {
      url: "/laptop.jpg",
      alt: "nerd stuff",
      title: "Photo by Mohammad Rahmani at https://unsplash.com/@afgprogrammer",
      fix: "right"
    },
    description: <div className={styles.skills}>
      {[
        {
          name: "JavaScript / TypeScript",
          urls: ["/ts.svg", "/js.svg", "/node.png", "/react.svg", "/next.svg", "/zod.svg", "/express.svg", "/jquery.svg"],
          description: "JavaScript was my first language, and the one I'm most familiar with; I have experience using it in both back-end and front-end runtimes. As far as frameworks and libraries are concerned, I have experience with React, Zod, Express, Next, and a little bit of jQuery."
        },
        {
          name: "Relational Databases",
          urls: ["/prisma.svg", "/mysql.svg", "/oracle.svg", "/sqlite.svg"],
          description: "I have used multiple kinds of SQL databases, including MySQL, SQLite3, and Oracle PL/SQL. I am comfortable writing raw SQL queries or using an ORM like Prisma."
        },
        {
          name: "HTML5 & CSS3",
          urls: ["/html5.svg", "/css3.svg", "/css-modules.svg"],
          description: "I wouldn't consider myself a wizard with UI markup languages, but I do have a solid grasp on the fundamentals and I enjoy pushing limits with them. It might be controversial to say, but I actually enjoy writing CSS."
        },
        {
          name: "Other Backend Languages",
          urls: ["c.svg", "/c-sharp.svg", "/java.svg", "/php.svg", "/scheme.svg"],
          description: "There are some languages that I have used in school and am comfortable with, but that I haven't yet used in real-world applications. These languages include PHP, Java, C, C#, and Scheme."
        }
      ].map(skill => <Skill key={skill.name} {...skill} />)}
    </div>
  },
  {
    heading: "Education",
    image: {
      url: "/books.jpg",
      alt: "Books!",
      title: "Photo by Susan Q Yin at https://unsplash.com/@syinq",
      fix: "right"
    },
    description: <div className={styles.education}>
      <h1>Formal Education</h1>
      <section className={styles.educationSubsection}>
        <h1>Diploma in Computer Information Systems</h1>
        <Link
          href="https://www.okanagan.bc.ca/"
          target="_blank"
        >
          Okanagan College
        </Link>
        <p>
          From September 2021 to April 2023, I studied to earn a Diploma in Computer Information
          Systems (you can view my unofficial transcript <Link href="/transcript.pdf" target="_blank">here</Link>).
          I completed the program and earned a Dean&apos;s List certificate for the Fall 2022 and Winter 2023 semesters.
        </p>
      </section>
      <h1>Informal Education</h1>
      <section className={styles.educationSubsection}>
        <h1>Eloquent JavaScript</h1>
        <Link
          href="https://eloquentjavascript.net/"
          target="_blank"
        >
          Book by Marijn Haverbeke
        </Link>
        <p>
          Before starting my studies at Okanagan College, I read the book &quot;Eloquent JavaScript&quot;
          cover to cover. Despite its flaws, JavaScript has since been my most comfortable language and one that I will
          likely use for a long time.
        </p>
      </section>
      <section className={styles.educationSubsection}>
        <h1>C# Programming Courses</h1>
        <Link
          href="https://pvs.sd83.bc.ca/"
          target="_blank"
        >
          Pleasant Valley Secondary School
        </Link>
        <p>
          In highschool I took a couple of courses for programming which were taught with C#.
        </p>
      </section>
    </div>
  },
  {
    heading: "References",
    image: {
      fix: "left",
      url: "/crosswalk.jpg",
      alt: "An image of people crossing a street from a bird's eye view",
      title: "Photo by Ryoji Iwata Yin at https://unsplash.com/@ryoji__iwata"
    },
    description: <div className={styles.references}>
      <div className={styles.reference}>
        <h1>Arthur Boehm</h1>
        <Link
          href="mailto:aboehm@okanagan.bc.ca"
          target="_blank"
        >
          aboehm@okanagan.bc.ca
        </Link>
        <p>
          Art was one of my Professors at Okanagan College, where he teaches
          a number of Computer Science courses.
        </p>
      </div>
    </div>
  }
];

function ContentSlide({
  heading,
  image,
  description,
  status
}: {
  heading: string;
  image: {
    url: string;
    alt?: string;
    title?: string;
    fix?: string
  },
  description: ReactNode;
  status: "left" | "right" | "center";
}) {
  return (
    <div
      className={styles.contentSlide}
      data-status={status}
    >
      <h1
        className={styles.contentHeading}
      >
        {heading}
      </h1>
      <Image
        className={styles.contentImage}
        src={image.url}
        alt={image.alt ?? "image!"}
        title={image.title ?? "This is an image!"}
        height={1000}
        width={600}
        priority={true}
        style={{
          objectPosition: image.fix ?? "right"
        }}
      />
      <div
        className={styles.contentDescription}
        // hacky solution to some weird flex/grid thing that was going on with wide displays
        style={{
          justifyContent: (heading == "Technical Skills" ? "flex-start" : "center"),
          paddingTop: (heading == "Technical Skills" ? "2rem" : "1rem")
        }}
      >
        {description}
      </div>
    </div>
  )
}