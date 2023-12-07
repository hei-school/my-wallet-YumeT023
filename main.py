import core.money;
import core.transaction;
import core.wallet;
from tui.printer import *;

MENU = ["Wallety state", "Deposit", "Withdraw", "History", "Exit"]

def open_wallet(): 
  user = input("username > ")
  return Wallet(user)


def start_loop(wallet):
  while true:
    index = int(input("Select menu >"))
    selected_menu = MENU[index]
    if selected_menu == "Wallety state":
      print_wallet(wallet=wallet)
    elif selected_menu  == "Deposit":
      amount = int(input("[DEPOSIT] amount"))
      wallet.deposit(amount)
    elif selected_menu == "Withdraw":
      amount = int(input("[WITHDRAW] amount"))
      wallet.withdraw(amount)
    elif selected_menu == "History":
      print_history(wallet.action_history)
    elif selected_menu == "Exit":
      print("Thank you for using Wallety")
      exit(0)

def main(): 
  print_logo()
  wallet = open_wallet()
  start_loop(wallet)