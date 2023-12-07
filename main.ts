import { Wallet } from "./core/Wallet.ts";
import { confirmation, err, money } from "./tui/colors.ts";
import { printHistory } from "./tui/core_printer.ts";
import {
  ask,
  askInt,
  askStr,
  LOGO,
  printNewline,
  printNumberedList,
  printObject,
} from "./tui/ui.ts";

function getUserWallet() {
  const owner = askStr("Wallet owner username", "invalid username", "John Doe");
  const initialBalance = askInt("Initial balance", "Invalid amount");
  return new Wallet(owner!, Number(initialBalance));
}

const MENU = [
  "State",
  "Deposit",
  "Withdraw",
  "History",
  "Exit",
];

function printWallet(wallet: Wallet) {
  printNewline();
  printObject(
    "Wallet State",
    wallet.toView(),
  );
}

function exitWallety() {
  printNewline();
  console.log(money("Thank you for using Wallety!!!"));
  printNewline();
  Deno.exit(0);
}

function executeMainLoop(exec: (menu: string) => void) {
  while (true) {
    printNewline();
    printNumberedList(MENU);
    const index = +ask("Select menu", 1)!;
    const selectedMenu = MENU[index - 1];
    exec(selectedMenu);
  }
}

if (import.meta.main) {
  LOGO();
  const wallet = getUserWallet();
  executeMainLoop((menu) => {
    switch (menu) {
      case "State":
        printWallet(wallet);
        break;
      case "Deposit":
        {
          const amount = askInt("[DEPOSIT] How much", "invalid amount") ?? 0;
          wallet.deposit(amount);
          printWallet(wallet);
        }
        break;
      case "Withdraw":
        {
          const amount = askInt("[WITHDRAW] How much", "invalid amount") ?? 0;
          try {
            wallet.withdraw(amount);
          } catch (e) {
            console.log(err(e.message));
          }
          printWallet(wallet);
        }
        break;
      case "History":
        printNewline();
        printHistory(wallet.actionsHistory)
        break;
      case "Exit":
        {
          exitWallety();
        }
        break;
      default:
        if (confirm(confirmation("Do you want to exit"))) {
          exitWallety();
        }
    }
  });
}
