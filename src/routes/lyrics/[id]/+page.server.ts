import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({params, locals: { supabase, safeGetSession } }) => {
    const {session, user} = await safeGetSession();

    if (!session || !user) {
        throw redirect(303, "/login");
    }

    const { data, error } = await supabase
        .from("lyrics")
        .select('*')
        .eq('id', params.id);

    console.log(data);

    if (error) throw error;

    const username = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id);

    console.log(username)
    if (username.error) throw error;

    const annotations = (await supabase
        .from('annotations')
        .select('*')
        .eq('song_id', params.id)
    )

    console.log(annotations);
    if (annotations.error) throw error;

    return { lyrics: data, annotations: annotations.data, user, username}
}

export const actions: Actions = {
    annotate: async ({ request, locals: { safeGetSession, supabase }}) => {
        const { session, user } = await safeGetSession();

        if (!session || !user) {
            console.error("Something went wrong with the session.");
            return fail(401, {error: "Session error."});
        }

        const formData = await request.formData();
        const annotation = formData.get("annotation");
        const startIndex = formData.get("start_index");
        const endIndex = formData.get("end_index");
        const songId = formData.get("song_id");

        const { data, error } = await supabase
            .from('annotations')
            .insert(
                {
                    song_id: songId,
                    user_id: user.id,
                    body: annotation,
                    start_index: startIndex,
                    end_index: endIndex
                }
            )
        if (error) { 
            console.error(error);
            return fail(401, {error: error.message}); 
        }
    }
}