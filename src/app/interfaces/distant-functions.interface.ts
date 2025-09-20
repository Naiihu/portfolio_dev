import { DisplayJsonContentInterface } from "./display-json-content.interface";

export interface DistantFunctionsInterface {
    setUniqueMainDisplayed: (arg: DisplayJsonContentInterface) => void;
    reload: () => void;
}
