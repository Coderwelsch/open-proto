import { ADD_ELEMENT, CHANGE_ELEMENT, CHANGE_ELEMENTS } from "./actionTypes";

interface Point {
	x: number,
	y: number
}

interface CanvasElement {
	readonly id: string,

	selected: boolean,

	position: Point,
	width: number,
	height: number,
}

interface CanvasElementsAction {
	type: typeof ADD_ELEMENT | typeof CHANGE_ELEMENT | typeof CHANGE_ELEMENTS;
	element: CanvasElement;
	elements: CanvasElement[] | null | undefined;
}

export type CanvasElementType = CanvasElement;
export type CanvasElementsActionType = CanvasElementsAction;

export interface SystemState {
	elements: CanvasElement[];
}

export interface ConnectedSystemState {
	canvasElements: {
		elements: CanvasElement[];
	}
}
