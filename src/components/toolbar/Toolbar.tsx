import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionTypes, selectors } from "../../features/canvas-tools";
import Styles from "./Toolbar.module.scss";


const availableTools = [
	{
		id: "select",
		name: "Select"
	},
	{
		id: "rectangle",
		name: "Rectangle"
	},
];

const Toolbar: React.FC = () => {
	const activeTool = useSelector(selectors.getActiveTool);
	const dispatch = useDispatch();

	const handleToolChange = (id:string) => {
		dispatch({
			type: actionTypes.SET_ACTIVE_TOOL,
			payload: id,
		});
	};

	return (
		<ul className={ Styles.toolbar }>
			{ availableTools.map(tool =>
				<li key={ tool.id }>

					<button
						className={ tool.id === activeTool ? Styles.toolActive : undefined }
						onClick={ () => handleToolChange(tool.id) }>
						{ tool.name }
					</button>

				</li>
			) }
		</ul>
	);
};


export default Toolbar;
