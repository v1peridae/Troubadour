import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types"
import type { Actions } from "./$types";


export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
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
        throw redirect(200, "/login")
    }
}