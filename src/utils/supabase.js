import {creatClient, createClient} from '@supabase/supabase-js';
import { Import } from 'lucide-react';

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);