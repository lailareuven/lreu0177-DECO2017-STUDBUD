// REFERENCE: dcode. (2021). How to Build a Kanban Board with JavaScript (No Frameworks) [Video]. Retrieved 2 June 2022, from https://www.youtube.com/watch?v=ijQ6dCughW8.


// made a separate js folder so that Kanban can still work as modularised code, without disrupting other features that aren't modularised such as stopwatch
import Kanban from "./view/Kanban.js";

new Kanban(
	document.querySelector(".kanban")
);


