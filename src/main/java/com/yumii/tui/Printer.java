package com.yumii.tui;

import com.yumii.core.Transaction;
import com.yumii.core.Wallet;
import com.yumii.core.item.Card;
import java.util.List;

public class Printer {
  public static void printLogo() {
    System.out.println("""
         __       __            __  __              __              \s
          /  |  _  /  |          /  |/  |            /  |             \s
          $$ | / \\ $$ |  ______  $$ |$$ |  ______   _$$ |_    __    __\s
          $$ |/$  \\$$ | /      \\ $$ |$$ | /      \\ / $$   |  /  |  /  |
          $$ /$$$  $$ | $$$$$$  |$$ |$$ |/$$$$$$  |$$$$$$/   $$ |  $$ |
          $$ $$/$$ $$ | /    $$ |$$ |$$ |$$    $$ |  $$ | __ $$ |  $$ |
          $$$$/  $$$$ |/$$$$$$$ |$$ |$$ |$$$$$$$$/   $$ |/  |$$ \\__$$ |
          $$$/    $$$ |$$    $$ |$$ |$$ |$$       |  $$  $$/ $$    $$ |
          $$/      $$/  $$$$$$$/ $$/ $$/  $$$$$$$/    $$$$/   $$$$$$$ |
                                                             /  \\__$$ |
                                                             $$    $$/\s
                                                              $$$$$$/\s
        """);
  }

  public static void printList(List<String> items) {
    for (int i = 0; i < items.size(); i++) {
      var item = items.get(i);
      System.out.printf("%d - %s%n", i + 1, item);
    }
  }

  public static void printHr(int time) {
    System.out.println("-".repeat(time));
  }

  public static void printHeader(String header) {
    System.out.printf("\n%s%n", header);
    printHr(header.length() * 2);
  }

  public static void printWallet(Wallet wallet) {
    printHeader("Wallet state");
    System.out.printf("owner   \t%s%n", wallet.getOwner());
    System.out.printf("balance \t%f%n", wallet.getBalance());
    System.out.printf("available space \t%f%n%n", wallet.computeAvailableSpace());
  }

  public static void printHistory(List<Transaction> history) {
    printHeader("History");
    history.forEach(transaction -> {
      System.out.printf("%s\t%f%n", transaction.type(), transaction.amount());
    });
    System.out.println();
  }

  public static void printCards(List<Card> cards) {
    printHeader("Cards");
    cards.forEach(card -> {
      System.out.printf(card.toString());
    });
    System.out.println();
  }
}
