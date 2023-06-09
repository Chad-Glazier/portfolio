import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Projects.module.css";
import theme from "@/styles/theme";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DeleteButton } from "@/lib";

const themeStyles = theme.get("Projects")!;
const styles = mergeStyles(themeStyles, pageStyles);

export default function Projects() {
  const [exhibitSiteExpanded, setExhibitSiteExpanded] = useState(false);
  const [accumulatorMachineExpanded, setAccumulatorMachineExpanded] = useState(false);

  return (
    <article className={styles.page}>
      <h1 className={styles.sectionHeading}>
        Projects for Clients
      </h1>
      <section className={styles.projects}>
        <div 
          className={
            styles.project
            + ` ${exhibitSiteExpanded ? "" : styles.collapsed}`
          }
          onClick={() => {
            setExhibitSiteExpanded(true);
          }}
        >
          {exhibitSiteExpanded && 
            <DeleteButton 
              onClick={e => {
                e.stopPropagation();
                setExhibitSiteExpanded(prev => !prev)
              }} 
              className={styles.deleteButton}
            />
          }
          <h1>Vernon Museum Exhibit Website</h1>
          {exhibitSiteExpanded &&
            <div className={styles.links}>
              <Link
                className={styles.button + " " + styles.sourceCode}
                href="https://github.com/Chad-Glazier/exhibit-site#readme"
                target="_blank"
              >
                Source Code
              </Link> 
              <Link
                className={styles.button + " " + styles.liveSite}
                href="https://exhibit-site.vercel.app/"
                target="_blank"
              >
                See Live
              </Link>
            </div>
          }
          {!exhibitSiteExpanded ?
            <Image
              width={600}
              height={400}
              alt={"thumbnail"}
              src="https://img.youtube.com/vi/J03WOW2iSSg/sddefault.jpg"
              className={styles.demo}
            />
            :
            <iframe 
              width="1000" 
              height="400" 
              src="https://www.youtube.com/embed/J03WOW2iSSg" 
              title="Video Demo" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen={true}
              className={styles.demo}
            />            
          }
          <hr />
          <div className={styles.description}>
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
            <p style={{ width: "100%" }}>
              Below is a list of the technologies used in this project.
            </p>
            <table className={styles.technologies}>
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NextJS / React</td>
                  <td>The core framework</td>
                </tr>
                <tr>
                  <td>TypeScript</td>
                  <td>TypeScript&apos;s blue logo looks way nicer than JavaScript&apos;s yellow one.</td>
                </tr>
                <tr>
                  <td>MySQL & Prisma</td>
                  <td>The database system</td>
                </tr>
                <tr>
                  <td>Lexical</td>
                  <td>The framework used to create the rich text editors</td>
                </tr>
                <tr>
                  <td>Cloudflare R2</td>
                  <td>Third-party web service to store image uploads</td>
                </tr>
                <tr>
                  <td>Zod</td>
                  <td>Runtime type validation, especially for communication between the client and Rest API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <h1 className={styles.sectionHeading}>
        Personal Projects
      </h1>
      <section className={styles.projects}>
      <div 
          className={
            styles.project
            + ` ${accumulatorMachineExpanded ? "" : styles.collapsed}`
          }
          onClick={() => {
            setAccumulatorMachineExpanded(true);
          }}
        >
          {accumulatorMachineExpanded && 
            <DeleteButton 
              onClick={e => {
                e.stopPropagation();
                setAccumulatorMachineExpanded(prev => !prev)
              }} 
              className={styles.deleteButton}
            />
          }
          <h1>A Library for OOP in Lisp</h1>
          {!accumulatorMachineExpanded &&
            <Image
              style={{ marginTop: "2rem" }}
              className={styles.codeExample}
              src="/good-object-definition.png"
              alt="a thumbnail that shows some OOP Lisp code"
              width={400}
              height={400}
            />
          }
          {accumulatorMachineExpanded &&
            <div className={styles.links}>
              <Link
                className={styles.button + " " + styles.sourceCode}
                href="https://github.com/Chad-Glazier/r5rs-accumulator-machine"
                target="_blank"
              >
                Source Code
              </Link> 
            </div>
          }
          <div className={styles.description}>
            <h2>Preface</h2>
            <p>
              I will first point out that this project isn&apos;t by any means intended to be a performant or
              genuinely useful library; in fact, the idea of programming objects in Lisp is a makes me a 
              little nauseous. However, it was a fun project that forced me to go out of my comfort zone
              and consider some of the finer details of OOP and Lisp.
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
              className={styles.codeExample}
              src="/bad-object-definition.png"
              alt="the most beautiful code you've ever seen"
              width={400}
              height={1000}
            />
            <h2>The Solution</h2>
            <p>
              My personal goals with this task quickly outgrew the scope of the actual assignment,
              and I decided that instead of just implementing a bunch of closures by hand to represent
              the components of an accumulator machine, I would create a library for R5RS (the specification
              of Scheme that we were using) that made implementing such closures simple and somewhat
              syntactically familiar to non-Lisp programmers.
            </p>
            <Image
              className={styles.codeExample}
              src="/good-object-definition.png"
              alt="a bunch of ugly code"
              width={400}
              height={1000}
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
          </div>
        </div>
      </section>
    </article>
  );
}
