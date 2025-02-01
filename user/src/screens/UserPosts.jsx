import React, { useEffect, useState } from "react";
import PostCard from "../components/cards/PostCard"; 
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../actions/communityActions";

function UserPosts() {
  const dispatch = useDispatch();

  const { msgs, error, loading } = useSelector((state) => state.getAllMessageReducers);

  useEffect(() => {
      dispatch(getAllMessage());
  }, [dispatch]);

  // Sort messages by date (newest to oldest)
  const sortedMsgs = msgs ? [...msgs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  return (
    
      <div className="lg:w-2/3 m-auto">
        {/* Caption and Description */}
        <div className="flex justify-center items-center h-auto w-full mb-6">
          <div className="relative cursor-pointer  max-w-4xl w-full">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg "></span>
            <div className="relative p-6 bg-white border-2 border-indigo-500  rounded-lg hover:scale-105 transition duration-500">
              <div className="flex items-center justify-center">
                <span className="text-xl">📲</span>
                <h3 className="my-2 ml-3 text-lg font-bold text-gray-800  ">
                  Stay Informed, Get Notified!✨
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-700">
                Receive real-time updates from your corporator and stay connected with the latest developments in your community. Your voice matters — engage with the content and stay in the loop!
              </p>
            </div>
          </div>
        </div>

          <div className="text-center my-5">
              <span className="text-3xl font-bold">
                  Your Posts
              </span>
              <hr />
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p>Error: Unable to fetch messages. Please try again later.</p>}
          {sortedMsgs.length > 0 ? (
              <div className="space-y-4">
                  {sortedMsgs.map((msg) => (
                      <div key={msg._id}>
                          <PostCard
                              sentby={msg.sentby}
                              image={msg.image}
                              title={msg.title}
                              description={msg.description}
                              likes={msg.likes}
                              date={msg.createdAt} // Pass the date here
                          />
                      </div>
                  ))}
              </div>
          ) : (
              <p className="text-gray-600 dark:text-gray-300">
                  No posts yet. Create a post to get started!
              </p>
          )}
      </div>
  );
}

export default UserPosts;
