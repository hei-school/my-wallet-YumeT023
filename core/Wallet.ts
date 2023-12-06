import { Action } from "./Action.ts";
import { Money } from "./Money.ts";
import { Transaction, Transactionable } from "./Transaction.ts";

export class Wallet implements Transactionable {
  // in case you don't remember what you did:D
  public readonly actionsHistory: Action[];
  private readonly _balance: Money;

  constructor(public readonly owner: string, initialBalance = 0) {
    this._balance = Money.from(initialBalance);
    this.actionsHistory = [];
  }

  deposit(amount: number): Transaction {
    const transaction = this._balance.deposit(amount);
    return this._queueHistory(transaction);
  }

  withdraw(amount: number): Transaction {
    const transaction = this._balance.withdraw(amount);
    return this._queueHistory(transaction);
  }

  private _queueHistory<T extends Action>(action: T): T {
    this.actionsHistory.push(action);
    return action;
  }

  get balance() {
    return this._balance.amount;
  }
}
