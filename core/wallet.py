from core.money import Money

class Wallet:
    def __init__(self, owner):
        self.owner = owner
        self.balance = Money.from_amount(0)
        self.action_history = []

    def get_balance(self):
        return self.balance.get_amount()

    def queue_history(self, action):
        self.action_history.append(action)
        return action

    def deposit(self, amount):
        transaction = self.balance.deposit(amount)
        self.action_history.append(Action())
        return transaction

    def withdraw(self, amount):
        try:
            transaction = self.balance.withdraw(amount)
            self.queue_history(Action())
            return transaction
        except ValueError as e:
            # Handle insufficient funds error
            print(e)
            return None