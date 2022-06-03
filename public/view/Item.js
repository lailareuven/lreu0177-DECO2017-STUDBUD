// REFERENCE: dcode. (2021). How to Build a Kanban Board with JavaScript (No Frameworks) [Video]. Retrieved 2 June 2022, from https://www.youtube.com/watch?v=ijQ6dCughW8.

import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
	constructor(id, content) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
		this.elements.root.appendChild(bottomDropZone);

		// when the user clicks on content to edit it and then clicks away - checks if user has edited item and if they have will save it 
		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			if (newContent == this.content) {
				return;
			}

			this.content = newContent;

			KanbanAPI.updateItem(id, {
				content: this.content
			});
		};

		// when user double clicks on item they recieve a popup asking them if they are sure they want to delete - this follows Nielsen's heuristic of Error Prevention https://www.nngroup.com/articles/ten-usability-heuristics/
		this.elements.input.addEventListener("blur", onBlur);
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Are you sure you want to delete this item?");

			// if user confirms that they want to delete an item, it will be removed from the column
			if (check) {
				KanbanAPI.deleteItem(id);

				this.elements.input.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});

		// communicate between two html elements as they get dragged and dropped
		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		// prevent the text from appearing inside the input fields by accident 
		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
				<div class="kanban__item-input" contenteditable></div>
			</div>
		`).children[0];
	}
}
