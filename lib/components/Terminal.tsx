import styles from "@/styles/components/Terminal.module.css";
import theme from "@/styles/theme";
import { Fira_Code } from "next/font/google";
import { useState, useRef } from "react";
import { DoublyLinkedList, animateText } from "@/lib";

const firaCode = Fira_Code({
  subsets: [ "latin" ]
});

export default function Terminal({
  pageName,
  otherPageNames,
  show,
  onNavigate,
  close
}: {
  pageName: string;
  otherPageNames: string[];
  show: boolean;
  onNavigate: (newPage: string) => void;
  close: () => void;
}) {
  let history = useRef<null | DoublyLinkedList<string>>(null);
  const [output, setOutput] = useState(
` .       __         .                                  /
  /       |    ___   |     ___    __.  , _ , _     ___  |
  |       |  .'   \`  |   .'   \` .'   \ |' \`|' \`. .'   \` |
  |  /\   /  |----'  |   |      |    | |   |   | |----' |
  |,'  \,'   \`.___, /\__  \`._.'  \`._.' /   '   / \`.___, \`
                                                        '
                                                 
Enter \`help\` for a list of commands.
`
  );
  const [input, setInput] = useState("");
  const ctrlKeyPressed = useRef(false);

  return (
    <div className={styles.backdrop + " " + (show ? "" : styles.closed)} onClick={close}>
      <form
        onClick={e => {
          document.getElementById("terminal-input")!.focus();
          e.stopPropagation();
        }}
        className={
          styles.terminal
          + ` ${show ? styles.show : styles.hide}`
          + ` ${(theme.get(pageName) ?? theme.get("Home")).terminal}`
          + ` ${firaCode.className}`
        }
        onSubmit={e => {
          e.preventDefault();
          let newOutput = processCommand(input, {
            currentPage: pageName,
            otherPages: otherPageNames,
            onNavigate,
            close       
          });

          setOutput(prev => {
            return prev + "\n" + "> " + input + (newOutput ? `\n${newOutput}` : "");
          });

          if (input !== "" && history.current !== null) {
            history.current = history.current.append(input);
          }
          if (input !== "" && history.current === null) {
            history.current = new DoublyLinkedList(input);
          }

          setInput("");
          setTimeout(() => {
            const $output = document.getElementById("output");
            $output!.scrollTop = $output?.scrollHeight! + 500;          
          }, 0);
        }}
      >
        <section
          id="output"
          className={styles.output}
        >
          {output}
        </section>
        <input 
          id="terminal-input"
          type="text" 
          className={styles.input + ` ${firaCode.className}`} 
          value={"> " + input}
          onChange={(e) => {
            setInput(e.target.value.substring(2));
          }}
          onKeyDown={e => {
            if (!show) return;
            switch (e.key) {
              case "Control":
                ctrlKeyPressed.current = true;
                break;
              case "l":
                if (ctrlKeyPressed.current) {
                  e.preventDefault();
                  setOutput("");
                }
                break;
              case "ArrowUp":
                if (history.current !== null) {
                  e.preventDefault();
                  setInput(history.current.value);
                  if (history.current.prev) {
                    history.current = history.current.prev;
                  }
                }
                break;
              case "ArrowDown":
                if (history.current !== null) {
                  e.preventDefault();
                  setInput(history.current.value);
                  if (history.current.next) {
                    history.current = history.current.next;
                  }
                }
                break;
              case "Escape":
                e.preventDefault();
                close();
              case "Tab":
                e.preventDefault();
                if (input == "") return;
                let commandWords = input.split(/\s/).filter(el => !el.startsWith("-"));
                let searchString = commandWords[commandWords.length - 1];
                const matches = [...otherPageNames, pageName]
                  .filter(page => page.toLowerCase().startsWith(searchString));
                if (matches.length == 0) return;
                if (matches.length == 1) {
                  setInput(prev => prev.substring(0, prev.lastIndexOf(searchString)) + matches[0].toLowerCase());
                }
                if (matches.length > 1) {
                  setOutput(prev => prev + "\n" + matches.join("  ").toLowerCase());
                }
                setTimeout(() => {
                  const $output = document.getElementById("output");
                  $output!.scrollTop = $output?.scrollHeight! + 100;          
                }, 0);
              default:
                if (ctrlKeyPressed.current) {
                  setInput(prev => prev + "^" + e.key.toUpperCase());
                  e.preventDefault();
                }
            }
          }}
          onKeyUp={e => {
            if (!show) return;
            switch (e.key) {
              case "Control":
                  ctrlKeyPressed.current = false;
                  break;
            }
          }}
        />
      </form>
    </div>
  )
}

