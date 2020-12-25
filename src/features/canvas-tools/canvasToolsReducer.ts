import { SET_ACTIVE_TOOL } from "./actionTypes";
import { CanvasActiveToolType, SystemState } from "./types";

const initialState:SystemState = {
	tool: "select",
};

export default (state = initialState, action: CanvasActiveToolType) => {
	switch (action.type) {
		case SET_ACTIVE_TOOL:
			return {
				...state,
				tool: action.payload || state.tool,
			};
		default:
			return state;
	}
};
