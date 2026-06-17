import Link from "../../misc/Link";
import ProjectDescription from "./ProjectDescription";

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
            Personally, I have found most of these websites to have a pretty poor user experience. They 
            usually include ads, have strange quirks like requiring manual refreshes, and clutter the 
            display with unimportant information. My goal 
            with <Link href="https://controlward.com" text="controlward.com" /> is to provide an alternative 
            that respects its users a little more.
        </p>
        <p>

        </p>
    </ProjectDescription>
}

export default ControlWard
