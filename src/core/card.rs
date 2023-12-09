use std::fmt::Display;

use super::sized::Sized;

pub struct Owner(String);

pub enum Cards {
    Bank(Owner),
    National(Owner),
    DrivingLicense(Owner),
}

impl Display for Cards {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!(
            "{}",
            match self {
                Cards::Bank(owner) => format!("{}:{}", "Bank card", owner.0),
                Cards::DrivingLicense(owner) => format!("{}:{}", "Driving license", owner.0),
                Cards::National(owner) => format!("{}:{}", "National card", owner.0),
            }
        ))
    }
}

impl Sized for Cards {
    fn compute_size(&self) -> f32 {
        1.0
    }
}
