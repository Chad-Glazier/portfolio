import Link from "../../misc/Link";
import ProjectDescription from "./ProjectDescription";

function EDI() {
    return <ProjectDescription>
        <h1>EDI</h1>
        <p>
            In one course I took, the culminating project was to design a program that plays a variant
            of Chess called <Link href="https://en.wikipedia.org/wiki/Game_of_the_Amazons" text="Amazons" />.
            My program, which I dubbed &ldquo;EDI,&rdquo; managed to win a tournament at UBC (for which I was 
            awarded a Starbucks giftcard 🎉), but after the course ended I found myself still curious about some 
            of the approaches I didn't have time to fully investigate. 
        </p>
        <p>
            The <Link text="EDI Project" href="https://ediproject.org" /> was created to satisfy that curiosity. 
            It's an ongoing project of mine with no clear endpoint, but I've made a few cool things for it: a Go 
            library for implementing Amazons programs, a command-line tool to analyze such programs, a lightweight 
            implementation that compiles to WebAssembly, and a website where you can play against that version.
        </p>
    </ProjectDescription>
}

export default EDI
