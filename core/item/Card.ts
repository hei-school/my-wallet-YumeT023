import { Sized } from "./Sized.ts";

export enum CardStatus {
  IN = "IN",
  OUT = "OUT",
  LOST = "LOST",
}

export abstract class Card implements Sized {
  private static readonly SIZE = 1;
  public accessor status: CardStatus;

  constructor() {
    this.status = CardStatus.OUT;
  }

  computeSize(): number {
    return Card.SIZE;
  }
}

export class BankCard extends Card {
}

export class DrivingLicense extends Card {
}

export class NationalCard extends Card {
}
