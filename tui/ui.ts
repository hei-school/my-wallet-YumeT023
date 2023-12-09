import { colors } from "../deps.ts";

export const ask = <T extends string | number | undefined>(
  question: string,
  defaultValue?: T,
) => {
  return prompt(
    `${colors.yellow("> ")}${question}\n`,
    String(defaultValue || ""),
  ) as T;
};

export const askInt = (str: string, err: string, defaultValue = 0) => {
  const answer = +ask(str, defaultValue);
  if (isNaN(answer)) {
    console.log(colors.brightRed(err));
    return defaultValue;
  }
  return answer;
};

export const askStr = (
  str: string,
  err: string,
  defaultValue?: string,
): string => {
  const answer = ask<string>(str, defaultValue);
  if (answer && !/[a-zA-Z].*/.test(answer)) {
    console.log(colors.brightRed(err));
    return askStr(str, err, defaultValue);
  }
  return answer;
};