import { Sized } from "./Sized.ts";

export enum CardStatus {
  IN = "IN",
  OUT = "OUT",
  LOST = "LOST",
}

export const CARD_TYPES = [
  "Bank card",
  "Driving license",
  "National card",
];

export abstract class Card implements Sized {
  private static readonly SIZE = 1;

  constructor(
    public readonly type: typeof CARD_TYPES[number],
    public readonly owner: string,
  ) {
  }

  computeSize(): number {
    return Card.SIZE;
  }

  toString() {
    return this.type + ":" + this.owner;
  }
}

export class BankCard extends Card {
  constructor(owner: string) {
    super("Bank card", owner);
  }
}

export class DrivingLicense extends Card {
  constructor(owner: string) {
    super("Driving license", owner);
  }
}

export class NationalCard extends Card {
  constructor(owner: string) {
    super("National card", owner);
  }
}
