import React, { useState } from "react";
import axios from "axios";

const CreatePostForm = ({ setPosts }) => {
  const [newPost, setNewPost] = useState({ title: "", description: "", file: null });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewPost((prevPost) => ({ ...prevPost, file: e.target.files[0] }));
  };

  // Handle form submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);
    if (newPost.file) {
      formData.append("file", newPost.file);
    }

    try {
      const response = await axios.post("/api/community/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      setNewPost({ title: "", description: "", file: null });

      // Ensure setPosts is a function before calling it
      if (typeof setPosts === "function") {
        setPosts((prevPosts) => [response.data.post, ...prevPosts]);
      }

      // Reload the page after submission
      window.location.reload();
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
        Create New Post
      </h2>
      <form onSubmit={handlePostSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm text-gray-700 dark:text-gray-400 font-medium mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Enter post title"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm text-gray-700 dark:text-gray-400 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
            placeholder="Enter post description"
            rows="4"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm text-gray-700 dark:text-gray-400 font-medium mb-2">
            Choose a File (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-shadow shadow-lg hover:shadow-xl"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
