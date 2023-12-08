## Wallety

> Prop
- `size`: 50x
- `owner`
- `status`: OPEN, CLOSED, LOST
- `Restore` by CIN, CB, CV, ID Photo

> Common
- `status`: LOST, IN, OUT

  **CIN**:
  - `status`
  - `owner`
  - `id`
  - `size`: count * 1x
  - > Count
      - Put: count + 1
      - Take_Out: count - 1

  **PC**:
  - `Status`
  - `Owner`
  - `size`: count * 1x
  - > Count
      - Put: count + 1
      - Take_Out: count - 1

  **CB**:
  - `status`
  - `size`: count * 1x
  - > Count
      - Put: count + 1
      - Take_Out: count - 1

  **CV**:
  - `status`
  - `size`: count * 1x
  - > Count
      - Put: count + 1
      - Take_Out: count - 1

  **ID Photo**:
  - `status`
  - `size`: count * 0.5x
  - > Count
      - Put: count + 1
      - Take_Out: count - 1

  **Argent**
    - `currency`
    - `size`: Amount * 0.2x
    - > Amount
        - Put: amount - to_add
        - Take_Out: amount + to_get (if amount = 0, _balance insufficient_)