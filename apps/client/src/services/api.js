const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getKosList = async () => {
  const response = await fetch(`${BASE_URL}/kos`);
  if (!response.ok) {
    throw new Error("Failed to fetch kos list");
  }
  return response.json();
};

export const getKosBySlug = async (slug) => {
  const response = await fetch(`${BASE_URL}/kos/${slug}`);
  if (!response.ok) {
    throw new Error("Failed to fetch kos detail");
  }
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const register = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Register failed");
  }

  return data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createKos = async (data) => {
  const response = await fetch(`${BASE_URL}/kos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create kos");
  return response.json();
};

export const updateKos = async (slug, data) => {
  const response = await fetch(`${BASE_URL}/kos/${slug}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update kos");
  return response.json();
};

export const deleteKos = async (slug) => {
  const response = await fetch(`${BASE_URL}/kos/${slug}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete kos");
  return response.json();
};
