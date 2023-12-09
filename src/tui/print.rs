use crate::core::{action::Action, card::Card, wallet::Wallet};

use super::colors::Style;

pub fn print_logo() {
    println!(
        "{}",
        r#" __       __            __  __              __               
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
                                                      $$$$$$/ "#
            .to_string()
            .main()
    );
}

pub fn print_hr(len: usize) {
    println!("{}\n", "-".repeat(len).to_string().main());
}

pub fn print_header(str: &str) {
    println!("\n{}", str.to_string().main());
    print_hr(str.len() * 2);
}

pub fn print_list(items: &Vec<String>) {
    let mut count = 0;
    let list_decimal = items
        .iter()
        .map(|label| {
            count += 1;
            format!("{} - {label}", count.to_string().main())
        })
        .collect::<Vec<_>>()
        .join("\n");
    println!("{}\n", list_decimal);
}

pub fn print_wallet(w: &Wallet) {
    print_header("Wallet state");
    println!("owner   \t{}", w.owner);
    println!("balance \t{}", w.balance());
    println!("available space \t{}", w.compute_available_space());
    print_hr(10);
}

pub fn print_history(action_history: &Vec<Action>) {
    print_header("History");
    for action in action_history {
        match action {
            Action::Transaction(t) => {
                println!("{:?}\t{}", t.ttype, t.amount)
            }
        }
    }
    print_hr(10);
}

pub fn print_cards(cards: Vec<Card>) {
    print_header("Card list");
    for card in cards {
        println!("{}", card)
    }
    print_hr(10);
}
