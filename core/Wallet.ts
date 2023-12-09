import { Card } from "./item/Card.ts";
import { Money } from "./item/Money.ts";
import { Sized } from "./item/Sized.ts";
import { Transaction, Transactional } from "./Transaction.ts";

export class Wallet implements Transactional, Sized {
  // in case you don't remember what you did:D
  public readonly actionsHistory: Transaction[];
  private static readonly WALLET_SIZE = 30;
  readonly #cards: Omit<Card, "status">[];
  readonly #balance: Money;

  constructor(public readonly owner: string, initialBalance = 0) {
    this.#balance = Money.from(initialBalance);
    this.#cards = [];
    this.actionsHistory = [];
  }

  deposit(amount: number): Transaction {
    const newDeposit = Money.from(amount);
    this._assertItemFits(newDeposit);
    const transaction = this.#balance.deposit(newDeposit.amount);
    return this._queueHistory(transaction);
  }

  withdraw(amount: number): Transaction {
    const transaction = this.#balance.withdraw(amount);
    return this._queueHistory(transaction);
  }

  putCard(card: Card) {
    this.#cards.push(card);
  }

  getCardByOrder(order: number) {
    const card = this.cards.at(order - 1);
    if (!card) {
      throw new Error("No item at: " + order);
    }
    return card;
  }

  get cards() {
    return this.#cards.slice();
  }

  private _queueHistory(action: Transaction) {
    this.actionsHistory.push(action);
    return action;
  }

  get balance() {
    return this.#balance.amount;
  }

  computeSize(): number {
    return Wallet.WALLET_SIZE;
  }

  public getAvailableSpace() {
    return this.computeSize() - this._computeOccupiedSpace();
  }

  private _assertItemFits(sized: Sized) {
    const available = this.getAvailableSpace();
    if (available < sized.computeSize()) {
      throw new Error(
        "item couldn't fit the wallet anymore, available space is: " +
          available,
      );
    }
  }

  private _computeOccupiedSpace() {
    return [
      this.#balance.computeSize(),
      ...this.cards.map((card) => card.computeSize()),
    ].reduce((agg, curr) => agg + curr, 0);
  }

  toView(): Record<string, unknown> {
    return {
      owner: this.owner,
      balance: this.balance,
      availableSpace: this.getAvailableSpace(),
    };
  }
}
