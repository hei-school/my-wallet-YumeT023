use std::{fmt::Display, io::Error};

use crate::tui::colors::Style;

use super::sized::Sized;

#[derive(Clone)]
pub struct Owner(String);

#[derive(Clone)]
pub enum Card {
    Bank(Owner),
    National(Owner),
    DrivingLicense(Owner),
}

pub trait CardPocket<IDX> {
    fn get_card(&self, idx: IDX) -> Option<&Card>;
    fn put_card(&mut self, to_put: Card) -> Result<(), Error>;
    fn get_all(&self) -> Vec<Card>;
}

impl Display for Card {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!(
            "{}",
            match self {
                Card::Bank(owner) => format!("{}:{}", String::from("Bank card").main(), owner.0),
                Card::DrivingLicense(owner) =>
                    format!("{}:{}", String::from("Driving license").main(), owner.0),
                Card::National(owner) =>
                    format!("{}:{}", String::from("National card").main(), owner.0),
            }
        ))
    }
}

impl Sized for Card {
    fn compute_size(&self) -> f32 {
        1.0
    }
}
