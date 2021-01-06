import React, { PropsWithChildren } from "react";
import CSS from "csstype";

import { CanvasElementType } from "../../../features/canvas-elements/types";
import Styles from "./Renderer.module.scss";
import { cn } from "../../../helper";


interface RendererProps {
	elements: CanvasElementType[]
}

function optimizeCssForRender (cssProps: CSS.Properties) {
	return {
		...cssProps,
		left: undefined,
		top: undefined,
		transform: `translate(${ cssProps.left }, ${ cssProps.top })`
	}
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

const Renderer: any = ({ elements }:PropsWithChildren<RendererProps>) => {
	if (!elements || !elements.length) {
		return null;
	}

	return elements.map(renderElement);
};

const renderElement = (element: CanvasElementType) => {
	const optimizedPosition = (
		optimizeCssForRender(
			getStylesForElement(element)
		)
	);

	return (
		<div
			key={element.id}
			id={element.id}
			className={ cn(Styles.element, element.selected && Styles.isSelected) }
			style={ optimizedPosition }>
		</div>
	)
};


export default Renderer;
