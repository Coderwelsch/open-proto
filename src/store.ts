import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import { CanvasToolsReducer } from "./features/canvas-tools";
import { CanvasElementsReducer } from "./features/canvas-elements";


/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
	canvasTools: CanvasToolsReducer,
	canvasElements: CanvasElementsReducer
});

const store = createStore(
	rootReducer,
	// preloadedState,
	devToolsEnhancer({}),
);

export default store;
