// made a separate js folder so that Kanban can still work as modularised code, without disrupting other features that aren't modularised such as stopwatch
import Kanban from "./view/Kanban.js";

new Kanban(
	document.querySelector(".kanban")
);