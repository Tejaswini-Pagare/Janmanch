import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PlusCircle, X } from "lucide-react"; // Icons
import CreatePostForm from "../components/Post/CreatePost"; // Import CreatePostForm
import UserPosts from "./UserPosts"; // Import UserPosts

const CommunityPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Content Wrapper */}
      <div className="container mx-auto px-8 lg:px-16 py-8 flex gap-6">

        {/* Scrollable Right Section (100% Width) */}
        <div className="w-full max-h-screen overflow-y-auto custom-scrollbar">
          <UserPosts />
        </div>

        {/* Floating Button to Open Modal */}
        <button
          className="fixed bottom-6 left-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle size={28} />
        </button>

        {/* Create Post Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="fixed inset-0 flex items-center justify-center">
              <Dialog.Panel className="w-[90%] md:w-[40%] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                {/* Close Button (Top-Right) */}
                <button
                  className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>

                {/* Modal Content */}
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
