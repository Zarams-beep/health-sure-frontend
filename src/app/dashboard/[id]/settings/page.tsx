"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/hooks/useAuth";
import { setUserData } from "@/store/slices/authSlices";
import { persistor } from "@/store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IoPersonOutline,
  IoLockClosedOutline,
  IoTrashOutline,
  IoLogOutOutline,
  IoChevronForwardOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";

type Tab = "profile" | "password" | "account";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, userId } = useAuth();
  const { fullName, email, image } = useSelector((state: RootState) => state.auth);
  const profileImage = image ? `${process.env.NEXT_PUBLIC_API_URL}${image}` : "/img-5.jpg";

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile form
  const [profileName, setProfileName] = useState(fullName || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Account
  const [logoutLoading, setLogoutLoading] = useState(false);

  const tabs = [
    { id: "profile" as Tab, label: "Profile", icon: <IoPersonOutline size={18} /> },
    { id: "password" as Tab, label: "Change Password", icon: <IoLockClosedOutline size={18} /> },
    { id: "account" as Tab, label: "Account", icon: <IoTrashOutline size={18} /> },
  ];

  // ── Update profile name ──────────────────────────────────────────
  const handleUpdateProfile = async () => {
    if (!profileName.trim()) return;
    setProfileLoading(true);
    setProfileMsg(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fullName: profileName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Update failed");
      dispatch(setUserData({ fullName: profileName, email, image, token: token!, id: userId! }));
      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setProfileMsg({ type: "error", text: err instanceof Error ? err.message : "Update failed" });
    } finally {
      setProfileLoading(false);
    }
  };

  // ── Change password ──────────────────────────────────────────────
  const handleChangePassword = async () => {
    setPasswordMsg(null);
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return setPasswordMsg({ type: "error", text: "All fields are required" });
    }
    if (newPassword !== confirmNewPassword) {
      return setPasswordMsg({ type: "error", text: "New passwords do not match" });
    }
    if (newPassword.length < 6) {
      return setPasswordMsg({ type: "error", text: "Password must be at least 6 characters" });
    }
    setPasswordLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Password change failed");
      setPasswordMsg({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword(""); setNewPassword(""); setConfirmNewPassword("");
    } catch (err) {
      setPasswordMsg({ type: "error", text: err instanceof Error ? err.message : "Failed" });
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    await persistor.purge();
    dispatch(setUserData({ fullName: "", email: "", image: null, token: "", id: "" }));
    router.push("/auth/log-in");
  };

  return (
    <div className="main-wallet-container">
      <div className="wallet-container">
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-primary-dark)" }}>Settings</h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>Manage your account preferences</p>
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Sidebar tabs */}
          <div style={{
            width: "220px", flexShrink: 0,
            background: "#fff", borderRadius: "10px",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)", overflow: "hidden"
          }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", padding: "14px 16px",
                  background: activeTab === tab.id ? "var(--color-surface)" : "transparent",
                  borderLeft: activeTab === tab.id ? "3px solid var(--color-primary)" : "3px solid transparent",
                  color: activeTab === tab.id ? "var(--color-primary-dark)" : "var(--color-text-muted)",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  fontSize: "14px", cursor: "pointer", transition: "all 0.2s",
                  borderBottom: "1px solid var(--color-border)",
                }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {tab.icon}{tab.label}
                </span>
                <IoChevronForwardOutline size={14} />
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div style={{
            flex: 1, minWidth: "280px", background: "#fff",
            borderRadius: "10px", border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)", padding: "24px"
          }}>

            {/* ── Profile Tab ── */}
            {activeTab === "profile" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-primary-dark)" }}>Profile Information</h2>

                {/* Avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--color-primary)" }}>
                    <Image src={profileImage} alt="Profile" width={72} height={72} style={{ objectFit: "cover" }} onError={(e) => { e.currentTarget.src = "/img-5.jpg"; }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--color-primary-dark)", textTransform: "capitalize" }}>{fullName}</p>
                    <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{email}</p>
                  </div>
                </div>

                {/* Email (read-only) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary-dark)" }}>Email</label>
                  <input value={email} readOnly style={{
                    padding: "10px 12px", borderRadius: "8px", fontSize: "14px",
                    border: "1.5px solid var(--color-border)", background: "var(--color-surface)",
                    color: "var(--color-text-muted)", cursor: "not-allowed"
                  }} />
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Email cannot be changed</span>
                </div>

                {/* Full name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary-dark)" }}>Full Name</label>
                  <input value={profileName} onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      padding: "10px 12px", borderRadius: "8px", fontSize: "14px",
                      border: "1.5px solid var(--color-border)", outline: "none",
                      color: "var(--color-text)"
                    }} />
                </div>

                {profileMsg && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: profileMsg.type === "success" ? "var(--color-success)" : "var(--color-error)", fontSize: "13px" }}>
                    {profileMsg.type === "success" && <IoCheckmarkCircle size={16} />}
                    {profileMsg.text}
                  </div>
                )}

                <button onClick={handleUpdateProfile} disabled={profileLoading}
                  style={{
                    padding: "10px 24px", borderRadius: "8px", fontWeight: 600, fontSize: "14px",
                    background: "var(--color-primary)", color: "#fff", cursor: profileLoading ? "not-allowed" : "pointer",
                    opacity: profileLoading ? 0.7 : 1, alignSelf: "flex-start", transition: "background 0.2s"
                  }}>
                  {profileLoading ? <FaRegCircle /> : "Save Changes"}
                </button>
              </div>
            )}

            {/* ── Password Tab ── */}
            {activeTab === "password" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-primary-dark)" }}>Change Password</h2>

                {(["currentPassword", "newPassword", "confirmNewPassword"] as const).map((field) => {
                  const labels = { currentPassword: "Current Password", newPassword: "New Password", confirmNewPassword: "Confirm New Password" };
                  const values = { currentPassword, newPassword, confirmNewPassword };
                  const setters = { currentPassword: setCurrentPassword, newPassword: setNewPassword, confirmNewPassword: setConfirmNewPassword };
                  return (
                    <div key={field} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary-dark)" }}>{labels[field]}</label>
                      <input type="password" value={values[field]} onChange={(e) => setters[field](e.target.value)}
                        placeholder={`Enter ${labels[field].toLowerCase()}`}
                        style={{
                          padding: "10px 12px", borderRadius: "8px", fontSize: "14px",
                          border: "1.5px solid var(--color-border)", outline: "none", color: "var(--color-text)"
                        }} />
                    </div>
                  );
                })}

                {passwordMsg && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: passwordMsg.type === "success" ? "var(--color-success)" : "var(--color-error)", fontSize: "13px" }}>
                    {passwordMsg.type === "success" && <IoCheckmarkCircle size={16} />}
                    {passwordMsg.text}
                  </div>
                )}

                <button onClick={handleChangePassword} disabled={passwordLoading}
                  style={{
                    padding: "10px 24px", borderRadius: "8px", fontWeight: 600, fontSize: "14px",
                    background: "var(--color-primary)", color: "#fff", cursor: passwordLoading ? "not-allowed" : "pointer",
                    opacity: passwordLoading ? 0.7 : 1, alignSelf: "flex-start"
                  }}>
                  {passwordLoading ? <FaRegCircle /> : "Update Password"}
                </button>
              </div>
            )}

            {/* ── Account Tab ── */}
            {activeTab === "account" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-primary-dark)" }}>Account</h2>

                {/* Logout */}
                <div style={{ padding: "16px", borderRadius: "10px", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--color-primary-dark)", fontSize: "14px" }}>Log Out</p>
                    <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Sign out of your account on this device</p>
                  </div>
                  <button onClick={handleLogout} disabled={logoutLoading}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                      background: "var(--color-primary)", color: "#fff", cursor: "pointer"
                    }}>
                    <IoLogOutOutline size={16} />
                    {logoutLoading ? "Logging out..." : "Log Out"}
                  </button>
                </div>

                {/* Danger zone */}
                <div style={{ padding: "16px", borderRadius: "10px", border: "1px solid var(--color-error)", background: "#fff5f5" }}>
                  <p style={{ fontWeight: 700, color: "var(--color-error)", fontSize: "14px", marginBottom: "4px" }}>Danger Zone</p>
                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "12px" }}>
                    Deleting your account is permanent and cannot be undone. All your health data will be lost.
                  </p>
                  <button style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                    background: "var(--color-error)", color: "#fff", cursor: "pointer"
                  }}>
                    <IoTrashOutline size={16} /> Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
