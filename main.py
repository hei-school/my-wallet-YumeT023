from core.wallet import Wallet
from tui.printer import *

MENU = ["Wallety state", "Deposit", "Withdraw", "History", "Exit"]

def open_wallet(): 
  user = input("username > ")
  return Wallet(user)


def start_loop(mywallet):
  while 1:
    print_list(MENU)
    relative_index = int(input("Select menu >"))
    selected_menu = MENU[relative_index - 1]
    if selected_menu == "Wallety state":
      print_wallet(mywallet)
    elif selected_menu  == "Deposit":
      amount = int(input("[DEPOSIT] amount"))
      mywallet.deposit(amount)
    elif selected_menu == "Withdraw":
      amount = int(input("[WITHDRAW] amount"))
      mywallet.withdraw(amount)
    elif selected_menu == "History":
      print_history(mywallet.action_history)
    elif selected_menu == "Exit":
      print("Thank you for using Wallety")
      exit(0)

def main(): 
  print_logo()
  start_loop(open_wallet())

main();