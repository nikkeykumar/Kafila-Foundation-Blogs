import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/blogs",
  withCredentials: true, // Include cookies in requests
});

export const getAllBlogs = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await api.get(`/${slug}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const adminGetAllBlogs = async () => {
  try {
    const response = await api.get("/admin");
    return response.data;
  } catch (error) {
     console.error("Error fetching blogs:", error);
     throw error;
  }
}

export const createBlog = async (blogData) => {
  try {
    console.log(blogData);
    const response = await api.post("/create", blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
   console.error("Error fetching blogs:", error);
   throw error; 
  }
}

 export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export const updateBlog = async (id, blogData) => {
  try {
    const response = await api.put(`/${id}`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
    }

export const getsingleBlog = async (id) => {
  try {
    const response = await api.get(`/single/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};