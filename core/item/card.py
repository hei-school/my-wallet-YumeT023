from core.item.sized import Sized

CARD_TYPES = [
  "Bank card",
  "National card",
  "Driving license"
]

class Card(Sized):
  def __init__(self, type, owner):
    self.owner = owner
    self.type = type

  def compute_size(self):
    return 1

  def ref(self):
    return f"{self.type}:{self.owner}"

class BankCard(Card):
  def __init__(self, owner):
    super().__init__("Bank card", owner)

class NationalCard(Card):
  def __init__(self, owner):
    super().__init__("National card", owner)

class DrivingLicense(Card):
  def __init__(self, owner):
    super().__init__("Driving license", owner)

def get_card_creator_from_type(type):
  if type == "Bank card":
    return BankCard
  elif type == "National card":
    return NationalCard
  elif type == "Driving license":
    return DrivingLicense