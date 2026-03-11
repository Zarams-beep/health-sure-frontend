/**
 * useAuth — simple hook that reads auth state from Redux.
 * PersistGate in MainWrapper already blocks rendering until rehydration is complete,
 * so we don't need to manually track _persist.rehydrated here.
 */
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  return {
    token: auth.token,
    userId: auth.id,
    fullName: auth.fullName,
    email: auth.email,
    image: auth.image,
    ready: !!auth.token,
  };
}
