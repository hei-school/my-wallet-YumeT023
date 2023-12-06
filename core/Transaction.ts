export enum TransactionType {
  DEPOSIT = 0,
  WITHDRAWAL,
}

export class Transaction {
  constructor(
    public readonly type: TransactionType,
    public readonly amount: number,
  ) {}

  static deposit(amount: number) {
    return new this(TransactionType.DEPOSIT, amount);
  }

  static withdraw(amount: number) {
    return new this(TransactionType.WITHDRAWAL, amount);
  }
}

export interface Transactionable {
  deposit(amount: number): Transaction;
  withdraw(amount: number): Transaction;
}
