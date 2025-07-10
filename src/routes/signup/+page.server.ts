import { supabase } from "$lib/server/supabaseClient";

export async function load() {
    // uhh i have no idea whether i need to use this
}

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            return { error: "Email and password are required." };
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        // Update actual users table
        const { error: updateError } = await supabase
            .from("users")
            .update({ username: typeof username === "string" ? username : ""})
            .eq('id', data.user ? data.user.id : "0");

        console.log(supabase.auth.getUser());
    }
}