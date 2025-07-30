import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({url, locals: { safeGetSession }}) => {
    const {session, user} = await safeGetSession();

    if (session && user) {
        throw redirect(303, '/dashboard')
    }

    return {url: url.origin};
}

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password")

        // Server-side validation
        if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
            return fail(400, {error: "Invalid login details."});
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error(error);
            return fail(401, { error: error.message });
        }

        throw redirect(303, "/dashboard");
    }
}