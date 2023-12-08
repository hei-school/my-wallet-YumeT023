from enum import Enum

class TransactionType(Enum):
    DEPOSIT = 1
    WITHDRAWAL = 2

class Transaction:
    def __init__(self, type, amount):
        self.type = type
        self.amount = amount

    @classmethod
    def new(cls, type, amount):
        return cls(type, amount)

    @classmethod
    def deposit(cls, amount):
        return cls(TransactionType.DEPOSIT, amount)

    @classmethod
    def withdraw(cls, amount):
        return cls(TransactionType.WITHDRAWAL, amount)
