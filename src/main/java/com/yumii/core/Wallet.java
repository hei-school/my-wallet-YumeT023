package com.yumii.core;

import java.util.ArrayList;
import java.util.List;

public class Wallet implements Transactional {
  private List<Transaction> history;
  private final String owner;
  private final Money balance;

  public Wallet(String owner) {
    this.history = new ArrayList<>();
    this.owner = owner;
    this.balance = Money.from(0);
  }

  @Override
  public Transaction deposit(double amount) {
    var transaction = this.balance.deposit(amount);
    return this._enqueueHistory(transaction);
  }

  @Override
  public Transaction withdraw(double amount) {
    var transaction = this.balance.withdraw(amount);
    return this._enqueueHistory(transaction);
  }

  public double getBalance() {
    return this.balance.getAmount();
  }

  public String getOwner() {
    return this.owner;
  }

  public List<Transaction> getHistory() {
    return this.history.stream().toList();
  }

  private Transaction _enqueueHistory(Transaction history) {
    this.history.add(history);
    return history;
  }
}
