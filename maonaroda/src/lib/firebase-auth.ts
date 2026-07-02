import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { app } from "@/lib/firebase";

export function getClientAuth() {
  return getAuth(app);
}

export async function signUp(email: string, password: string) {
  const auth = getClientAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signIn(email: string, password: string) {
  const auth = getClientAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signOut() {
  const auth = getClientAuth();
  await firebaseSignOut(auth);
}
