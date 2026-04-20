const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_KEY_AQUI';

// A instância global do Supabase ficará disponível para todas as páginas
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
