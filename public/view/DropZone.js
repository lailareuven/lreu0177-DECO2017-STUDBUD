// reference: https://www.youtube.com/watch?v=ijQ6dCughW8 
// area where user can drop an item - makes it clearer to the user what the result of their actions will be
// this follows Nielsen's heuristic of Visibility of System Status which encourages keeping users informed about their interactions and what their next steps will be https://www.nngroup.com/articles/ten-usability-heuristics/

import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];
		
		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("kanban__dropzone--active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		// when the user decides to drop onto a DropZone
		dropZone.addEventListener("drop", e => {
			e.preventDefault();
			dropZone.classList.remove("kanban__dropzone--active");

			const columnElement = dropZone.closest(".kanban__column");
			const columnId = Number(columnElement.dataset.id);

			// figuring out what position the user dropped the item in a column 
			const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));

			const droppedIndex = dropZonesInColumn.indexOf(dropZone);
			const itemId = Number(e.dataTransfer.getData("text/plain"));
			const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
			const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;

			if (droppedItemElement.contains(dropZone)) {
				return;
			}
			
			// when the user drags and drops an item they will be able to see it instantly appear in the new column to provide user with immediate feedback - this will allow them to see the impact of their actions straight away which also follows Neilsen's heuristic of Visibility of System Status 
			insertAfter.after(droppedItemElement);
			KanbanAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex
			});
		});

		return dropZone;
	}
}
