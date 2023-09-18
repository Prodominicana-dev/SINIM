import { atom } from "jotai";
import Country from "../models/country";

export const countryAtom = atom<Country[]>([]);
