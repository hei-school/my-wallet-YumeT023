import { colors } from "../deps.ts";

export const question = (str: string) => colors.blue(str);

export const confirmation = (str: string) => colors.yellow(str);

export const money = (str: string) => colors.green(str);

export const err = (str: string) => colors.brightRed(str);
