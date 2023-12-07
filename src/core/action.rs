use super::transaction::Transaction;

#[derive(Clone)]
pub enum Action {
    Transaction(Transaction),
}
