def print_logo():
  print(""" __       __            __  __              __               
  /  |  _  /  |          /  |/  |            /  |              
  $$ | / \ $$ |  ______  $$ |$$ |  ______   _$$ |_    __    __ 
  $$ |/$  \$$ | /      \ $$ |$$ | /      \ / $$   |  /  |  /  |
  $$ /$$$  $$ | $$$$$$  |$$ |$$ |/$$$$$$  |$$$$$$/   $$ |  $$ |
  $$ $$/$$ $$ | /    $$ |$$ |$$ |$$    $$ |  $$ | __ $$ |  $$ |
  $$$$/  $$$$ |/$$$$$$$ |$$ |$$ |$$$$$$$$/   $$ |/  |$$ \__$$ |
  $$$/    $$$ |$$    $$ |$$ |$$ |$$       |  $$  $$/ $$    $$ |
  $$/      $$/  $$$$$$$/ $$/ $$/  $$$$$$$/    $$$$/   $$$$$$$ |
                                                     /  \__$$ |
                                                     $$    $$/ 
                                                      $$$$$$/ """)

def print_header(str):
  print("\n")
  print(str)
  print("-" * len(str))

def print_wallet(wallet):
  print_header("Wallety state")
  print(f"owner   {wallet.owner}")
  print(f"balance {wallet.balance.get_amount()}")

def print_history(history):
  print_header("History")
  for transaction in history:
    print(f"{transaction.type.name}\t{transaction.amount}")

def print_list(list=[]):
  print("\n")
  for i in range(0, len(list)):
    print(f"{i + 1} {list[i]}")
  print("\n")