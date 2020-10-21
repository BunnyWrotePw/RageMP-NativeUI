/// <reference types="ragemp-c" />
import UIMenuItem from "../items/UIMenuItem";
export default class InstructionalButton {
    Text: string;
    get ItemBind(): UIMenuItem;
    private _itemBind;
    private readonly _buttonString;
    private readonly _buttonControl;
    private readonly _usingControls;
    constructor(text: string, control: RageEnums.Controls | number, buttonString?: string);
    BindToItem(item: UIMenuItem): void;
    GetButtonId(): string;
}
