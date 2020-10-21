import ListItem from "../modules/ListItem";
export default class ItemsCollection {
    private readonly items;
    constructor(items: ListItem[] | string[] | number[]);
    length(): number;
    getListItems(): ListItem[];
}
