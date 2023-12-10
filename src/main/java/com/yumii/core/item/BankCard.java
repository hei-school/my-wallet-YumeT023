package com.yumii.core.item;

import static com.yumii.core.item.CardTypeEnum.BANK;

public final class BankCard extends Card {
  public BankCard(String owner) {
    super(BANK, owner);
  }
}
