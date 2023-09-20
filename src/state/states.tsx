import { atom } from "jotai";
import Sector from "../models/sector";
import Saim from "../models/saim";
import product from "../models/product";
import Country from "../models/country";

export const saimAtom = atom<Saim[]>([]);

export const sectorAtom = atom<Sector[]>([]);

export const productAtom = atom<product[]>([]);

export const productSelect = atom([]);

export const countryAtom = atom<Country[]>([]);

export const countrySelect = atom([]);
