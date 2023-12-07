package com.yumii;

import com.yumii.core.Wallet;
import com.yumii.tui.Inquirer;
import java.util.List;
import java.util.function.Function;

import static com.yumii.tui.Printer.printHistory;
import static com.yumii.tui.Printer.printList;
import static com.yumii.tui.Printer.printLogo;
import static com.yumii.tui.Printer.printWallet;

public class Main {
  private static final Inquirer inquirer = new Inquirer();

  private static final List<String> MENU = List.of(
      "Wallety state", "Deposit", "Withdraw", "History", "Exit"
  );

  private static void startLoop(Function<String, Void> actionExecutor) {
    while (true) {
      printList(MENU);
      var menuIndex = inquirer.askInt("Select menu");
      actionExecutor.apply(MENU.get(menuIndex - 1));
    }
  }

  public static Wallet openWallet() {
    var user = inquirer.askStr("User name");
    return new Wallet(user);
  }

  public static void closeWallet() {
    inquirer.close();
    System.out.println("\nThank you for using Wallety\n");
    System.exit(0);
  }

  public static void main(String[] args) {
    printLogo();

    var wallet = openWallet();

    startLoop(menu -> {
      switch (menu) {
        case "State" -> printWallet(wallet);
        case "Deposit" -> {
          var amount = inquirer.askDouble("[DEPOSIT] How much");
          wallet.deposit(amount);
        }
        case "Withdraw" -> {
          var amount = inquirer.askDouble("[WITHDRAW] How much");
          try {
            wallet.withdraw(amount);
          } catch (Exception e) {
            System.out.println(e.getMessage());
          }
        }
        case "History" -> {
          System.out.print("\n");
          printHistory(wallet.getHistory());
        }
        case "Exit" -> closeWallet();
        default -> System.out.println("Invalid menu");
      }
      return null;
    });
  }
}
