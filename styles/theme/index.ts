import dark from "./dark.module.css";
import light from "./light.module.css";
import blue from "./blue.module.css";

const theme = new Map<string, Record<string, string>>();

theme.set("Home", light);
theme.set("Contact", light);
theme.set("Portfolio", dark);
theme.set("Resume", blue);
theme.set("DARK", dark);
theme.set("LIGHT", light);

export default theme;