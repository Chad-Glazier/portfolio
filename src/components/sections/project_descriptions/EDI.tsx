import Link from "../../misc/Link";
import ProjectDescription from "./ProjectDescription";

function EDI() {
    return <ProjectDescription>
        <h1>EDI</h1>
        <p>
            In an AI course I took, the culminating project was to design a program that plays a variant
            of Chess called <Link href="https://en.wikipedia.org/wiki/Game_of_the_Amazons" text="Amazons" />.
            During the design and development of my program, which I dubbed &ldquo;EDI,&rdquo; I did a
            lot of research into the history of Amazons and Chess programs more broadly. I managed
            to win a tournament at UBC (for which I was awarded a Starbucks giftcard 🎉), but after 
            the course ended I found myself still curious about all the approaches I learned about but 
            didn't have time to fully investigate.
        </p>
        <p>
            The <Link text="EDI Project" href="https://ediproject.org" /> was created to satisfy that curiosity. 
            It's an ongoing project of mine that will probably never be finished in any meaningful sense, but I
            have thus far created a few notable things in the pursuit of it: a Go library for implementing
            Amazons programs, a command-line tool to analyze such programs, a lightweight implementation 
            that compiles to WebAssembly, and a website where you can play against it.
        </p>
    </ProjectDescription>
}

export default EDI
