import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectors } from "../../features/canvas-tools";
import { selectors as elementsSelectors } from "../../features/canvas-elements";
import Styles from "./Canvas.module.scss";
import { cn } from "../../helper";
import Renderer from "./renderer";
import RectangleTool from "./tools/rectangle";
import SelectTool from "./tools/select";


interface ToolConfig {
	id: string;
	canvasClassName: string,
	Component: React.FC<any>
}

function getToolConfig(activeTool: string):ToolConfig {
	switch (activeTool) {
		case "rectangle":
			return {
				id: activeTool,
				canvasClassName: Styles.rectangle,
				Component: RectangleTool
			};
		default:
			return {
				id: activeTool,
				canvasClassName: Styles.select,
				Component: SelectTool
			};
	}
}

const Canvas: React.FC = () => {
	// selectors
	const activeTool = useSelector(selectors.getActiveTool);
	const elements = useSelector(elementsSelectors.getElements);

	// tool configs
	const toolConfig:ToolConfig = getToolConfig(activeTool);
	const ToolComponent = toolConfig.Component;

	// states
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

	// event handlers
	// TODO: solve event:any
	const handleMouseMove = (event: any) => {
		const { top, left } = event.target.getBoundingClientRect();

		setMousePos({
			x: event.clientX - left,
			y: event.clientY - top
		})
	};

	return (
		<div className={ cn(Styles.canvas, toolConfig.canvasClassName) }>

			<ToolComponent
				className={ Styles.artboard }
				onMouseMove={ handleMouseMove }
				mousePosition={ mousePos }>

				<Renderer elements={ elements } />

			</ToolComponent>

		</div>
	);
};


export default Canvas;
