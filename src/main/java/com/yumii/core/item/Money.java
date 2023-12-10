package com.yumii.core.item;

import com.yumii.core.Transaction;
import com.yumii.core.Transactional;
import com.yumii.core.sized.Sized;

public class Money implements Transactional, Sized {
  private static final double AMOUNT_UNIT_SIZE = 0.2;
  private double _amount;

  public Money(double amount) {
    _amount = amount;
  }

  public static Money from(double amount) {
    return new Money(amount);
  }

  public double getAmount() {
    return this._amount;
  }

  @Override
  public Transaction deposit(double amount) {
    _amount += amount;
    return Transaction.deposit(amount);
  }

  @Override
  public Transaction withdraw(double amount) throws IllegalArgumentException {
    if (amount > _amount) {
      throw new IllegalArgumentException("Insufficient balance.");
    }
    _amount -= amount;
    return Transaction.withdraw(amount);
  }

  @Override
  public double computeSize() {
    return _amount * AMOUNT_UNIT_SIZE;
  }
}
