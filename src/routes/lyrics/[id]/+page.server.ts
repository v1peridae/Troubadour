import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

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