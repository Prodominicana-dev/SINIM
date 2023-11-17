import { atom } from "jotai";
import DataMarket from "../models/datamarket";

export const datamarketAtom = atom<DataMarket[]>([]);

export const tokenAtom = atom<string | null>(null);

export const userAtom = atom<any>(null);

export const datamarketCategoriesAtom = atom<any>([]);

export const datamarketTitleAtom = atom<any>("");
