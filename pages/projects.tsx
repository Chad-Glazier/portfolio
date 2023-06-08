import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Projects.module.css";
import theme from "@/styles/theme";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { DeleteButton } from "@/lib";

const themeStyles = theme.get("Projects")!;
const styles = mergeStyles(themeStyles, pageStyles);

export default function Projects() {
  const [exhibitSiteExpanded, setExhibitSiteExpanded] = useState(false);

  return (
    <article className={styles.page}>
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
                href="https://github.com/Chad-Glazier/exhibit-site"
                target="_blank"
              >
                Open on Github
              </Link> 
              <Link
                href="https://exhibit-site.vercel.app/"
                target="_blank"
              >
                Visit the Site
              </Link>
            </div>
          }
          {!exhibitSiteExpanded ?
            <Image
              width={600}
              height={400}
              alt={"thumbnail"}
              src="https://img.youtube.com/vi/J03WOW2iSSg/0.jpg"
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
          <div className={styles.description}>
            <p>
              This website was created for the Greater Vernon Museum &amp;
              Archives to create and display virtual exhibits. Their <Link href="https://vernonmuseum.ca/" target="_blank">original site</Link> was built with Wordpress, but they wanted me to create a
              simpler content management system that was specific to their needs.
            </p>
            <p>
              At the time of writing, the website is not yet fully deployed. However, you can visit
              the live version <Link href="https://exhibit-site.vercel.app" target="_blank">here</Link>.  
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
