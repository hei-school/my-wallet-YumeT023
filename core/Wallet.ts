import { Action } from "./Action.ts";
import { Money } from "./Money.ts";
import { Transaction, Transactionable } from "./Transaction.ts";

export class Wallet implements Transactionable {
  // in case you don't remember what you did:D
  public readonly actionsHistory: Action[];
  readonly #balance: Money;

  constructor(public readonly owner: string, initialBalance = 0) {
    this.#balance = Money.from(initialBalance);
    this.actionsHistory = [];
  }

  deposit(amount: number): Transaction {
    const transaction = this.#balance.deposit(amount);
    return this._queueHistory(transaction);
  }

  withdraw(amount: number): Transaction {
    const transaction = this.#balance.withdraw(amount);
    return this._queueHistory(transaction);
  }

  private _queueHistory<T extends Action>(action: T): T {
    this.actionsHistory.push(action);
    return action;
  }

  get balance() {
    return this.#balance.amount;
  }

  toView(): Record<string, unknown> {
    return {
      owner: this.owner,
      balance: this.balance,
    };
  }
}
