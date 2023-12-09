use std::io::{Error, ErrorKind::InvalidData};

use super::{
    action::Action,
    card::{Card, CardPocket},
    money::Money,
    sized::Sized,
    transaction::{Transaction, Transactional},
};

pub struct Wallet {
    pub owner: String,
    pub action_history: Vec<Action>,
    cards: Vec<Card>,
    balance: Money,
}

const WALLET_DEFAULT_SIZE: f32 = 50.0;

impl Wallet {
    pub fn new(owner: &str) -> Wallet {
        Self {
            owner: owner.to_string(),
            balance: Money::from(0.0),
            cards: vec![],
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

    pub fn compute_available_space(&self) -> f32 {
        WALLET_DEFAULT_SIZE - self.compute_size()
    }

    pub fn assert_sized_fits(&self, sized: &impl Sized) -> Result<(), Error> {
        let size = sized.compute_size();
        if self.compute_available_space() < size {
            return Err(Error::new(
                InvalidData,
                format!("No more space for {}", size),
            ));
        }
        Ok(())
    }
}

impl Transactional for Wallet {
    fn deposit(&mut self, amount: f32) -> Result<Transaction, std::io::Error> {
        self.assert_sized_fits(&Money::from(amount))?;
        let transaction = self.balance.deposit(amount)?;
        self.action_history
            .push(Action::Transaction(transaction.clone()));
        Ok(transaction)
    }

    fn withdraw(&mut self, amount: f32) -> Result<Transaction, std::io::Error> {
        let transaction = self.balance.withdraw(amount)?;
        self.queue_history(Action::Transaction(transaction.clone()));
        Ok(transaction)
    }
}

impl CardPocket<usize> for Wallet {
    fn put_card(&mut self, to_add: Card) -> Result<(), std::io::Error> {
        self.assert_sized_fits(&to_add)?;
        self.cards.push(to_add);
        Ok(())
    }

    fn get_all_card(&self) -> Vec<Card> {
        self.cards.clone()
    }

    fn get_card(&self, idx: usize) -> Option<&Card> {
        self.cards.get(idx - 1)
    }
}

impl Sized for Wallet {
    fn compute_size(&self) -> f32 {
        let card_size = self.cards.iter().map(|x| x.compute_size()).sum::<f32>();
        let balance_size = self.balance.compute_size();
        card_size + balance_size
    }
}
