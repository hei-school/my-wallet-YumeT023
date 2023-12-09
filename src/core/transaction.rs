use std::io::Error;

#[derive(Clone, Debug)]
pub enum TransactionType {
    DEPOSIT,
    WITHDRAWAL,
}

#[derive(Clone)]
pub struct Transaction {
    pub ttype: TransactionType,
    pub amount: f32,
}

impl Transaction {
    pub fn new(ttype: TransactionType, amount: f32) -> Transaction {
        Self { ttype, amount }
    }

    pub fn deposit(amount: f32) -> Transaction {
        Self::new(TransactionType::DEPOSIT, amount)
    }

    pub fn withdraw(amount: f32) -> Transaction {
        Self::new(TransactionType::WITHDRAWAL, amount)
    }
}

pub trait Transactional {
    fn deposit(&mut self, amount: f32) -> Result<Transaction, Error>;
    fn withdraw(&mut self, amount: f32) -> Result<Transaction, Error>;
}
