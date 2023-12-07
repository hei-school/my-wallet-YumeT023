package com.yumii.core;

public interface Transactional {
  Transaction deposit(double amount);
  Transaction withdraw(double amount);
}
