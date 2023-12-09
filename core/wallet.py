from core.item.sized import Sized
from core.item.money import Money

class Wallet(Sized):
    def __init__(self, owner):
        self.owner = owner
        self.balance = Money.from_amount(0)
        self.transaction_history = []
        self.cards = []

    def get_balance(self):
        return self.balance.get_amount()

    def queue_history(self, action):
        self.transaction_history.append(action)
        return action

    def deposit(self, amount):
        transaction = self.balance.deposit(amount)
        self.transaction_history.append(transaction)
        return transaction

    def withdraw(self, amount):
        try:
            transaction = self.balance.withdraw(amount)
            self.queue_history(transaction)
            return transaction
        except ValueError as e:
            # Handle insufficient funds error
            print(e)
            return None

    def compute_size(self):
        self.balance.compute_size() + map(lambda x: x.compute_size(), self.cards)