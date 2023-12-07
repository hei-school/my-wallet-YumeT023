use std::io::Error;

#[derive(Clone)]
pub enum TransactionType {
    DEPOSIT,
    WITHDRAWAL,
}

#[derive(Clone)]
pub struct Transaction {
    pub ttype: TransactionType,
    pub amount: u16,
}

impl Transaction {
    pub fn new(ttype: TransactionType, amount: u16) -> Transaction {
        Self { ttype, amount }
    }

    pub fn deposit(amount: u16) -> Transaction {
        Self::new(TransactionType::DEPOSIT, amount)
    }

    pub fn withdraw(amount: u16) -> Transaction {
        Self::new(TransactionType::WITHDRAWAL, amount)
    }
}

pub trait Transactionable {
    fn deposit(&mut self, amount: u16) -> Transaction;
    fn withdraw(&mut self, amount: u16) -> Result<Transaction, Error>;
}
