export default class Scaleform {
    private _handle = 0;
    private readonly scaleForm: string;

    public constructor(scaleForm: string) {
        this.scaleForm = scaleForm;
        this._handle = mp.game.graphics.requestScaleformMovie(this.scaleForm);
    }

    public get handle(): number {
        return this._handle;
    }

    public get isValid(): boolean {
        return this._handle != 0;
    }

    public get isLoaded(): boolean {
        return mp.game.graphics.hasScaleformMovieLoaded(this._handle);
    }

    private callFunctionHead(funcName: string, ...args: any[]): void {
        if (!this.isValid || !this.isLoaded)
            return;

        mp.game.graphics.pushScaleformMovieFunction(this._handle, funcName);
        // mp.console.logInfo("Running func head " + funcName + "(" + args + ") on " + this.handle + " (" + this.scaleForm + ")", true, true);

        args.forEach((arg: any) => {
            switch (typeof arg) {
                case "number":
                    {
                        if (Number(arg) === arg && arg % 1 !== 0) {
                            mp.game.graphics.pushScaleformMovieFunctionParameterFloat(arg);
                        }
                        else {
                            mp.game.graphics.pushScaleformMovieFunctionParameterInt(arg);
                        }
                        // break;
                    }
                case "string":
                    mp.game.graphics.pushScaleformMovieFunctionParameterString(arg as string);
                    break;
                case "boolean":
                    {
                        mp.game.graphics.pushScaleformMovieFunctionParameterBool(arg);
                        break;
                    }
                default:
                    {
                        mp.console.logError(`Unknown argument type ${typeof arg} = ${arg.toString()} passed to scaleform with handle ${this._handle}`, true, true);
                    }
            }
        });
    }

    public callFunction(funcName: string, ...args: any[]): void {
        this.callFunctionHead(funcName, ...args);
        mp.game.graphics.popScaleformMovieFunctionVoid();
    }

    public callFunctionReturn(funcName: string, ...args: any[]): number {
        this.callFunctionHead(funcName, ...args);
        return mp.game.invoke("0xC50AA39A577AF886");
    }

    public render2D(): void {
        if (!this.isValid || !this.isLoaded)
            return;
        mp.game.graphics.drawScaleformMovieFullscreen(this._handle, 255, 255, 255, 255, false);
    }

    public recreate(): void {
        if (!this.isValid || !this.isLoaded)
            return;
        this._handle = mp.game.graphics.requestScaleformMovie(this.scaleForm);
    }

    public destroy(): void {
        if (!this.isValid)
            return;
        mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this._handle);
        this._handle = 0;
    }
}