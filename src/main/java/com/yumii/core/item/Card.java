package com.yumii.core.item;

import com.yumii.core.sized.Sized;

public sealed class Card implements Sized permits BankCard, DrivingLicenseCard, NationalCard {
  protected static final double CARD_SIZE = 1;
  private final CardTypeEnum type;
  private final String owner;

  protected Card(CardTypeEnum type, String owner) {
    this.type = type;
    this.owner = owner;
  }

  @Override
  public String toString() {
    return "%s: %s".formatted(type, owner);
  }

  @Override
  public double computeSize() {
    return CARD_SIZE;
  }

  public CardTypeEnum getType() {
    return type;
  }

  public String getOwner() {
    return owner;
  }
}
