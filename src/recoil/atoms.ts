import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum ThemeEnums {
  "LIGHT",
  "DARK",
}

const { DARK, LIGHT } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  return LIGHT ? DARK : LIGHT;
};

export const themeState = atom<ThemeEnums>({
  key: "themeMode",
  default: getTheme(),
  effects_UNSTABLE: [persistAtom],
});
