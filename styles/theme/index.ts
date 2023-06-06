import dark from "./dark.module.css";
import light from "./light.module.css";

const theme = new Map();

theme.set("Home", light);
theme.set("Contact", dark);
theme.set("Projects", dark);
theme.set("Education", dark);

export default theme;