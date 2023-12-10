package com.yumii.core.item;

public class CardFactory {
  public static Card from(String type, String owner) {
    return switch (type) {
      case "bank" -> new BankCard(owner);
      case "national" -> new NationalCard(owner);
      case "driving license" -> new DrivingLicenseCard(owner);
      default -> throw new IllegalStateException("Unexpected card type: " + type);
    };
  }
}
