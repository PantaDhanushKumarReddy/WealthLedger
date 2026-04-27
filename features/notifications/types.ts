export interface AlertItem {
  id: string;
  message: string;
  timestamp: number;
}

export interface NotificationsState {
  alerts: AlertItem[];
  loading: boolean;
  error: string | null;
}
