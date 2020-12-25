import React from "react";
import CSS from "csstype";

import { CanvasElementType } from "../../../features/canvas-elements/types";
import Styles from "./Renderer.module.scss";


interface RendererProps {
	elements: CanvasElementType[]
}


function getStylesForElement(element: CanvasElementType): CSS.Properties {
	return {
		position: `absolute`,
		left: `${ element.position.x }px`,
		top: `${ element.position.y }px`,

		width: `${ element.width }px`,
		height: `${ element.height }px`,
		background: `blue`
	};
}

const Renderer: React.FC<RendererProps> = ({ elements }) => {
	if (!elements || !elements.length) {
		return null;
	}

	return (
		<>
			{ elements.map((element: CanvasElementType) =>
				<div
					key={element.id}
					id={element.id}
					className={ Styles.element }
					style={ getStylesForElement(element) }>
				</div>,
			) }
		</>
	)
};


export default Renderer;
