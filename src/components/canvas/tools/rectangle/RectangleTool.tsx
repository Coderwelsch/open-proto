import React, { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn, uniqid } from "../../../../helper";
import { actionTypes, selectors } from "../../../../features/canvas-elements";
import { getElementIndex } from "../../../../features/canvas-elements/canvasElementsReducer";
import { CanvasElementType } from "../../../../features/canvas-elements/types";
import Styles from "./RectangleTool.module.scss";


interface RectangleToolProps {
	className: string,
	children: ReactNode,
	addElement: Function,
	mousePosition: {
		x: number,
		y: number
	},
	onMouseDown: Function | null,
	onMouseMove: Function | null,
	onMouseUp: Function | null,
}

const RectangleTool: React.FC<RectangleToolProps> = ({
	className,
	children ,
	mousePosition,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	...props
}) => {
	const dispatch = useDispatch();
	const elements = useSelector(selectors.getElements);

	// states
	const [tmpElementId, setTmpElementId] = useState<string | null>(null);

	// event handlers
	const handleMouseMove = (event:React.SyntheticEvent) => {
		if (tmpElementId !== null) {
			const elementIndex: number | null = getElementIndex(String(tmpElementId), elements);

			if (elementIndex !== null) {
				const element:CanvasElementType = elements[elementIndex];

				element.width = mousePosition.x - element.position.x;
				element.height = mousePosition.y - element.position.y;

				dispatch({
					type: actionTypes.CHANGE_ELEMENT,
					element
				});
			}
		}

		onMouseMove && onMouseMove(event);
	};

	const handleMouseUp = (event:React.SyntheticEvent) => {
		if (tmpElementId) {
			setTmpElementId(null);
		}

		onMouseUp && onMouseUp(event);
	};

	const handleMouseDown = (event:React.SyntheticEvent) => {
		if (!tmpElementId) {
			const id = uniqid();

			const element:CanvasElementType = {
				id,
				position: {
					x: mousePosition.x,
					y: mousePosition.y,
				},
				selected: true,
				width: 1,
				height: 1,
			}

			dispatch({
				type: actionTypes.ADD_ELEMENT,
				element
			});

			setTmpElementId(id);
		}

		onMouseDown && onMouseDown(event);
	};

	return (
		<div
			className={ cn(className) }
			onMouseMove={ handleMouseMove }
			onMouseUp={ handleMouseUp }
			onMouseDown={ handleMouseDown }
			{ ...props }>

			<div
				className={ Styles.mouseCursor }
				style={ {
					left: `${ mousePosition.x }px`,
					top: `${ mousePosition.y }px`,
				}
			} />

			{ children }

		</div>
	);
}

// const RectangleTool: React.FC<RectangleToolProps> = ({ className, children }) => {
// 	const dispatch = useDispatch();
// 	const elements = useSelector(elementsSelectors.getElements);
// 	const artboardRef:React.RefObject<any> = useRef();
//
// 	const [isCreatingNewElement, updateCreatingElement] = useState(false);
// 	const [tmpElementId, setElementId] = useState("");
//
// 	return (
// 		<div
// 			ref={ artboardRef }
// 			className={ cn(className) }
// 			onMouseDown={ (event) => {
// 				const newId = String(elements.length);
//
// 				addElement(event, artboardRef, dispatch, newId);
//
// 				setElementId(newId);
// 				updateCreatingElement(true);
// 			} }
// 			onMouseMove={ (event) => {
// 				if (isCreatingNewElement) {
// 					changeElement(event, artboardRef, dispatch, tmpElementId, elements);
// 				}
// 			} }
// 			onMouseUp={ () => isCreatingNewElement && updateCreatingElement(false) }>
// 			{ children }
// 		</div>
// 	);
// };

export default RectangleTool;