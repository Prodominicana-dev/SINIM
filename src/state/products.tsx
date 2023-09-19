import { atom } from "jotai";
import product from "@/src/models/product";

export const productAtom = atom<product[]>([]);
