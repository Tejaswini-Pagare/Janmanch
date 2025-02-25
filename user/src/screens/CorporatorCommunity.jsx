import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PlusCircle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../actions/communityActions";
import CreatePostForm from "../components/Post/CreatePost";
import PostCard from "../components/cards/PostCard";
import { ToastContainer } from "react-toastify";

const CommunityPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { msgs, error, loading } = useSelector((state) => state.getAllMessageReducers);

  useEffect(() => {
    dispatch(getAllMessage());
  }, [dispatch]);

  const sortedMsgs = msgs ? [...msgs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-8 lg:px-16 py-8 flex gap-6">
        <div className="w-full max-h-screen overflow-y-auto custom-scrollbar">
          <div className="lg:w-2/3 m-auto">
            <div className="text-center my-5">
              <span className="text-3xl font-bold">Your Posts</span>
              <hr />
            </div>
            {loading && (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md shadow-md text-center">
                Error: Unable to fetch messages. Please try again later.
              </div>
            )}
            {sortedMsgs.length > 0 ? (
              <div className="space-y-4">
                {sortedMsgs.map((msg, index) => {
                  console.log("id od", index, "   :", msg._id);
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
                      editable={true}
                      onRefresh={() => dispatch(getAllMessage())}
                    />
                  );
                })}
              </div>
            ) : (
              !loading && !error && (
                <p className="text-gray-600 text-center">No posts yet. Create a post to get started!</p>
              )
            )}
          </div>
        </div>
        <button
          className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle size={28} />
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-70" />
            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="w-[90%] md:w-[40%] bg-white rounded-lg p-1 shadow-lg">
                <button
                  className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>
                <CreatePostForm setIsOpen={setIsOpen} />
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default CommunityPage;
