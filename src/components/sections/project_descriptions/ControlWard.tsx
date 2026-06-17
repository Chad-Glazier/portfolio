import Link from "../../misc/Link";
import ProjectDescription from "./ProjectDescription";

function ControlWard() {
    return <ProjectDescription>
        <h1>Control Ward</h1>
        <p>
            League of Legends is an immensely popular competitive game. Many of the players
            are interested in statistics that indicate well they're doing, how teams look going into a game, 
            and what strategies are most effective in the current patch. To meet this demand, 
            several popular websites have been developed (OP.GG, U.GG, League of Graphs, and Porofessor, 
            to name a few). Personally, I have found these websites to have a pretty poor user 
            experience&mdash;they are gradually becoming bloated with unwanted features, have tedious things 
            like requiring manual refreshes, and some have even begun including jamming ads into any free 
            space they can. 
            My goal with <Link href="https://controlward.com" text="controlward.com" /> is to provide an 
            alternative that respects its users a little more.
        </p>
        <p>

        </p>
    </ProjectDescription>
}

export default ControlWard
