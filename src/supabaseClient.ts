import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jcycqenmrerkshjqxqgw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjeWNxZW5tcmVya3NoanF4cWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MDc1NzksImV4cCI6MjA1MjE4MzU3OX0.btsn2TNKkUI2x3e6Lvlrz1F2d4jsMW1xUMrNadsPMWs';

export const supabase = createClient(supabaseUrl, supabaseKey);
