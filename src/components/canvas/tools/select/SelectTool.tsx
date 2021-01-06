import React, { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "../../../../helper";
import { actionTypes, selectors } from "../../../../features/canvas-elements";
import Styles from "./SelectTool.module.scss";



interface SelectToolProps {
	className: string,
	children: ReactNode,
	mousePosition: {
		x: number,
		y: number
	},
	onMouseDown: Function | null,
	onMouseMove: Function | null,
	onMouseUp: Function | null,
}

let oldOffsets:{
	x:number,
	y: number
}[] = [];

const SelectTool: React.FC<SelectToolProps> = ({
	className,
	children ,
	mousePosition,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	...props
}) => {
	const dispatch = useDispatch();
	// const elements = useSelector(selectors.getElements);
	const selectedElements = useSelector(selectors.getSelectedElements);

	// states
	const [isMouseDown, setMouseDown] = useState<boolean>(false);

	// event handlers
	const handleMouseMove = (event:React.SyntheticEvent) => {
		if (isMouseDown) {
			const selectedCopy = [ ...selectedElements ];

			for (let i = 0; i < selectedCopy.length; i++) {
				const selected = selectedCopy[i];
				const offset = oldOffsets[i];

				selected.position.x = mousePosition.x - offset.x;
				selected.position.y = mousePosition.y - offset.y;
			}

			dispatch({
				type: actionTypes.CHANGE_ELEMENTS,
				elements: selectedCopy
			});
		}

		onMouseMove && onMouseMove(event);
	};

	const handleMouseUp = (event:React.SyntheticEvent) => {
		// reset offsets
		oldOffsets = [];

		setMouseDown(false);
		onMouseUp && onMouseUp(event);
	};

	const handleMouseDown = (event:React.SyntheticEvent) => {
		const copy = [...selectedElements];

		oldOffsets = copy.map(elem => ({
			x: mousePosition.x - elem.position.x,
			y: mousePosition.y - elem.position.y,
		}));

		setMouseDown(true);
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

export default SelectTool;