type Context = {
  currentPage: string;
  otherPages: string[];
  onNavigate: (newPage: string) => void;
  close: () => void;
};

function processCommand(
  rawInputString: string,
  context: Context
): string {
  const words = rawInputString.split(/\s+/);
  if (!words.some(word => !word.startsWith("-"))) {
    return commands.error.noCommand();
  }

  let flags = words
    .filter(word => word.startsWith("-"))
    .map(word => {
      if (word.startsWith("--")) {
        return word.substring(2);
      }
      if (word.startsWith("-"))
        return word.substring(1).split("");
      }
    )

  const command = words
      .filter(word => !word.startsWith("-"))
      [0];

  const args = words
      .filter(word => !word.startsWith("-"))
      .slice(1);

  return evaluateCommand(command, flags as string[], args, context);
}

function evaluateCommand(
  command: string,
  flags: string[],
  args: string[],
  context: Context
) {
  switch (command) {
    case "pwd":
      return commands.pwd(context.currentPage);
    case "ls":
      return commands.ls([context.currentPage, ...context.otherPages], flags, args);
    case "cd":
      return commands.cd([context.currentPage, ...context.otherPages], args, context.onNavigate);
    case "help":
      return commands.help();
    case "exit":
      context.close();
      return "exiting";
      case "":
      return commands.error.noCommand();
    default:
      return commands.error.unrecognizedCommand(command);
  }
}

const commands = {
  pwd(currentPage: string): string {
    return "/" + currentPage.toLowerCase();
  },
  ls(pages: string[], flags: string[], args: string[]): string {
    if (flags.some(flag => flag == "l")) {
      return pages
        .map(page => `${page == "github" ? "l" : "d"}rwxr-xr-x ${page == "github" ? "github.com  " : "chad-glazier"} ` + page.toLowerCase())
        .join("\n");
    }
    return pages
      .map(page => `${page}`.toLowerCase())
      .join("  ");
  },
  cd(pages: string[], args: string[], navigateTo: (newPage: string) => void): string {
    if (args.length == 0 || args[0] == "") {
      return "`cd` expects an argument.";
    }
    if (args[0] == "home" || args[0] == "/") {
      navigateTo("");
      return "";
    }
    if (pages.some(page => page.toLowerCase() == args[0])) {
      navigateTo(args[0]);
      return "";
    }
    if (pages.some(page => `/${page.toLowerCase()}` == args[0])) {
      navigateTo(args[0].substring(1));
      return "";
    }
    return `Unknown page \`${args[0]}\``;
  },
  help(): string {
    return [
      "Available commands:",
      "\t`ls`: list the available pages.",
      "\t      The `-l` flag reveals more information",
      "\t      about the file.",
      "\t`pwd`: print the full name of the current page.",
      "\t`cd <pagename>`: open the named page. ",
      "\t`exit`: exit the terminal",
      "",
      "Special key inputs:",
      "\tCtrl + l: clear the terminal",
      "\tTab: autocomplete a page name",
      "\tUp and Down Arrows: select from a previously",
      "\tentered command",
      "\tEscape Key: exit the terminal",
      ""
    ].join("\n");
  },
  error: {
    unrecognizedCommand(command: string): string {
      return [
        "Unrecognized command `" + command + "`",
        "Enter `help` for a list of available commands."
      ].join("\n");
    },
    noCommand(): string {
      return [
        "No command entered.",
        "Enter `help` for a list of available commands."
      ].join("\n");      
    }
  }
};
