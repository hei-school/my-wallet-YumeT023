import { Wallet } from "./core/Wallet.ts";
import { ask, listMenu, LOGO } from "./tui/ui.ts";

function initWallety() {
  const owner = ask("Wallet owner username", "John Doe");
  const initialBalance = ask("Initial balance", 0);

  const wallet = new Wallet(owner!, Number(initialBalance));

  function showStat() {
    console.log("stat", wallet);
  }

  function startLoop() {
    while (true) {
      listMenu(
        "state",
        "deposit",
        "withdrawal",
        "put item in",
        "take item out",
      );
      switch (ask("Select menu", 1)) {
        case "1":
          showStat();
          break;
        case "2": {
          const amount = ask("Deposit amount", 0)!;
          wallet.deposit(+amount);
          break;
        }
        case "3": {
          const amount = ask("withdrawal amount", 0)!;
          wallet.withdraw(+amount);
          break;
        }
        default:
          break;
      }
    }
  }

  startLoop();
}

if (import.meta.main) {
  LOGO();
  initWallety();
}
