import ListItem from "../modules/ListItem";

export default class ItemsCollection {
    private readonly items: ListItem[] | string[] | number[];

    constructor(items: ListItem[] | string[] | number[]) {
		if (items.length === 0) {
			mp.console.logError("ItemsCollection cannot be empty", true, true);
			throw new Error("ItemsCollection cannot be empty");
		}
		this.items = items;
	}

	public length(): number {
		return this.items.length;
	}

	public getListItems(): ListItem[] {
		const items = [];
		for (const item of this.items) {
			if (item instanceof ListItem) {
				items.push(item);
			} else if (typeof item == "string") {
                items.push(new ListItem(item));
            } else if (typeof item == "number") {
                items.push(new ListItem(item.toString()));
            }
		}
		return items;
	}
}
