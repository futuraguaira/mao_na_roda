import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ProviderRecord = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  addressComplement: string;
  services: string[];
  service?: string;
  radius: string;
  availability: string;
  notes: string;
  acceptedTerms: boolean;
  consentDate: string;
  ownerId: string;
  createdAt: string;
};

export async function getProviders() {
  const q = query(collection(db, "providers"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ProviderRecord));
}

export async function createProvider(data: Omit<ProviderRecord, "createdAt" | "id">) {
  const payload = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  const ref = await addDoc(collection(db, "providers"), payload);
  return { id: ref.id, ...payload };
}
