package com.yumii.core.card;

import static com.yumii.core.card.CardTypeEnum.BANK;

public final class BankCard extends Card {
  public BankCard(String owner) {
    super(BANK, owner);
  }
}
