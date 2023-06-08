import dark from "./dark.module.css";
import light from "./light.module.css";

const theme = new Map<string, Record<string, string>>();

theme.set("Home", light);
theme.set("Contact", dark);
theme.set("Projects", dark);
theme.set("Resume", dark);

export default theme;