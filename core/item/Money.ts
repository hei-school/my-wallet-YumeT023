import { Transaction, Transactional } from "../Transaction.ts";
import { Sized } from "./Sized.ts";

export class Money implements Sized, Transactional {
  private static readonly AMOUNT_UNIT_SIZE = 0.2;
  private constructor(private _amount: number) {}

  static from(amount: number) {
    return new this(amount);
  }

  deposit(amount: number): Transaction {
    this._amount += amount;
    return Transaction.deposit(amount);
  }

  withdraw(amount: number): Transaction {
    if (this._amount < amount) {
      throw new Error("balance unsufficient for this transaction");
    }
    this._amount -= amount;
    return Transaction.withdraw(amount);
  }

  get amount() {
    return this._amount;
  }

  computeSize(): number {
    return this._amount * Money.AMOUNT_UNIT_SIZE;
  }
}
