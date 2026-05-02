import { createListenerMiddleware } from "@reduxjs/toolkit";

import { fetchTransactions } from "@/features/transactions/thunks/transactionsThunk";
import { addAlert } from "@/features/notifications/slices/notificationsSlice";
import { selectIsOverBudget } from "@/features/insights/selectors/insightsSelectors";
import type { RootState } from "@/app/store";

// Dedicated middleware instance for budget-related side effects.
// Registered in store.ts via .prepend(budgetListener.middleware)
export const budgetListener = createListenerMiddleware();

budgetListener.startListening({
  // Fires every time fetchTransactions.fulfilled is dispatched
  // (i.e. right after faker generates and stores the 30 transactions)
  actionCreator: fetchTransactions.fulfilled,

  effect: (action, api) => {
    // Read the full Redux store at this exact moment.
    // api.getState() returns unknown so we cast it to RootState for type safety.
    const state = api.getState() as RootState;

    // selectIsOverBudget(state) runs the full selector chain:
    //   state → selectRawTransactions → selectTotalMonthlySpend → total > MONTH_LIMIT (30000)
    // Returns true if all transactions combined exceed ₹30,000
    const overBudget = selectIsOverBudget(state);

    if (overBudget) {
      // Push a warning into state.notifications.alerts (max 5, newest first)
      // This automatically appears in NotificationsPanel and NetWorthPanel
      api.dispatch(
        addAlert({
          id: Date.now().toString(),
          message: "⚠️ Budget exceeded this month!",
          timestamp: Date.now(),
        }),
      );
    }
  },
});
