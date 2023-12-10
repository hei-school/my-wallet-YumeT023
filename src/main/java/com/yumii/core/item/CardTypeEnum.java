package com.yumii.core.item;

public enum CardTypeEnum {
  BANK,
  NATIONAL,
  DRIVING_LICENSE;

  @Override
  public String toString() {
    return name().toLowerCase().replaceAll("_", " ");
  }
}
