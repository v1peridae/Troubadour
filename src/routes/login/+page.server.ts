import { supabase } from "$lib/server/supabaseClient";

export async function load() {

}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData;
        supabase.auth.signInWithPassword
    }
}