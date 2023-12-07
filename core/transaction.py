from enum import Enum

class TransactionType(Enum):
    DEPOSIT = 1
    WITHDRAWAL = 2

class Transaction:
    def __init__(self, ttype, amount):
        self.ttype = ttype
        self.amount = amount

    @classmethod
    def new(cls, ttype, amount):
        return cls(ttype, amount)

    @classmethod
    def deposit(cls, amount):
        return cls(TransactionType.DEPOSIT, amount)

    @classmethod
    def withdraw(cls, amount):
        return cls(TransactionType.WITHDRAWAL, amount)
