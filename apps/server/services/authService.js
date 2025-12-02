const supabase = require("../config/supabase");

const register = async (username, email, password) => {
  // 1. Daftar ke Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, // Disimpan di metadata, lalu dicopy Trigger ke public.users
        role: "user",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data.user;
};

const verifyEmail = async (email, token) => {
  // 2. Verifikasi OTP/Token
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "signup",
  });

  if (error) throw new Error(error.message);

  return { message: "Email verified successfully", session: data.session };
};

const login = async (email, password) => {
  // 3. Login ke Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // 4. Ambil Role dari tabel public.users
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role, username")
    .eq("id", data.user.id)
    .single();

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
      username: userData?.username,
      role: userData?.role || "user",
    },
    token: data.session.access_token,
  };
};

const upgradeToOwner = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .update({ role: "owner" })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
  register,
  login,
  verifyEmail,
  upgradeToOwner,
};
