import type { RootState } from "@/app/store";

export const selectAlerts = (state: RootState) => state.notifications.alerts;
