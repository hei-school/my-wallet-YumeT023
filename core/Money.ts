import { Transaction, Transactionable } from "./Transaction.ts";

export class MoneyOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MoneyOperationError";
  }
}

export class Money implements Transactionable {
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
      throw new MoneyOperationError(
        "'amount' to take out must be lesser than 'actual'",
      );
    }
    this._amount -= amount;
    return Transaction.withdraw(amount);
  }

  get amount() {
    return this._amount;
  }
}
