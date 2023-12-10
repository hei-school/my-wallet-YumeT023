package com.yumii.core.sized;

public interface SizedContainer extends Sized {
  double computeAvailableSpace();
  boolean canItemFit(Sized item);
}
