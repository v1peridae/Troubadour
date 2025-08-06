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
    createLyric: async ({request, locals: { safeGetSession, supabase }}) => {
        const {session, user} = await safeGetSession();

        if (!session || !user) {
            console.error("Something went wrong with the session.");
            return fail(401, {error: "Session error."});
        }

        const formData = await request.formData();
        const title = formData.get("title");
        const artist = formData.get("artist");
        const lyricBody = formData.get("lyrics");
        const album_name = formData.get("album");
        const album_image_file = formData.get("album_image");
        if (album_image_file && album_image_file instanceof File) {
            if (album_image_file.size > 1048576) { return fail(401, {error: "File too large for database upload."}); }
            const {data, error} = await supabase.storage
                        .from("album-images/" + user.id)
                        .upload(album_image_file.name, album_image_file, {
                            cacheControl: '3600',
                            metadata: {
                                album_name: album_name
                            }
                        });
            if (error) {
                console.error("Error uploading file:", error.message)
                return fail(401, {error: error.message});
            } else {
                console.log("Data full path is " + data.fullPath);
            }
            const databaseUpdate = await supabase
            .from('lyrics')
            .insert(
                {
                    user_id: user.id,
                    title: title,
                    artist: artist,
                    album_name: album_name,
                    body: lyricBody,
                    album_url: `https://endmkbkcnxcufgnttobq.supabase.co/storage/v1/object/public/${data.fullPath}`
                }
            ) 
            if (databaseUpdate.error) {
                console.error("Error updating database:", databaseUpdate.error.message);
                return fail(401, {error: databaseUpdate.error.message});
            }
        } else {
            console.log("Something went wrong with the file upload - the server didn't recognize the upload as a file.")
        }
        throw redirect(303, "/dashboard");
        //console.log("album_image_file is of type ", typeof album_image_file);
        
        //console.log(album_image_file instanceof File);

        //console.log(`Form data:\nTitle: ${title}\nArtist: ${artist}\nLyrics: ${lyricBody}\nAlbum: ${album_name}`);
        //console.log("Album image data:\n", album_image_file);

        
    }
} satisfies Actions;