pub trait Style {
    fn err(&self) -> String;
    fn main(&self) -> String;
    fn normal(&self) -> String;
    fn green(&self) -> String;
}

fn color(str: &str, offset: [&str; 2]) -> String {
    format!("\x1b[{};{}m{}\x1b[0m", offset[0], offset[1], str)
}

impl Style for String {
    fn err(&self) -> String {
        color(&self, ["1", "31"])
    }

    fn main(&self) -> String {
        color(&self, ["0", "33"])
    }

    fn normal(&self) -> String {
        color(&self, ["0", "37"])
    }

    fn green(&self) -> String {
        color(&self, ["1", "32"])
    }
}
