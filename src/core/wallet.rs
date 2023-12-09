use super::{
    action::Action,
    money::Money,
    transaction::{Transaction, Transactional},
};

pub struct Wallet {
    pub owner: String,
    pub action_history: Vec<Action>,
    balance: Money,
}

impl Wallet {
    pub fn new(owner: &str) -> Wallet {
        Self {
            owner: owner.to_string(),
            balance: Money::from(0.0),
            action_history: vec![],
        }
    }

    pub fn balance(&self) -> f32 {
        self.balance.amount()
    }

    pub fn queue_history(&mut self, action: Action) -> Action {
        self.action_history.push(action.clone());
        action
    }
}

impl Transactional for Wallet {
    fn deposit(&mut self, amount: f32) -> Transaction {
        let transaction = self.balance.deposit(amount);
        self.action_history
            .push(Action::Transaction(transaction.clone()));
        transaction
    }

    fn withdraw(&mut self, amount: f32) -> Result<Transaction, std::io::Error> {
        let transaction = self.balance.withdraw(amount)?;
        self.queue_history(Action::Transaction(transaction.clone()));
        Ok(transaction)
    }
}
