import { atom } from "jotai";
import Sector from "../models/sector";

export const sectorAtom = atom<Sector[]>([]);
