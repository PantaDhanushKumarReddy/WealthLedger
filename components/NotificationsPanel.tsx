"use client";

import { useAppSelector } from "@/app/hooks";
import { selectAlerts } from "@/features/notifications/selectors/notificationsSelectors";

function AlertIcon({ message }: { message: string }) {
  if (message.includes("Budget") || message.includes("⚠️")) {
    return (
      <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    </div>
  );
}

export default function NotificationsPanel() {
  const alerts = useAppSelector(selectAlerts);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold">Alerts</h2>
        {alerts.length > 0 && (
          <span className="text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
            {alerts.length}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {alerts.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <AlertIcon message={item.message} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200">{item.message}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date(item.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No alerts yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
