import { SET_ACTIVE_TOOL } from "./actionTypes";

interface SetActiveTool {
	type: typeof SET_ACTIVE_TOOL;
	payload: string;
}

export type CanvasActiveToolType = SetActiveTool;

export interface SystemState {
	tool: string;
}
