package com.yumii;

import com.yumii.core.Wallet;
import com.yumii.core.item.BankCard;
import com.yumii.core.item.Card;
import com.yumii.core.item.CardFactory;
import com.yumii.core.item.CardTypeEnum;
import com.yumii.tui.Inquirer;
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Function;

import static com.yumii.tui.Printer.printCards;
import static com.yumii.tui.Printer.printHistory;
import static com.yumii.tui.Printer.printList;
import static com.yumii.tui.Printer.printLogo;
import static com.yumii.tui.Printer.printWallet;

public class Main {
  private static final Inquirer inquirer = new Inquirer();

  private static final Map<Integer, String> MENU = new TreeMap<>(Map.of(
      1, "Wallety state",
      2, "Deposit",
      3, "Withdraw",
      4, "History",
      5, "List cards",
      6, "Add card",
      7, "Get card",
      8, "Exit"
  ));

  private static void startLoop(Function<String, Void> actionExecutor) {
    var bc = new BankCard("here is the owner");
    while (true) {
      printList(MENU.values().stream().toList());
      var menu = inquirer.askInt("Select menu");
      var str = MENU.getOrDefault(menu, MENU.get(1));
      actionExecutor.apply(str);
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
        case "Wallety state" -> printWallet(wallet);
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
        case "List cards" -> {
          printCards(wallet.getCards());
        }
        case "Add card" -> {
          var cardTypes = Arrays.stream(CardTypeEnum.values()).map(CardTypeEnum::toString).toList();
          printList(cardTypes);
          var typeIdx = inquirer.askInt("[CARD_TYPE] Select type");
          try {
            var cardType = cardTypes.get(typeIdx - 1);
            var owner = inquirer.askStr("[CARD_OWNER] owner name");
            var card = CardFactory.from(cardType, owner);
            wallet.putCard(card);
          } catch (IndexOutOfBoundsException ignored) {
            System.out.println("Invalid card type");
          }
        }
        case "Get card" -> {
          printList(wallet.getCards().stream().map(Card::toString).toList());
          var selectedIdx = inquirer.askInt("[CARD] Select one");
          var maybeCard = wallet.getCard(selectedIdx);
          maybeCard.ifPresent(System.out::println);
        }
        case "Exit" -> closeWallet();
        default -> System.out.println("Invalid menu");
      }
      return null;
    });
  }
}
