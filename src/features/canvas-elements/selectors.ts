import { ConnectedSystemState } from "./types";

export const getElements = (state:ConnectedSystemState) =>
	state.canvasElements.elements;

export const getSelectedElements = (state:ConnectedSystemState) =>
	state.canvasElements.elements.filter(element => element.selected);