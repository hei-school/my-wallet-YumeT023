package com.yumii.core;

public class Money implements Transactional {
  private double _amount;

  public Money(double amount) {
    _amount = amount;
  }

  public Transaction deposit(double amount) {
    _amount += amount;
    return Transaction.deposit(amount);
  }

  public Transaction withdraw(double amount) throws IllegalArgumentException {
    if (amount > _amount) {
      throw new IllegalArgumentException("Insufficient balance.");
    }
    _amount -= amount;
    return Transaction.withdraw(amount);
  }

  public static Money from(double amount) {
    return new Money(amount);
  }

  public double getAmount() {
    return this._amount;
  }
}
