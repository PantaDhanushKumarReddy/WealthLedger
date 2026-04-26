import { createAsyncThunk } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

import type { Transaction } from "../types";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchTransactions",
  async () => {
    faker.seed(2026);

    const categories = ["Food", "Travel", "Shopping", "Bills", "Health"];

    return Array.from({ length: 30 }).map(
      (): Transaction => ({
        id: faker.string.uuid(),

        title: faker.company.name(),

        category: faker.helpers.arrayElement(categories),

        amount: Number(
          faker.finance.amount({
            min: 100,
            max: 8000,
            dec: 0,
          }),
        ),

        date: faker.date.recent({ days: 30 }).toISOString(),
      }),
    );
  },
);
