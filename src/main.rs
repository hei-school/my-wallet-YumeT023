use self::core::transaction::Transactional;

use self::core::wallet::Wallet;

use tui::{
    colors::Style,
    print::{print_history, print_list, print_logo, print_wallet},
    ui::{exit, prompt},
};

mod core;
mod tui;

fn open_wallet() -> Wallet {
    let owner: String =
        prompt("Wallet owner username").expect("[OWNER]\n".to_string().err().as_str());
    return Wallet::new(&owner);
}

fn get_menu_list() -> Vec<&'static str> {
    vec!["Wallety state", "Deposit", "Withdraw", "History", "Exit"]
}

fn start_loop(mut exec: impl FnMut(&str) -> Result<(), String>) {
    loop {
        let menu = get_menu_list();
        print_list(&menu);
        let selected = prompt::<usize>("Select a menu");
        if let Some(id) = selected {
            match menu.get(id - 1) {
                Some(&m) => match exec(m) {
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
            wallet.deposit(amount.unwrap_or(0.0));
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
        "Exit" => {
            exit();
            Ok(())
        }
        _ => Ok(()),
    });
}
