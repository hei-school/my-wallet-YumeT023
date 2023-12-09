use self::core::card::{get_card_types, Card, CardPocket};

use self::core::transaction::Transactional;

use self::core::wallet::Wallet;

use tui::{
    colors::Style,
    print::{print_cards, print_history, print_list, print_logo, print_wallet},
    ui::{exit, prompt},
};

mod core;
mod tui;

fn open_wallet() -> Wallet {
    let owner: String =
        prompt("Wallet owner username").expect("[OWNER]\n".to_string().err().as_str());
    return Wallet::new(&owner);
}

fn get_menu_list() -> Vec<String> {
    vec![
        String::from("Wallety state"),
        String::from("Deposit"),
        String::from("Withdraw"),
        String::from("History"),
        String::from("List cards"),
        String::from("Add card"),
        String::from("Get card"),
        String::from("Exit"),
    ]
}

fn start_loop(mut exec: impl FnMut(&str) -> Result<(), String>) {
    loop {
        let menu = get_menu_list();
        print_list(&menu);
        let selected = prompt::<usize>("Select a menu");
        if let Some(id) = selected {
            match menu.get(id - 1) {
                Some(m) => match exec(m) {
                    Err(e) => println!("{}\n", e.to_string().err()),
                    _ => {}
                },
                _ => {}
            }
        }
    }
}

fn main() {
    print_logo();
    let mut wallet = open_wallet();

    start_loop(|menu| match menu {
        "Wallety state" => {
            print_wallet(&wallet);
            Ok(())
        }
        "Deposit" => {
            let amount = prompt::<f32>("[WITHDRAWAL] How much");
            wallet
                .deposit(amount.unwrap_or(0.0))
                .map_err(|e| e.to_string())?;
            Ok(())
        }
        "Withdraw" => {
            let amount = prompt::<f32>("[WITHDRAWAL] How much");
            wallet
                .withdraw(amount.unwrap_or(0.0))
                .map_err(|e| e.to_string())?;
            Ok(())
        }
        "History" => {
            print_history(&wallet.action_history);
            Ok(())
        }
        "List cards" => {
            print_cards(wallet.get_all_card());
            Ok(())
        }
        "Add card" => {
            let card_types = get_card_types();
            print_list(&card_types);
            let type_idx = prompt::<usize>("[CARD_TYPE] choose type").unwrap();
            let owner = prompt::<String>("[CARD_OWNER] Who is the owner");
            let ctype = card_types.get(type_idx - 1);
            if let Some(ttype) = ctype {
                wallet
                    .put_card(Card::new(ttype, owner.unwrap()))
                    .map_err(|e| e.to_string())?;
            }
            Ok(())
        }
        "Get card" => {
            let cards = wallet.get_all_card();
            let cards_name = cards.iter().map(|c| c.to_string()).collect::<Vec<_>>();
            print_list(&cards_name);
            let card_idx = prompt::<usize>("[CARD] Choose card").unwrap();
            if let Some(card) = cards.get(card_idx - 1) {
                println!("{}", card);
            }
            Ok(())
        }
        "Exit" => {
            exit();
            Ok(())
        }
        _ => Ok(()),
    });
}
