import styles from "@/styles/components/Nav.module.css";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { animateTextSwap } from "@/lib";
import Hamburger from "./Hamburger";

// map the page names to their urls.
const pageUrls = new Map<string, string>();
pageUrls.set("Home", "/");
pageUrls.set("Projects", "/projects");
pageUrls.set("Education", "/education");
pageUrls.set("Contact", "/contact");

export default function Nav() {
  const [activePage, setActivePage] = useState<string>("----");
  const [otherPages, setOtherPages] = useState<string[]>([
    "Projects",
    "Education",
    "Contact",
    "Home"
  ]);
  const [open, setOpen] = useState(false);
  const inAnimation = useRef(false);

  useEffect(() => {
    let initialPage = window.location.pathname.substring(1);
    if (initialPage === "") {
      initialPage = "home";
    }
    initialPage = capitalize(initialPage);
    setActivePage(initialPage);
    setOtherPages(prev => prev.filter(page => page !== initialPage));
  }, []);

  return (
    <>
      <Head>
        <title>{activePage}</title>
      </Head>
      <nav className={styles.nav}>
        <div 
          className={styles.activePageContainer}
        >
          <span
            onClick={() => setOpen(prev => !prev)}
          >
            <Hamburger open={open} />
          </span>
          <span
            onClick={() => setOpen(prev => !prev)}
          >
            {activePage}  
          </span>
        </div>
        <div 
          className={styles.inactivePages + (open ? ` ${styles.open}` : ` ${styles.closed}`)}
        >
        {
          otherPages
            .map((page, i) => (
              <div key={page} className={styles.navItem}>
                <Link
                  href={pageUrls.get(page) ?? ""}
                  className={styles.navItem}
                  onClick={e => {
                    if (inAnimation.current) {
                      e.preventDefault();
                      return;
                    }
                    setOpen(false);
                    inAnimation.current = true;
                    const initialTargetPage = page;
                    const initialActivePage = activePage;
                    animateTextSwap(
                      initialTargetPage,
                      initialActivePage,
                      {
                        duration: 500,
                        onFrame(newTargetPage, newActivePage) {
                          setActivePage(newActivePage);
                          setOtherPages(prev => prev.map((_, idx) => {
                            if (idx === i)
                              return newTargetPage;
                            return prev[idx];
                          }));                          
                        },
                        onComplete() {
                          setActivePage(initialTargetPage);
                          setOtherPages(prev => prev.map((_, idx) => {
                            if (idx === i)
                              return initialActivePage;
                            return prev[idx];
                          }))
                          inAnimation.current = false;
                        }
                      }
                    );
                  }}
                >
                  {page}
                </Link>
              </div>
            ))
        }    
        </div>

      </nav>    
    </>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}