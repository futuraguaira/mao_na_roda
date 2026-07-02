import { getProviders } from "@/lib/firebase-service";
import ProviderProfile from "./ProviderProfile";

export async function generateStaticParams() {
  try {
    const providers = await getProviders();
    return providers.map((p) => ({ id: p.id! }));
  } catch {
    return [];
  }
}

export default function PrestadorPage() {
  return <ProviderProfile />;
}
