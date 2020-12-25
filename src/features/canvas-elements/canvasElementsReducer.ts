import { ADD_ELEMENT, CHANGE_ELEMENT, CHANGE_ELEMENTS } from "./actionTypes";
import { CanvasElementsActionType, CanvasElementType, SystemState } from "./types";

const initialState: SystemState = {
	elements: [],
};

function getElementIndex(id: string, elements: CanvasElementType[]): number | null {
	for (let i = 0; i < elements.length; i++) {
		if (elements[i].id === id) {
			return i;
		}
	}

	return null;
}

function changeElement(state: SystemState, action: CanvasElementsActionType) {
	const element: CanvasElementType = action.element;
	const index = getElementIndex(element.id, state.elements);

	if (index) {
		const elements = [...state.elements];
		elements[index] = element;

		return {
			...state,
			elements,
		};
	}

	// fallback
	return state;
}

function changeElements (state: SystemState, action: CanvasElementsActionType) {
	const stateElems:CanvasElementType[] = [...state.elements];

	if (action.elements?.length) {
		const elemsToChange:CanvasElementType[] = [...action.elements];

		for (let i = 0; i < elemsToChange.length; i++) {
			const index = getElementIndex(elemsToChange[i].id, stateElems);

			if (index !== null) {
				stateElems[index].position.x = elemsToChange[i].position.x;
				stateElems[index].position.y = elemsToChange[i].position.y;
			}
		}
	}

	return stateElems;
}

export {
	getElementIndex,
};

export default (state = initialState, action: CanvasElementsActionType) => {
	switch (action.type) {
		case ADD_ELEMENT:
			return {
				...state,
				elements: state.elements.concat(action.element),
			};
		case CHANGE_ELEMENT:
			return changeElement(state, action);
		case CHANGE_ELEMENTS:
			return {
				...state,
				elements: changeElements(state, action)
			};
		default:
			return state;
	}
};
