import { redirect, fail } from "@sveltejs/kit";

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

        if (error) {
            console.error(error.message);
            return fail(400, {error: error.message});
        }

        // Update actual users table
        const { error: updateError } = await supabase
            .from("users")
            .insert({ 
                id: data.user?.id,
                username: typeof username === "string" ? username : ""
            });

        if (updateError) {
            console.error(updateError.message);
            return fail(400, {error: updateError.message});
        }

        //console.log(supabase.auth.getUser());
        throw redirect(303, "/login")
    }
}