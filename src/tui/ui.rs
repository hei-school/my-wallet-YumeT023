use std::{io::stdin, process, str::FromStr};

use crate::tui::colors::Style;

pub fn prompt<T: FromStr>(label: &str) -> Option<T> {
    let mut answer = String::new();
    println!("{} {}", label, ">".to_string().main());
    stdin().read_line(&mut answer).expect("Stdin err");
    match answer.trim().parse::<T>() {
        Ok(v) => Some(v),
        Err(_) => {
            println!("{}\n", "Invalid value".to_string().err());
            None
        }
    }
}

pub fn exit() {
    println!("\n{}\n", "Thank you for using wallety".to_string().green());
    process::exit(0)
}
