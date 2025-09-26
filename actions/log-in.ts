'use server'

import { redirect } from "next/navigation";
import { createClientServer } from "../utils/supabase/server-client";

export const LogIn = async (formData: FormData) => {
    const userData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    const supabase = await createClientServer();
    const { data: {user}, error } = await supabase.auth.signInWithPassword(userData);
    console.log(user);
    if(user) redirect('/');
}
