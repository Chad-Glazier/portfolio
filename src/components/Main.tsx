import styles from "./Main.module.css"
import Carousel from "./misc/Carousel"
import { LeftArrow, RightArrow, VerticalSelector } from "./skyrim_ui"
import { useEffect, useRef, useState, type JSX, type PropsWithChildren } from "react"
import evacuationGif from "../assets/clips/evacuation_clip.gif"
import ediGif from "../assets/clips/edi_cli_clip.gif"
import apertureGif from "../assets/clips/aperture_clip.gif"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faGolang } from "@fortawesome/free-brands-svg-icons"
import Link from "./misc/Link"
import ApertureLogo from "./misc/ApertureLogo"

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
                <Projects />
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
            <Section opacity={opacity[idx]} hidden={opacity[idx] === 0}>
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

function Projects() {
    return <div className={styles.projectsOuter}>
        <Carousel
            items={[
                {
                    image: {
                        src: apertureGif,
                        alt: "a short clip of the Aperture OMR web interface",
                    },
                    links: [
                        {
                            href: "https://github.com/Chad-Glazier/aperture-omr",
                            icon: faGithub,
                            text: "Active Repository"
                        },
                        {
                            href: "https://github.com/UBCO-COSC499-S2026/capstone-team-15",
                            icon: faGithub,
                            text: "Original Proof-of-Concept",
                        }
                    ],
                    description: <ApertureOMR />
                },
                {
                    image: {
                        src: evacuationGif,
                        alt: "a short clip of Evacuation gameplay"
                    },
                    links: [
                        {
                            href: "https://chad-glazier.github.io/evacuation/",
                            icon: faGlobe,
				            text: "Play Online"
                        }, {
                            href: "https://github.com/Chad-Glazier/evacuation/",
                            icon: faGithub,
				            text: "Repository"
                        }
                    ],
                    description: <Evacuation />
                }, {
                    image: {
                        src: ediGif,
                        alt: "a short clip of the EDI command-line tool"
                    },
                    links: [
                        {
                            href: "https://ediproject.org/",
                            icon: faGlobe,
				            text: "Website"
                        }, {
                            href: "https://pkg.go.dev/github.com/Chad-Glazier/edi",
                            icon: faGolang,
				            text: "EDI Library"
                        }, {
                            href: "https://github.com/Chad-Glazier/edi_cli",
                            icon: faGithub,
                            text: "Command-line tool"
                        }
                    ],
                    description: <EDI />
                }, {
                    image: {
                        src: "",
                        alt: ""
                    },
                    links: [],
                    description: <ControlWard />
                },
            ]}
        />
    </div>
}

function ProjectDescription({ children }: PropsWithChildren) {
    return <article className={styles.projectsDescription}>
        {children}
    </article>
}

function ApertureOMR() {

    return <ProjectDescription>
        <div className={styles.logoWrapper}>
            <ApertureLogo size={100} />
        </div>
        <p>
            Aperture is an Optical Mark Recognition (OMR) program. Generally, OMR software is used to analyze uploaded scans of filled-in bubble sheets for automatic grading. The main selling point for Aperture specifically is its speed: ad hoc benchmarks and manual testing have shown it to run at about four times the speed of <Link text="other popular alternatives" href="https://github.com/Udayraj123/OMRChecker" />. 
        </p>
        <p>
            The first version of Aperture was developed by myself and five other team members as a proof-of-concept. Since then, I have continued to maintain and improve the core service responsible the PDF rendering, document preprocessing, and marking.
        </p>
    </ProjectDescription>
}

function EDI() {
    return <ProjectDescription>
        <h1>EDI</h1>
        <p>
            In one course I took, the culminating project was to design a program that plays a variant
            of Chess called <Link href="https://en.wikipedia.org/wiki/Game_of_the_Amazons" text="Amazons" />. My program, which I dubbed &ldquo;EDI,&rdquo; managed to win a tournament at UBC (for which I was awarded a Starbucks giftcard 🎉), but after the course ended I found myself still curious about some of the approaches I didn't have time to fully investigate. 
        </p>
        <p>
            I made <Link text="EDI" href="https://ediproject.org" /> as a project to satisfy that curiosity. It's an ongoing project with no clear endpoint, but I've made a few cool things for it: a Go library for implementing Amazons programs, a command-line tool to analyze such programs, a lightweight implementation that compiles to WebAssembly, and a website where you can play against that version.
        </p>
    </ProjectDescription>
}

function Evacuation() {
	return <ProjectDescription>
		<h1>Evacuation</h1>
		<p>
			Evacuation is a simple, zero-dependency browser-based game. The project's internals include basic shaders, procedures for generating simple meshes, affine transformations for vertices, game state management, the mapping of browser inputs to game actions, and collision detection. I only had to dip my toe into each of these areas to complete the project, but it was nonetheless a good learning experience.
		</p>
		<p>
			Handling the math for Evacuation also motivated me to create 
			a <Link href="https://jsr.io/@min-webgl/matrices" text="small library" /> for matrix algebra
			carefully written for performance. That package is used to render the graphics you
			see in the background of this page.
		</p>
	</ProjectDescription>
}

function ControlWard() {
    return <ProjectDescription>
        <h1>Control Ward</h1>
        <p>
            League of Legends is an immensely popular competitive game. Many of the players
            are interested in statistics that can tell them how well they're doing, how teams look going 
            into a game, and what strategies are most effective in the current patch. Several popular 
            websites have been developed to meet this demand&mdash;OP.GG, U.GG, League of Graphs, and 
            Porofessor, to name a few. 
        </p>
        <p>
            Personally, I have found most of these websites to have a pretty poor user experience. They  usually include ads, have strange quirks like requiring manual refreshes, and clutter the display with unimportant details. My goal with <Link href="https://controlward.com" text="controlward.com" /> is to provide an alternative that respects its users a little more.
        </p>
        <p>
            At the time of writing, this project is still in the early stages of development. I am currently working on developing a proof-of-concept which will hopefully be approved for Riot Games' developer program.
        </p>
    </ProjectDescription>
}

//
// 
//

//
// Miscellaneous stuff
//

type NextButtonProps = {
    text: string
    onClick: () => void
    arrowDirection: "left" | "right"
}

function NextButton({ text, onClick, arrowDirection }: NextButtonProps) {
    const [showArrow, setShowArrow] = useState(false)

    return <button
        className={styles.nextButton}
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
