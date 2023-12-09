from core.item.sized import Sized
from core.item.money import Money

WALLET_SIZE = 50

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
        money = Money.from_amount(amount)
        self._assert_item_fits(money)
        transaction = self.balance.deposit(money.amount)
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

    def add_card(self, item):
        self._assert_item_fits(item)
        self.cards.append(item)

    def get_card(self, order):
        card = self.cards[order - 1]
        if card == None:
            raise Exception("Card not found")

    def compute_size(self):
        self.balance.compute_size() + map(lambda x: x.compute_size(), self.cards)

    def _assert_item_fits(self, item):
        size = item.compute_size()
        if self._get_available_space() < size:
            raise AssertionError(f"item with size: {size} doesn't fit in the wallet anymore, available_in_wallet={self._get_available_space()}")

    def _get_available_space(self):
        WALLET_SIZE - self.compute_size()