import React from "react";
import PostCard from "../cards/PostCard";
const UserPosts = ({ posts }) => {
  return (
    <div className="lg:w-2/3">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Your Posts
      </h2>
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No posts yet. Create a post to get started!
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
