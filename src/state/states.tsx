import { atom } from "jotai";
import DataMarket from "../models/datamarket";

export const datamarketAtom = atom<DataMarket[]>([]);
