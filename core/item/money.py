from core.transaction import Transaction 
from core.item.sized import Sized

AMOUNT_UNIT_SIZE = 0.2

class Money(Sized):
    def __init__(self, amount):
        self.amount = amount

    @classmethod
    def from_amount(new, amount):
        return new(amount)

    def get_amount(self):
        return self.amount

    def deposit(self, amount):
        self.amount += amount
        return Transaction.deposit(amount)

    def withdraw(self, amount):
        if self.amount < amount:
            raise ValueError("Amount to take out must be less than actual")
        self.amount -= amount
        return Transaction.withdraw(amount)

    def compute_size(self):
        # /!\ Floating point number
        return self.get_amount() * AMOUNT_UNIT_SIZE
