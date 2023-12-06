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
  str: string,
  defaultValue?: T,
) => {
  return prompt(colors.yellow("> ") + str + "\n", String(defaultValue || ""));
};

export const listMenu = (...items: string[]) => {
  const decimal = items.map((str, index) =>
    `${colors.yellow(String(index + 1))} - ${str}`
  ).join("\n");
  console.log(decimal);
  br();
};

export const br = (times = 1) => console.log("\n".repeat(times));
