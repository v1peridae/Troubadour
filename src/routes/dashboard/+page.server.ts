import { redirect } from "@sveltejs/kit"

import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types"

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
    // Get the supabase client from the server hook
    const {session, user} = await safeGetSession();

    if (!session || !user) {
        throw redirect(303, "/login");
    }

    const { data, error } = await supabase
    .from('lyrics')
    .select('*')
    .eq('user_id', user.id);

    if (error) throw error;

    return { lyrics: data, user };
}