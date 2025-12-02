-- 1. Hapus constraint lama (karena tipe data ID berubah)
ALTER TABLE kos DROP CONSTRAINT IF EXISTS kos_owner_id_fkey;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

-- 2. Hapus tabel users lama (PERINGATAN: Data user lama akan hilang)
DROP TABLE IF EXISTS users;

-- 3. Buat tabel users baru yang terhubung dengan Supabase Auth
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Buat Trigger Otomatis
-- Setiap kali user daftar di Supabase Auth, otomatis buat data di public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'username', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Update tabel Kos dan Reviews agar support UUID
ALTER TABLE kos 
  ALTER COLUMN owner_id TYPE UUID USING NULL, -- Reset jadi NULL
  ADD CONSTRAINT kos_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id);

ALTER TABLE reviews 
  ALTER COLUMN user_id TYPE UUID USING NULL, -- Reset jadi NULL
  ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
