import { colors } from "../deps.ts";

export const LOGO = () => {
  console.log(
    `%c __       __            __  __              __               
  /  |  _  /  |          /  |/  |            /  |              
  $$ | / \ $$ |  ______  $$ |$$ |  ______   _$$ |_    __    __ 
  $$ |/$  \$$ | /      \ $$ |$$ | /      \ / $$   |  /  |  /  |
  $$ /$$$  $$ | $$$$$$  |$$ |$$ |/$$$$$$  |$$$$$$/   $$ |  $$ |
  $$ $$/$$ $$ | /    $$ |$$ |$$ |$$    $$ |  $$ | __ $$ |  $$ |
  $$$$/  $$$$ |/$$$$$$$ |$$ |$$ |$$$$$$$$/   $$ |/  |$$ \__$$ |
  $$$/    $$$ |$$    $$ |$$ |$$ |$$       |  $$  $$/ $$    $$ |
  $$/      $$/  $$$$$$$/ $$/ $$/  $$$$$$$/    $$$$/   $$$$$$$ |
                                                     /  \__$$ |
                                                     $$    $$/ 
                                                      $$$$$$/ `,
    "color: yellow; font-weight: bold",
  );
};

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

export const printNumberedList = (items: string[]) => {
  const decimal = items.map((str, index) =>
    `${colors.yellow(String(index + 1))} - ${str}`
  ).join("\n");
  console.log(decimal);
  printNewline();
};

export const printNewline = (times = 1) => console.log("\n".repeat(times));

export const printObject = (
  header: string,
  object: Record<string, unknown>,
) => {
  console.log(colors.yellow(header));
  console.log("------------------");
  Object.keys(object).forEach((key) => {
    console.log(colors.yellow(key), object[key]);
  });
};
