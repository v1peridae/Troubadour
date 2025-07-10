import { supabase } from "$lib/server/supabaseClient";

export async function load() {

}

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password")

        // Server-side validation
        if (email == "" || password == "") {
            throw new Error("Form requires valid email and password fields.")
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: typeof email === "string" ? email : "fucker@fuckyou.com",
            password: typeof password === "string" ? password : "fuck"
        })
    }
}