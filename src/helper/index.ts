import uniqid from "./uniqid";

const cn = (...classNames:Array<string|boolean|null|undefined>) => {
	return classNames.filter((name:string|boolean|null|undefined):boolean =>
		typeof name === "string"
	).join(" ");
}

export { cn };
export { uniqid };