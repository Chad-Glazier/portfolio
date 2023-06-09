import componentStyles from "@/styles/components/Nav.module.css";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState, useRef, useCallback } from "react";
import { animateTextSwap } from "@/lib";
import Hamburger from "./Hamburger";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import Terminal from "./Terminal";
import { useRouter } from "next/router";
import theme from "@/styles/themes";
import mergeStyles from "../functions/mergeStyles";

const firaCode = Fira_Code({ subsets: ["latin"] });

const pageUrls = new Map<string, string>();
pageUrls.set("Intro", "/");
pageUrls.set("Portfolio", "/portfolio");
pageUrls.set("Skills", "/skills");
pageUrls.set("Contact", "/contact");

export default function Nav({
  onChange,
  className,
  target
}: {
  onChange?: (newPage: string) => void;
  className?: string;
  target?: string;
}) {
  const [activePage, setActivePage] = useState<string>("--");
  const [otherPages, setOtherPages] = useState<string[]>([
    "Portfolio",
    "Skills",
    "Contact",
    "Intro"
  ]);
  const [open, setOpen] = useState(false);
  const inAnimation = useRef(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const router = useRouter();
  const [terminalHasBeenClicked, setTerminalHasBeenClicked] = useState(false);

  useEffect(() => {
    let initialPage = window.location.pathname.substring(1);
    if (initialPage === "") {
      initialPage = "intro";
    }
    initialPage = capitalize(initialPage);
    onChange && onChange(initialPage);
    setActivePage(prev => initialPage);
    setOtherPages(prev => prev.filter(page => page !== initialPage));
    setStyles(mergeStyles(componentStyles, theme.get(initialPage)!));
  }, [onChange]);

  const [styles, setStyles] = useState(mergeStyles(componentStyles, theme.get("Intro")!));

  const swapActive = useCallback((
    newPage: string
  ) => {
    if (newPage == "github") {
      window.open("https://github.com/Chad-Glazier", "_blank");
      return;
    }
    if (inAnimation.current) {
      return;
    }
    const targetIndex = otherPages.indexOf(capitalize(newPage) || "Intro");
    if (targetIndex == -1) {
      console.error(`${newPage} is not a valid target. Current state's \`otherPages\`:`);
      console.error(otherPages);
      return;
    }
    inAnimation.current = true;
    const initialTargetPage = otherPages[targetIndex];
    const initialActivePage = activePage;
    setStyles(mergeStyles(componentStyles, theme.get(initialTargetPage)!))
    animateTextSwap(
      initialTargetPage,
      initialActivePage,
      {
        duration: 500,
        onFrame(newTargetPage, newActivePage) {
          setActivePage(prev => newActivePage);
          setOtherPages(prev => 
            prev.map((el, i) => i == targetIndex ? newTargetPage :  el)
          )                       
        },
        onComplete() {
          inAnimation.current = false;
        }
      }
    );
    setOpen(false);
    onChange && onChange(initialTargetPage);
  }, [activePage, onChange, otherPages]);

  useEffect(() => {
    if (target !== undefined) {
      swapActive(target ?? "Intro");
      router.push("/" + (target?.toLowerCase() ?? ""));      
    }
  }, [target, router, swapActive]);

  return (
    <>
      <Terminal 
        show={showTerminal}
        pageName={activePage}
        otherPageNames={[...otherPages, "github"]}
        close={() => setShowTerminal(false)}
        onNavigate={(newPage) => {
          swapActive(newPage); 
          if (newPage != "github") {
            router.push("/" + newPage.toLowerCase());
          }        
        }}
      />
      <Head>
        <title>{`Chad Glazier | ${activePage}`}</title>
      </Head>
      <nav 
        className={
          styles.nav 
          + " " + (open ? styles.open : "")
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
            .map((page, index) => (
              <div key={page} className={styles.navItem}>
                <Link
                  href={pageUrls.get(page) ?? ""}
                  onClick={e => {
                    if (inAnimation.current) {
                      e.preventDefault();
                    }
                    swapActive(page);
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
              + ` ${theme.get(activePage)?.terminalIcon}`
              + ` ${terminalHasBeenClicked ? "" : styles.neverClicked}`
            }
            onClick={() => {
              setShowTerminal(prev => !prev);
              setTerminalHasBeenClicked(true);
            }}
            height={40}
            width={50}
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