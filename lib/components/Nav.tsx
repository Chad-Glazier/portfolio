import styles from "@/styles/components/Nav.module.css";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { animateTextSwap } from "@/lib";
import Hamburger from "./Hamburger";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import Terminal from "./Terminal";
import { useRouter } from "next/router";

const firaCode = Fira_Code({ subsets: ["latin"] });

const pageUrls = new Map<string, string>();
pageUrls.set("Home", "/");
pageUrls.set("Projects", "/projects");
pageUrls.set("Education", "/education");
pageUrls.set("Contact", "/contact");

export default function Nav({
  onChange,
  className
}: {
  onChange?: (newPage: string) => void;
  className?: string;
}) {
  const [activePage, setActivePage] = useState<string>("--");
  const [otherPages, setOtherPages] = useState<string[]>([
    "Projects",
    "Education",
    "Contact",
    "Home"
  ]);
  const [open, setOpen] = useState(false);
  const inAnimation = useRef(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let initialPage = window.location.pathname.substring(1);
    if (initialPage === "") {
      initialPage = "home";
    }
    initialPage = capitalize(initialPage);
    setActivePage(initialPage);
    onChange && onChange(initialPage);
    setOtherPages(prev => prev.filter(page => page !== initialPage));
  }, []);

  return (
    <>
      <Terminal 
        show={showTerminal}
        pageName={activePage}
        otherPageNames={[...otherPages, "github"]}
        close={() => setShowTerminal(false)}
        onNavigate={(newPage) => {
          if (newPage == "github") {
            window.open("https://github.com/Chad-Glazier", "_blank");
            return;
          }
          newPage = capitalize(newPage);
          if (inAnimation.current) {
            return;
          }
          setOpen(false);
          onChange && onChange(newPage);
          inAnimation.current = true;
          const initialTargetPage = newPage || "Home";
          const initialActivePage = activePage;
          animateTextSwap(
            initialTargetPage,
            initialActivePage,
            {
              duration: 500,
              onFrame(newTargetPage, newActivePage) {
                setActivePage(newActivePage);
                setOtherPages(prev => prev.map((_, idx) => {
                  if (idx === otherPages.indexOf(newPage || "Home"))
                    return newTargetPage;
                  return prev[idx];
                }));                          
              },
              onComplete() {
                setActivePage(initialTargetPage);
                setOtherPages(prev => prev.map((_, idx) => {
                  if (idx === otherPages.indexOf(newPage || "Home"))
                    return initialActivePage;
                  return prev[idx];
                }))
                inAnimation.current = false;
              }
            }
          );          
          router.push("/" + newPage.toLowerCase());
        }}
      />
      <Head>
        <title>{activePage}</title>
      </Head>
      <nav 
        className={
          styles.nav 
          + " " + firaCode.className 
          + " " + (className ? className : "")
        }
      >
        <div 
          className={styles.activePageContainer}
        >
          <span
            onClick={() => setOpen(prev => !prev)}
          >
            <Hamburger open={open} pageName={activePage} />
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
                    onChange && onChange(page);
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
        {
          <Image
            className={
              styles.terminalIcon
              + ` ${showTerminal ? styles.active : styles.inactive}`
            }
            onClick={() => setShowTerminal(prev => !prev)}
            height={40}
            width={40}
            alt={"Open Terminal"}
            src={"/terminal.png"}
            title={"Click here to open the terminal!"}
          />
        }
      </nav>    
    </>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}