package com.yumii.core;

import com.yumii.core.card.Card;
import com.yumii.core.card.CardPocket;
import com.yumii.core.sized.Sized;
import com.yumii.core.sized.SizedContainer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.naming.SizeLimitExceededException;

public class Wallet implements Transactional, SizedContainer, CardPocket<Integer> {
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

  private void _assertItemFits(Sized item) throws SizeLimitExceededException {
    if (!canItemFit(item)) {
      throw new SizeLimitExceededException("Not enough space: item.size=%s couldn't fit in wallet.available_space%s".formatted(item.computeSize(), computeAvailableSpace()));
    }
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

  @Override
  public Optional<Card> getCard(Integer id) {
    return Optional.of(cards.get(id - 1 /* convert to list indexing */));
  }

  @Override
  public List<Card> getCards() {
    return cards;
  }

  @Override
  public void putCard(Card toPut) {
    try {
      _assertItemFits(toPut);
      cards.add(toPut);
    } catch (SizeLimitExceededException e) {
      System.out.println(e.getMessage());
    }
  }
}
