import Font from "../enums/Font";
import Point from "./Point";
import Size from "./Size";
import Text from '../modules/Text';

const gameScreen = mp.game.graphics.getScreenActiveResolution(0, 0) as { x: number; y: number };

export default class Screen {
    public static Width: number = gameScreen.x;
    public static Height: number = gameScreen.y;

    public static get ResolutionMaintainRatio(): Size {
        const ratio = Screen.Width / Screen.Height;
        const width = 1080.0 * ratio;

        return new Size(width, 1080.0);
    }

    public static MousePosition(relative: boolean = false): { X: number; Y: number } {
        const res = Screen.ResolutionMaintainRatio;
        const cursor = {
            x: mp.gui.cursor.position[0],
            y: mp.gui.cursor.position[1],
        };
        let [mouseX, mouseY] = [cursor.x, cursor.y];
        if (relative)
            [mouseX, mouseY] = [cursor.x / res.Width, cursor.y / res.Height];
        return {
            X: mouseX,
            Y: mouseY
        };
    }

    public static IsMouseInBounds(topLeft: Point, boxSize: Size) {
        const mousePosition = Screen.MousePosition();
        return (
            mousePosition.X >= topLeft.X &&
            mousePosition.X <= topLeft.X + boxSize.Width &&
            (mousePosition.Y > topLeft.Y && mousePosition.Y < topLeft.Y + boxSize.Height)
        );
    }

    public static GetTextWidth(text: string, font: Font, scale: number): number {
        // Start by requesting the game to start processing a width measurement
        mp.game.ui.setTextEntryForWidth("CELL_EMAIL_BCON"); // THREESTRINGS
        // Add the text string
        Text.AddLongString(text);

        // Set the properties for the text
        mp.game.ui.setTextFont(font);
        mp.game.ui.setTextScale(1.0, scale);

        // Ask the game for the relative string width
        const width: number = mp.game.ui.getTextScreenWidth(true);
        // And return the literal result
        const res = Screen.ResolutionMaintainRatio;
        return res.Width * width;
    }

    public static GetLineCount(text: string, position: Point, font: Font, scale: number, wrap: number): number {
        // Tell the game that we are going to request the number of lines
        mp.game.ui.setTextGxtEntry('CELL_EMAIL_BCON'); // THREESTRINGS
        // Add the text that has been sent to us
        Text.AddLongString(text);

        // Get the resolution with the correct aspect ratio
        const res: Size = Screen.ResolutionMaintainRatio;
        // Calculate the x and y positions
        const x: number = position.X / res.Width;
        const y: number = position.Y / res.Height;

        // Set the properties for the text
        mp.game.ui.setTextFont(font);
        mp.game.ui.setTextScale(1.0, scale);

        // If there is some text wrap to add
        if (wrap > 0) {
            // Calculate the wrap size
            const start: number = position.X / res.Width;
            const end: number = start + (wrap / res.Width);
            // And apply it
            mp.game.ui.setTextWrap(x, end);
        }

        // Finally, return the number of lines being made by the string  
        return mp.game.invoke('0x9040DFB09BE75706', x, y); // _GET_TEXT_SCREEN_LINE_COUNT
    }
}