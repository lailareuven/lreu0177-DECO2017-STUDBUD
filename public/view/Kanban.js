import Column from "./Column.js";

export default class Kanban {

	// referring to div class="kanban" in html file
	constructor(root) {
		this.root = root;


		// creates an instance of Column class - define the user interface for a column that is displayed to the user
		Kanban.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);
			
			// referring to the html
			this.root.appendChild(columnView.elements.root);
		});
	}


	// return an array of every column as well as it's title 
	static columns() {
		return [
			{
				id: 1,
				title: "Not Started"
			},
			{
				id: 2,
				title: "In Progress"
			},
			{
				id: 3,
				title: "Completed"
			}
		];
	}
}
