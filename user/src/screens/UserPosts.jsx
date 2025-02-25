import React, { useEffect } from "react";
import PostCard from "../components/cards/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../actions/communityActions";

function UserPosts({ corporator }) {
  const dispatch = useDispatch();
  const { msgs, error, loading } = useSelector((state) => state.getAllMessageReducers);

  useEffect(() => {
    dispatch(getAllMessage());
    
  }, [dispatch]);


  const sortedMsgs = msgs ? [...msgs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  return (
    <div className="lg:w-2/3 m-auto">
      <div className="text-center my-5">
        <span className="text-3xl font-bold">Your Posts</span>
        <hr />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p>Error: Unable to fetch messages. Please try again later.</p>}
      {sortedMsgs.length > 0 ? (
        <div className="space-y-4">
          {sortedMsgs.map((msg, index) => {
            {sortedMsgs.map((msg, index) => {
              // console.log(`Rendering PostCard ${index}:`, msg._id); // Debugging each post
              
              return (
                  
                  <PostCard
                      key={msg._id} // Use index if `_id` is missing
                      id={msg._id} // Debug `_id`
                      sentby={msg?.sentby}
                      image={msg?.image}
                      title={msg?.title}
                      description={msg?.description}
                      btnlikes={msg?.btnlikes}
                      date={msg?.createdAt}
                      editable={false}
                      onRefresh={() => dispatch(getAllMessage())}
                  />
              );
          })} // Debugging each post
            return (
              <PostCard
                key={msg?._id || index} // Use index if `_id` is missing
                id={msg?._id} // Debug `_id`
                sentby={msg?.sentby}
                image={msg?.image}
                title={msg?.title}
                description={msg?.description}
                btnlikes={msg?.btnlikes}
                date={msg?.createdAt}
                editable={false}
                onRefresh={() => dispatch(getAllMessage())}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No posts yet. Create a post to get started!</p>
      )}
    </div>
  );
}

export default UserPosts;
