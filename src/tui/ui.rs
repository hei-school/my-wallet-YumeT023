use std::{io::stdin, str::FromStr};

use crate::tui::colors::Style;

pub fn prompt<T: FromStr>(label: &str) -> Result<T, T::Err> {
    let mut answer = String::new();
    println!("{} {}", label, ">".to_string().main());
    stdin().read_line(&mut answer).expect("Stdin err");
    let val = answer.trim().parse::<T>()?;
    Ok(val)
}
