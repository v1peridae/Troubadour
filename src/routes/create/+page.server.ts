import { fail, redirect } from "@sveltejs/kit"

import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
    // Get the supabase client from the server hook
    const {session, user} = await safeGetSession();

    if (!session || !user) {
        throw redirect(303, "/login");
    }

    const username = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id);

    console.log(username, ' is logged in');

    return { user, username };
}

export const actions: Actions = {
    signout: async ({request, locals: { supabase }}) => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error(error);
            return fail(401, {error: error.message});
        }
        throw redirect(303, "/login");
    },
    createLyric: async ({request, locals: { supabase }}) => {
        const formData = await request.formData();
        const title = formData.get("title");
        const artist = formData.get("artist");
        const lyricBody = formData.get("lyrics");
        const album_name = formData.get("album");
        const album_image = formData.get("album_image");
        
        console.log(`Form data:\nTitle: ${title}\nArtist: ${artist}\nLyrics: ${lyricBody}\nAlbum: ${album_name}`);
        console.log("Album image data:\n", album_image);
    }
} satisfies Actions;