package com.yumii.core.item;

import java.util.List;
import java.util.Optional;

public interface CardPocket<ID> {
  Optional<Card> getCard(ID id);

  List<Card> getCards();

  void putCard(Card toPut);
}
