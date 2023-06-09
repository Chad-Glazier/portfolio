import dark from "./dark.module.css";
import light from "./light.module.css";

const theme = new Map<string, Record<string, string>>();

theme.set("Home", light);
theme.set("Contact", light);
theme.set("Projects", dark);
theme.set("Resume", light);
theme.set("DARK", dark);
theme.set("LIGHT", light);

export default theme;