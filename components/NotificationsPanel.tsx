"use client";

import { useAppSelector } from "@/app/hooks";

import { selectAlerts } from "@/features/notifications/selectors/notificationsSelectors";

export default function NotificationsPanel() {
  const alerts = useAppSelector(selectAlerts);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Alerts</h2>

      <div className="space-y-3">
        {alerts.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-white/5">
            {item.message}
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="p-4 rounded-2xl bg-white/5 text-slate-400">
            No alerts
          </div>
        )}
      </div>
    </div>
  );
}
