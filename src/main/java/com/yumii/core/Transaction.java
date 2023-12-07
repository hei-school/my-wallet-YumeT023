package com.yumii.core;


public record Transaction(com.yumii.core.Transaction.TransactionType type, double amount) {

  public static Transaction deposit(double amount) {
    return new Transaction(TransactionType.DEPOSIT, amount);
  }

  public static Transaction withdraw(double amount) {
    return new Transaction(TransactionType.WITHDRAWAL, amount);
  }

  public enum TransactionType {
    DEPOSIT,
    WITHDRAWAL
  }
}
