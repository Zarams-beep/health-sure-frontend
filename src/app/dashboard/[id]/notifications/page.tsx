"use client";
import { useState } from "react";
import {
  IoCheckmarkDoneOutline,
  IoTrashOutline,
  IoHeartOutline,
  IoCalendarOutline,
  IoAlertCircleOutline,
  IoInformationCircleOutline,
  IoMedkitOutline,
} from "react-icons/io5";

type NotifType = "health" | "appointment" | "alert" | "info" | "medication";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const iconMap: Record<NotifType, React.ReactNode> = {
  health: <IoHeartOutline size={20} />,
  appointment: <IoCalendarOutline size={20} />,
  alert: <IoAlertCircleOutline size={20} />,
  info: <IoInformationCircleOutline size={20} />,
  medication: <IoMedkitOutline size={20} />,
};

const colorMap: Record<NotifType, string> = {
  health: "#17A589",
  appointment: "#0D6E9A",
  alert: "#E74C3C",
  info: "#2E86C1",
  medication: "#8E44AD",
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "health", title: "Health Check Reminder", message: "You haven't updated your health status in 7 days. Keep your records up to date for better insights.", time: "2 hours ago", read: false },
  { id: 2, type: "appointment", title: "Upcoming Appointment", message: "You have an appointment scheduled with Dr. Emeka Okafor tomorrow at 10:00 AM.", time: "5 hours ago", read: false },
  { id: 3, type: "medication", title: "Medication Reminder", message: "Time to take your Metformin 500mg. Take with food as prescribed by your doctor.", time: "8 hours ago", read: false },
  { id: 4, type: "alert", title: "Abnormal Vital Sign", message: "Your last recorded blood pressure (145/90) is above normal range. Consider consulting your doctor.", time: "1 day ago", read: true },
  { id: 5, type: "info", title: "Profile Incomplete", message: "Your health profile is only 40% complete. Fill in your medical history for better health tracking.", time: "2 days ago", read: true },
  { id: 6, type: "appointment", title: "Appointment Confirmed", message: "Your appointment with Dr. Ngozi Adeyemi has been confirmed for next Monday.", time: "3 days ago", read: true },
  { id: 7, type: "health", title: "Weekly Health Summary", message: "Your health data for this week is ready. View your vitals, trends, and recommendations.", time: "5 days ago", read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAsRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const deleteNotif = (id: number) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAll = () => setNotifications([]);

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-primary-dark)" }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{
                  marginLeft: "10px", background: "var(--color-error)", color: "#fff",
                  borderRadius: "999px", fontSize: "12px", fontWeight: 700,
                  padding: "2px 8px", verticalAlign: "middle"
                }}>{unreadCount}</span>
              )}
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>Stay updated with your health alerts and reminders</p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                background: "var(--color-surface)", color: "var(--color-primary)", cursor: "pointer",
                border: "1px solid var(--color-border)"
              }}>
                <IoCheckmarkDoneOutline size={16} /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button onClick={clearAll} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                background: "var(--color-surface)", color: "var(--color-error)", cursor: "pointer",
                border: "1px solid var(--color-border)"
              }}>
                <IoTrashOutline size={16} /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "16px", background: "var(--color-surface)", borderRadius: "8px", padding: "4px", width: "fit-content" }}>
          {(["all", "unread"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 18px", borderRadius: "6px", fontSize: "13px", fontWeight: 600,
              background: filter === f ? "var(--color-primary)" : "transparent",
              color: filter === f ? "#fff" : "var(--color-text-muted)",
              cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize"
            }}>
              {f} {f === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        {displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
            <IoCheckmarkDoneOutline size={48} style={{ marginBottom: "12px", opacity: 0.4 }} />
            <p style={{ fontSize: "16px", fontWeight: 600 }}>All caught up!</p>
            <p style={{ fontSize: "13px" }}>No {filter === "unread" ? "unread " : ""}notifications</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {displayed.map((notif) => (
              <div key={notif.id} onClick={() => markAsRead(notif.id)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  padding: "16px", borderRadius: "10px", cursor: "pointer",
                  background: notif.read ? "#fff" : "var(--color-surface)",
                  border: `1px solid ${notif.read ? "var(--color-border)" : "var(--color-primary-light)"}`,
                  borderLeft: `4px solid ${colorMap[notif.type]}`,
                  boxShadow: "var(--shadow-card)", transition: "all 0.2s",
                  position: "relative"
                }}>
                {/* Icon */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${colorMap[notif.type]}18`, color: colorMap[notif.type]
                }}>
                  {iconMap[notif.type]}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <p style={{ fontWeight: notif.read ? 500 : 700, fontSize: "14px", color: "var(--color-primary-dark)" }}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: "1.5" }}>{notif.message}</p>
                  <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "6px", opacity: 0.7 }}>{notif.time}</p>
                </div>

                {/* Delete button */}
                <button onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                  style={{
                    padding: "4px", borderRadius: "6px", color: "var(--color-text-muted)",
                    cursor: "pointer", background: "transparent", flexShrink: 0,
                    transition: "color 0.2s"
                  }}
                  title="Delete">
                  <IoTrashOutline size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
