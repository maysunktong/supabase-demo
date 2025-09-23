import { createServerClient } from "@supabase/ssr";
import { Database } from "./database.types";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          try {
            return cookieStore.getAll();
          } catch (err) {
            console.error("Failed to get cookies:", err);
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.error("Failed to SET cookies:", error);
          }
        },
      },
    }
  );
};
