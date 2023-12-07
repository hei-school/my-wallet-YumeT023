use super::transaction::Transaction;

pub enum Action {
    Transaction(Transaction),
}
