import { Transaction } from "../core/Transaction.ts";
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

export const printHistory = (history: Transaction[]) => {
  printHeader("History");
  console.table(history);
};

export const printNumberedList = (items: string[]) => {
  if (items.length) {
    const decimal = items.map((str, index) =>
      `${colors.yellow(String(index + 1))} - ${str}`
    ).join("\n");
    console.log(decimal);
    printNewline();
  }
};

export const printNewline = (times = 1) => console.log("\n".repeat(times));

export const printObject = (
  header: string,
  object: Record<string, unknown>,
) => {
  printHeader(header);
  Object.keys(object).forEach((key) => {
    console.log(colors.yellow(key), object[key]);
  });
};

export const printHeader = (header: string) => {
  console.log(colors.yellow(header));
  console.log("------------------");
};
