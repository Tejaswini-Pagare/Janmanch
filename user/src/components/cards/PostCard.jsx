import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaTelegramPlane, FaFilePdf } from "react-icons/fa";
import {toast} from "react-toastify";

import axios from "axios";

function PostCard({ id, sentby, image, title, description, btnlikes, date, editable, onRefresh }) {
    const [likes, setLikes] = useState(btnlikes || 0);
    const [liked, setLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const formattedDate = date ? new Date(date).toLocaleDateString("en-US") : "Unknown date";
    const MAX_LENGTH = 100;

    const handleLike = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/community/delete/${id}`);
            toast.success("Post deleted successfully");
            onRefresh();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`/api/community/edit/${id}`, { title: newTitle, description: newDescription });
            setIsEditModalOpen(false);
            onRefresh();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const fileExtension = image?.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";

    const openMediaModal = () => {
        setSelectedMedia(image);
        setIsMediaModalOpen(true);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow max-w-3xl mx-auto mb-5">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpZVBjdAgdJuJXrrGW-7EFgO4y2EN8xpslQ&s" alt="User" />
                <div className="flex-1">
                    <div className="font-medium text-gray-800">{sentby}</div>
                    <div className="text-xs text-gray-700">{formattedDate}</div>
                </div>
                {editable && (
                    <div className="text-right space-x-2">
                        <button onClick={() => setIsEditModalOpen(true)} className="text-blue-600 font-bold">Edit</button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="text-red-600 font-bold">Delete</button>
                    </div>
                )}
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold text-teal-700">{title}</h2>
            <p className="text-gray-700">
                {isExpanded || description.length <= MAX_LENGTH ? description : description.substring(0, MAX_LENGTH) + "..."}
            </p>
            {description.length > MAX_LENGTH && (
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 font-bold mt-2">
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}

            {/* Media */}
            {image && (
                <div className="relative mb-4 cursor-pointer" onClick={openMediaModal}>
                    {isImage && <img src={`http://localhost:5000/Images/${image}`} alt="Post media" className="object-cover h-72 w-full rounded-lg shadow-md" />}
                    {isPDF && (
                        <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-md">
                            <FaFilePdf size={40} className="text-red-600" />
                            <span className="text-gray-800 font-medium truncate w-3/4">{image}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
                <button onClick={handleLike} className="text-teal-500 font-bold flex items-center gap-1">
                    {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />} {likes}
                </button>
                <button className="text-blue-600 font-bold flex items-center gap-1">
                    <FaTelegramPlane size={20} /> Share
                </button>
            </div>

            {/* Media Modal */}
            {/* Media Modal */}
<Transition show={isMediaModalOpen} as={Fragment}>
    <Dialog onClose={() => setIsMediaModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-[90vw] h-[90vh] relative flex justify-center items-center">
            <button onClick={() => setIsMediaModalOpen(false)} className="absolute top-3 right-3 text-gray-600 text-2xl font-bold">✖</button>
            
            {selectedMedia && isImage && (
                <img src={`http://localhost:5000/Images/${selectedMedia}`} alt="Preview" className="max-w-full max-h-full rounded-lg" />
            )}

            {selectedMedia && isPDF && (
                <iframe src={`http://localhost:5000/Images/${selectedMedia}`} className="w-full h-full rounded-lg" title="PDF Preview"></iframe>
            )}
        </Dialog.Panel>
    </Dialog>
</Transition>


            {/* Edit Modal */}
            <Transition show={isEditModalOpen} as={Fragment}>
                <Dialog onClose={() => setIsEditModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit Post</h2>
                        <input className="border p-2 w-full mb-3" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        <textarea className="border p-2 w-full" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Transition>

            {/* Delete Modal */}
            <Transition show={isDeleteModalOpen} as={Fragment}>
                <Dialog onClose={() => setIsDeleteModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </div>
    );
}

export default PostCard;
