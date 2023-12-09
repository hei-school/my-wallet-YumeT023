from core.item.sized import Sized

class Card(Sized):
  def __init__(self, type, owner):
    self.owner = owner
    self.type = type

  def compute_size(self):
    return 1

class BankCard(Card):
  def __init__(self, owner):
    super(owner)

class NationalCard(Card):
  def __init__(self, owner):
    super(owner)

class DrivingLicense(Card):
  def __init__(self, owner):
    super(owner)

def get_card_creator_from_type(type):
  if type == "Bank card":
    return BankCard
  elif type == "National card":
    return NationalCard
  elif type == "Driving license":
    return DrivingLicense