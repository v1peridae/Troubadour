// Functions to access Supabase database
import { createClient } from "@supabase/supabase-js";

const connectionString = "$env/"

const supabase = createClient()