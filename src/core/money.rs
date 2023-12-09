use std::io::{Error, ErrorKind::Other};

use super::{
    sized::Sized,
    transaction::{Transaction, Transactional},
};

static AMOUNT_UNIT_SIZE: f32 = 0.2;

pub struct Money {
    amount: f32,
}

impl Money {
    pub fn from(amount: f32) -> Money {
        Self { amount }
    }

    pub fn amount(&self) -> f32 {
        self.amount
    }
}

impl Transactional for Money {
    fn deposit(&mut self, amount: f32) -> Transaction {
        self.amount += amount;
        Transaction::deposit(amount)
    }

    fn withdraw(&mut self, amount: f32) -> Result<Transaction, Error> {
        if self.amount < amount {
            return Err(Error::new(
                Other,
                "amount to take out must be lesser than actual",
            ));
        }
        self.amount -= amount;
        Ok(Transaction::withdraw(amount))
    }
}

impl Sized for Money {
    fn compute_size(&self) -> f32 {
        self.amount() * AMOUNT_UNIT_SIZE
    }
}
