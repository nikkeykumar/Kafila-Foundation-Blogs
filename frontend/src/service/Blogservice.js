import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/blogs`,
});

// 🔥 interceptor (MOST IMPORTANT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Public APIs
export const getAllBlogs = async () => {
  const res = await api.get("/");
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/${slug}`);
  return res.data;
};

// 🔐 Admin API
export const adminGetAllBlogs = async () => {
  const res = await api.get("/admin");
  return res.data;
};

// 🔐 Create
export const createBlog = async (blogData) => {
  const res = await api.post("/create", blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 🔐 Delete
export const deleteBlog = async (id) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

// 🔐 Update
export const updateBlog = async (id, blogData) => {
  const res = await api.put(`/${id}`, blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ Single
export const getsingleBlog = async (id) => {
  const res = await api.get(`/single/${id}`);
  return res.data;
};
