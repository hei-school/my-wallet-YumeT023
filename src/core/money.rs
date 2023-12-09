use std::io::{Error, ErrorKind::Other};

use super::transaction::{Transaction, Transactional};

pub struct Money {
    amount: u16,
}

impl Money {
    pub fn from(amount: u16) -> Money {
        Self { amount }
    }

    pub fn amount(&self) -> u16 {
        self.amount
    }
}

impl Transactional for Money {
    fn deposit(&mut self, amount: u16) -> Transaction {
        self.amount += amount;
        Transaction::deposit(amount)
    }

    fn withdraw(&mut self, amount: u16) -> Result<Transaction, Error> {
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
