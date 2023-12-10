package com.yumii.core;

import com.yumii.core.card.Card;
import com.yumii.core.sized.Sized;
import com.yumii.core.sized.SizedContainer;
import java.util.ArrayList;
import java.util.List;

public class Wallet implements Transactional, SizedContainer {
  private static final double WALLET_SIZE = 50;
  private final List<Transaction> history;
  private final List<Card> cards;
  private final String owner;
  private final Money balance;

  public Wallet(String owner) {
    this.history = new ArrayList<>();
    this.cards = new ArrayList<>();
    this.owner = owner;
    this.balance = Money.from(0);
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

  public List<Card> getCards() {
    return cards;
  }

  private Transaction _enqueueHistory(Transaction history) {
    this.history.add(history);
    return history;
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

  @Override
  public double computeSize() {
    // computes the size of the items in it
    var balanceSize = balance.computeSize();
    var cardsSize = cards.stream().map(Card::computeSize).reduce(Double::sum).orElse(0.0);
    return cardsSize + balanceSize;
  }

  @Override
  public double computeAvailableSpace() {
    return WALLET_SIZE - computeSize();
  }

  @Override
  public boolean canItemFit(Sized item) {
    return computeAvailableSpace() >= item.computeSize();
  }
}
