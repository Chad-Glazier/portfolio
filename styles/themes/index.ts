import dark from "./dark.module.css";
import light from "./light.module.css";
import blue from "./blue.module.css";
import white from "./white.module.css";

const theme = new Map<string, Record<string, string>>();

theme.set("Intro", light);
theme.set("Contact", white);
theme.set("Portfolio", blue);
theme.set("Skills", blue);
theme.set("DARK", dark);
theme.set("LIGHT", light);
theme.set("BLUE", blue);
theme.set("WHITE", white);

export default theme;