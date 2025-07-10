import { supabase } from "$lib/server/supabaseClient";

export async function load() {
    const data = await supabase.from("")

}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData;

    }
}