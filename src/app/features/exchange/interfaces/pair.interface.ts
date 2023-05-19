import { PairEnum } from "../enums";

export interface IPair {
    readonly from: PairEnum;
    readonly to: PairEnum;
}
