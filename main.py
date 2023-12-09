from core.wallet import Wallet
from core.item.card import get_card_creator_from_type, CARD_TYPES
from tui.printer import *

MENU = ["Wallety state", "Deposit", "Withdraw", "History", "List cards", "Add card", "Get card", "Exit"]

def open_wallet(): 
  user = input("username > ")
  return Wallet(user)


def start_loop(mywallet):
  while 1:
    print_list(MENU)
    relative_index = int(input("Select menu >"))
    menu = MENU[relative_index - 1]
    if menu == "Wallety state":
      print_wallet(mywallet)
    elif menu  == "Deposit":
      try:
        amount = int(input("[DEPOSIT] amount"))
        mywallet.deposit(amount)
      except Exception as e:
        print(e)
    elif menu == "Withdraw":
      amount = int(input("[WITHDRAW] amount"))
      mywallet.withdraw(amount)
    elif menu == "History":
      print_history(mywallet.transaction_history)
    elif menu == "List cards":
      print_cards(mywallet.cards)
    elif menu == "Add card":
      print_list(CARD_TYPES)
      type = int(input("choose the card type: "))
      owner = input("Who is the owner: ")
      create = get_card_creator_from_type(CARD_TYPES[type - 1]) 
      try:
        mywallet.add_card(create(owner))
      except Exception as e:
        print(e)
    elif menu == "Get card":
      print_list(list(map(lambda x: x.ref(), mywallet.cards)))
      order = int(input("Choose card"))
      try:
        card = mywallet.get_card(order)
        print_card(card)
      except Exception as e:
        print(e)
    elif menu == "Exit":
      print("Thank you for using Wallety")
      exit(0)

def main(): 
  print_logo()
  start_loop(open_wallet())

main()