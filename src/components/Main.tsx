import styles from "./Main.module.css"
import { LeftArrow, RightArrow, VerticalSelector } from "./skyrim_ui"
import { useEffect, useRef, useState, type JSX, type PropsWithChildren } from "react"
import evacuationGif from "../assets/clips/evacuation_clip.gif"
import ediGif from "../assets/clips/edi_cli_clip.gif"
import apertureGif from "../assets/clips/aperture_clip.gif"
import headshot from "../assets/headshot.jpg"
import { faEnvelope, faFilePdf, faGlobe, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "./misc/Link"
import ApertureLogo from "./misc/ApertureLogo"
import EDILogo from "./misc/EDILogo"
import EvacuationLogo from "./misc/EvacuationLogo"
import ClipboardLink from "./misc/ClipboardLink"
import List from "./misc/List"
import ControlWardLogo from "./misc/ControlWardLogo"
import Card from "./skyrim_ui/Card"
import { RightButton } from "./skyrim_ui/Button"
import Heading from "./skyrim_ui/Heading"
import IconList from "./skyrim_ui/IconList"
import ShiftingElements from "./misc/ShiftingElements"

const sections = [
    "Introduction",
    "Projects",
    "Background",
    "Contact",
]

//
// Main component
//

type MainProps = {
    hidden: boolean
}

function Main({
    hidden
}: MainProps) {

    const mainClass = useRef(styles.main)
    const navClass = useRef(styles.nav)

    useEffect(() => {
        mainClass.current = styles.main
        navClass.current = styles.nav
        if (hidden) {
            mainClass.current += " " + styles.hidden
            navClass.current += " " + styles.hidden
        }
    }, [hidden])

    // The currently selected panel (i.e., nav item).
    const [activeIdx, setActiveIdx] = useState<number>(0)

    // Tracks whether the main view is in focus hidden behind the solar system
    // viewer.
    const [isBehind, setIsBehind] = useState(!hidden)
    useEffect(() => {
        setTimeout(() => {
            setIsBehind(hidden)
        }, 800)
    }, [hidden])

    return <main
        className={mainClass.current}
        style={{ zIndex: isBehind ? -1 : undefined }}
    >
        <VerticalSelector
            className={navClass.current}
            items={sections}
            onSelect={setActiveIdx}
            selected={activeIdx}
        />
        <Sections 
            sections={[
                <Introduction onNext={() => { setActiveIdx(x => x+1) }} />,
                <Projects onNextSection={() => { setActiveIdx(x => x+1) }}/>,
                <Background />,
                <Contact />
            ]}
            activeIdx={activeIdx}
        />        
    </main>
}

export default Main

//
// Sections wrapper
//

type SectionsProps = {
    sections: JSX.Element[]
    activeIdx: number
}

const fps = 60
const msPerFrame = 1000 / fps
const msPerAnim = 200

function Sections({ sections, activeIdx }: SectionsProps) {

    let [inAnim, setInAnim] = useState(false)
    let [opacity, setOpacity] = useState<number[]>(sections.map((_, idx) => {
        if (idx == activeIdx) {
            return 1.0
        } else {
            return 0.0
        }
    }))

    useEffect(() => {
        if (inAnim) {
            return
        }
        setInAnim(true)

        // Prevent changes to activeIdx from messing with the animation while
        // its running.
        let targetIdx = activeIdx

        let dO = 1 / (msPerAnim/msPerFrame)

        let anim = setInterval(() => {
            setOpacity(prev => prev.map((o, idx) => {
                if (idx == targetIdx) {
                    return Math.min(1.0, o + dO)
                } else {
                    return Math.max(0.0, o - dO)
                }
            }))
        }, msPerFrame)
        
        setTimeout(() => {
            setOpacity(prev => prev.map((_, idx) => {
                if (idx == targetIdx) {
                    return 1.0
                } else {
                    return 0.0
                }
            }))
            clearInterval(anim)
            setInAnim(false)
        }, msPerAnim)

    }, [activeIdx])

    return <div className={styles.sections}>
        {sections.map((el, idx) =>
            <Section key={idx} opacity={opacity[idx]} hidden={opacity[idx] === 0}>
                {el}
            </Section>
        )}
    </div>
}

type SectionProps = PropsWithChildren<{
    opacity: number
    hidden?: boolean
}>

function Section({ hidden, opacity, children }: SectionProps) {
    let className = styles.section
    if (hidden) className += " " + styles.hidden

    return <section className={className} style={{ opacity: opacity }}>
        {children}
    </section>
}

//
// Introduction section
//

type IntroductionProps = {
    onNext: () => void
}

function Introduction({ onNext }: IntroductionProps) {
    return <div className={styles.introOuter}>
        <div className={styles.introInner}>
            <h1 className={styles.heading}>
                Hello, World.
            </h1>
            <p>
                My name is Chad Glazier and I write programs. I'm primarily 
                interested in performance-intensive systems, interfaces that
                prioritize the user, and software that doesn't have to be 
                rewritten. 
            </p>
            <p className={styles.nextButtonContainer}>
                <NextButton 
                    text="See what I'm working on"
                    onClick={onNext}
                    arrowDirection="right"
                />       
            </p>
        </div>
    </div>
}

//
// Projects section
//

const projectArticles = [
    {
        label: "Evacuation",
        image: evacuationGif,
        header: <EvacuationLogo />,
        links: [
            {
                href: "https://chad-glazier.github.io/evacuation/",
                text: "Play",
                icon: faGlobe,
            },
            {
                href: "https://github.com/Chad-Glazier/evacuation",
                text: "Repository",
                icon: faGithub
            }
        ],
        body: <>
            <p>
                Evacuation is a simple 3D browser game with no external dependencies. The project includes OpenGL shaders, procedures for generating simple meshes, collision detection, game state management, and all of the necessary math to go with it. I only had to lightly touch on each of these subjects to get it working, but it was a very good learning experience.
            </p>
            <img src={evacuationGif} alt="thumbnail" />
            <p>
                Handling the math for Evacuation also motivated me to create a <Link href="https://jsr.io/@min-webgl/matrices" text="small library" /> for matrix algebra. That package is used for the graphics you see in the background of this page.
            </p>
        </>
    },
    {
        label: "Aperture",
        image: apertureGif,
        header: <ApertureLogo size={100} />,
        links: [
            {
                href: "https://github.com/Chad-Glazier/aperture-omr",
                text: "Repository",
                icon: faGithub,
            },
        ],
        body: <>
            <p>
                Aperture is an Optical Mark Recognition (OMR) program, meaning that it is used to automatically grade scans of filled-in bubble sheets. The main selling point for Aperture in particular is its speed: ad hoc benchmarks and manual testing have shown it to run about an order of magnitude faster than <Link text="other popular alternatives" href="https://github.com/Udayraj123/OMRChecker" />. Additionally, unlike the typical licensed software that most schools use, Aperture is free and can be configured to work with virtually any kind of bubble sheet.
            </p>
            <p>
                The first version of Aperture was developed by myself and five other team members as a proof-of-concept. The project included a complete web app split into three parts: a Python back-end for the website, a front-end written with Angular, and a core OMR server written in Go. Since then, I have continued to maintain and improve the OMR server as a standalone web service.
            </p>        
        </>
    },
    {
        label: "EDI",
        image: ediGif,
        header: <EDILogo />,
        links: [
            {
                href: "https://github.com/Chad-Glazier/edi",
                text: "Repository",
                icon: faGithub,
            },
            {
                href: "https://raw.githubusercontent.com/Chad-Glazier/edi/main/docs/EDI_Report.pdf",
                text: "Report",
                icon: faFilePdf
            },
            { 
                href: "https://ediproject.org", 
                text: "Website",
                icon: faGlobe,
            },
            
        ],
        body: <>
            <p>
                The <Link href="https://en.wikipedia.org/wiki/Game_of_the_Amazons" text="Game of Amazons" /> is a relatively new board game that gained popularity in the 2000's as a research subject in the field of artificial intelligence. In early 2026, UBC held a computer Amazons tournament. The program I designed for the event, named EDI (&ldquo;ee-dee&rdquo;), managed to go undefeated and earn me the highly sought-after prize&mdash;a Starbucks giftcard. Since then, I have continued developing the project and have expanded it to include a library of generalized components and a command-line tool to help analyze Amazons programs.
            </p>
            <img src={ediGif} alt="thumbnail" />
        </>
    },
    {
        label: "Control Ward",
        header: <ControlWardLogo height={"100px"} />,
        links: [
            {
                href: "https://controlward.com/",
                text: "Visit",
                icon: faGlobe,
            },
            {
                href: "https://github.com/Chad-Glazier/controlward",
                text: "Repository",
                icon: faGithub,
            }
        ],
        body: <>
            <p>
                League of Legends is an immensely popular competitive game. Many of its players are interested in statistics that can tell them how well they're doing, how teams look going into a game, and what strategies are most effective in the current patch. Several popular websites have been developed to meet this demand&mdash;OP.GG, U.GG, League of Graphs, and Porofessor, to name a few. Personally, I have found most of these websites to have a sub-par user experience. My goal with <Link href="https://controlward.com" text="controlward.com" /> is to provide an alternative that's a little more convenient.
            </p>
            <p>
                At the time of writing, the project is still in the early stages of development.
            </p>
        </>
    }
]

type ProjectsProps = {
    onNextSection: () => void
}

function Projects({ onNextSection }: ProjectsProps) {

    const [activeIdx, setActiveIdx] = useState(0)

    let articles: JSX.Element[] = projectArticles.map((p, i) => {

        let nextSectionLabel = sections[sections.indexOf("Projects") + 1]

        let nextLabel: string
        let nextIdx = i + 1
        if (nextIdx < projectArticles.length) {
            nextLabel = projectArticles[nextIdx].label
        } else {
            nextLabel = nextSectionLabel
        }

        return <>
            <ProjectArticle 
                label={p.label}
                image={p.image}
                links={p.links} 
                header={p.header} 
                body={p.body}
                nextLabel={nextLabel}      
                onNext={() => {
                    if (nextIdx < projectArticles.length) {
                        setActiveIdx(x => x+1)
                    } else {
                        setTimeout(() => {
                            setActiveIdx(0)
                        }, 800)
                        onNextSection()
                    }
                }}
            />
        </>
    })

    return <>
        <ShiftingElements
            className={styles.projects}
            items={articles}
            activeIndex={activeIdx}
        />   
        <VerticalSelector 
            items={projectArticles.map(x => x.label)} 
            onSelect={setActiveIdx} 
            selected={activeIdx}  
            className={styles.projectsMenu}    
            style="flat"
        /> 
    </>
}

type ProjectArticleProps = {
    label: string
    image?: string
    links: {    
        href: string
        text: string
        icon: IconDefinition
    }[] 
    header: JSX.Element
    body: JSX.Element
    nextLabel: string
    onNext: () => void
}

function ProjectArticle({
    links,
    header,
    body,
    nextLabel,
    onNext
}: ProjectArticleProps) {
    return <article className={styles.projectArticle}>
        <div className={styles.header}>
            {header}
        </div>
        <article className={styles.projectsDescription}>
            {body}
            <List 
                className={styles.links}
                items={links.map(({ href, text, icon }) => 
                    <Link href={href} text={text} icon={icon} />
                )}
            />
            <RightButton 
                text={nextLabel} 
                onClick={onNext} 
                className={styles.nextButton}
            />
        </article>
    </article>
}

//
// Contact Section
//

function Contact() {
    return <div className={styles.contactOuterContainer}>
        <Card>
            <section className={styles.contactContainer}>
                <img
                    src={headshot}
                    alt="A portrait of me."
                    className={styles.portrait}
                />
                <div className={styles.contactInfo}>
                    <p>
                        If you want to hire me so I can afford more Magic: the Gathering cards, feel free to reach out.
                    </p>
                    <List items={[
                        <ClipboardLink 
                            icon={faEnvelope}
                            string="chadglazier@outlook.com" 
                            text="Email" 
                        />,
                        <Link 
                            icon={faGithub}
                            href={"https://github.com/Chad-Glazier"}
                            text="Github"
                        />,
                        <Link 
                            icon={faLinkedin}
                            href="https://www.linkedin.com/in/chad-glazier-4b585a257/"
                            text="LinkedIn"
                        />,
                    ]}            
                    />
                </div>
            </section>            
        </Card>
    </div>
}

//
// Background Section
//

function Background() {

    // - Computer Science degree
    // - Computer Information Systems Diploma
    // - The Cube School (Python Instructor)
    // - Contract Web Developer for Vernon Museum

    return <div className={styles.backgroundContainer}>
        <Heading className={styles.sectionHeader} text="Education" style="college" />
        <Card className={styles.card} thickness={20}>
            <div className={styles.cardInner}>
                <h2>Bachelor of Science in Computer Science</h2>
                <List
                    items={[
                        <>University of British Columbia &mdash; 2026</>,
                    ]}
                />
                <h2>Computer Information Systems Diploma</h2>
                <List
                    items={[
                        <>Okanagan College &mdash; 2023</>,
                    ]}
                />                
            </div>
        </Card>
        <Heading className={styles.sectionHeader} text="Work Experience" style="hearthfire" />
        <Card className={styles.card} thickness={20}>
            <div className={styles.cardInner}>
                <h2>Python Programming Instructor</h2>
                <IconList 
                    row
                    items={[
                        { icon: "college", text: "The Cube School" },
                        { icon: "quest", text: "Summer 2023" },
                        
                    ]}
                    className={styles.list}
                />
                <p>
                    Worked 
                </p>
            </div>
        </Card>
        <Card className={styles.card} thickness={20}>
            <div className={styles.cardInner}>
                <h2>Web Developer</h2>
                <IconList
                    row
                    items={[
                        { icon: "college", text: "The Museum & Archives of Vernon" },
                        { icon: "quest", text: "Spring 2023" },
                        { icon: "mine", text: "Contract" },
                    ]}
                />
                <p>
                    In early 2023, I was part of a group of three students from Okanagan College that were asked by the Vernon Museum to develop a website to display &ldquo;virtual exhibits.&rdquo; The project took a few months to complete and included both an administrative page for creating exhibits and a public-facing page to view those exhibits. The technologies used included React (Next.js with TypeScript), MySQL, and S3. 
                </p>
            </div>
        </Card>
    </div>
}

//
// Miscellaneous stuff
//

type NextButtonProps = {
    text: string
    onClick: () => void
    arrowDirection: "left" | "right"
    className?: string
}

function NextButton({ 
    text, 
    onClick, 
    arrowDirection, 
    className,
}: NextButtonProps) {
    const [showArrow, setShowArrow] = useState(false)

    return <button
        className={styles.nextButton + " " + (className ?? "")}
        onClick={onClick}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
    >
        {arrowDirection == "left"
            ? <><LeftArrow hidden={!showArrow} /> {text}</>
            : <>{text} <RightArrow hidden={!showArrow} /></>}
        <div className={styles.underline}></div>
    </button>        
}
