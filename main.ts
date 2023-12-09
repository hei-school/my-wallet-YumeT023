import { Wallet } from "./core/Wallet.ts";
import { confirmation, err, money } from "./tui/colors.ts";
import { printHistory } from "./tui/printer.ts";
import { ask, askInt, askStr } from "./tui/ui.ts";
import {
  LOGO,
  printNewline,
  printNumberedList,
  printObject,
} from "./tui/printer.ts";
import {
  BankCard,
  Card,
  CARD_TYPES,
  DrivingLicense,
  NationalCard,
} from "./core/item/Card.ts";
import { Money } from "./core/item/Money.ts";

function makeCardFor(owner: string, type: string): Card {
  switch (type) {
    case "Bank card":
      return new BankCard(owner);
    case "Driving license":
      return new DrivingLicense(owner);
    default:
      return new NationalCard(owner);
  }
}

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
  "Add card",
  "List cards",
  "Get card",
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
          const amount = askInt(
            `[DEPOSIT] How much <size = 1 -> ${Money.AMOUNT_UNIT_SIZE}>`,
            "invalid amount",
          ) ?? 0;
          try {
            wallet.deposit(amount);
            printWallet(wallet);
          } catch (e) {
            console.log(err(e.message));
          }
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
        printHistory(wallet.actionsHistory);
        break;
      case "Add card":
        {
          printNumberedList(CARD_TYPES);
          const typeId = askInt(
            "[Card type] choose in the list",
            "invalid type",
          );
          const cardType = CARD_TYPES[typeId - 1];
          const owner = askStr("[Owner] who is the owner", "invalid name");
          wallet.putCard(makeCardFor(owner, cardType as string));
        }
        break;
      case "List cards":
        printNumberedList(wallet.cards.map((card) => card.toString()));
        break;
      case "Get card":
        {
          if (wallet.cards.length) {
            printNumberedList(wallet.cards.map((card) => card.toString()));
            const index = askInt(
              "[Card] choose in the list",
              "not in the list",
            );
            const card = wallet.getCardByOrder(index);
            console.log(
              "wallet_owner",
              wallet.owner + ", card: ",
              card.toString(),
            );
          }
        }
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
