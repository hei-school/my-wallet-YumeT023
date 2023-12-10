package com.yumii.core.card;

import com.yumii.core.Sized;

public sealed class Card implements Sized permits BankCard, DrivingLicenseCard, NationalCard {
  protected static final double CARD_SIZE = 1;
  private final CardTypeEnum type;
  private final String owner;

  protected Card(CardTypeEnum type, String owner) {
    this.type = type;
    this.owner = owner;
  }

  @Override
  public double computeSize() {
    return 1;
  }

  public CardTypeEnum getType() {
    return type;
  }

  public String getOwner() {
    return owner;
  }
}
