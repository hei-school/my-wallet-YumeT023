package com.yumii.tui;

import java.util.Scanner;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class Inquirer {
  private final Scanner scanner;

  public Inquirer() {
    this.scanner = new Scanner(System.in);
  }

  private void printQuestion(String prompt) {
    System.out.printf("%s > ", prompt);
  }

  public String askStr(String prompt) {
    printQuestion(prompt);
    return scanner.nextLine();
  }

  public double askDouble(String prompt) {
    printQuestion(prompt);
    return parseDouble(scanner.nextLine());
  }

  public int askInt(String prompt) {
    printQuestion(prompt);
    return parseInt(scanner.nextLine());
  }

  public void close() {
    scanner.close();
  }
}
