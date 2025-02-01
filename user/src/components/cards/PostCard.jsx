import React, { useState } from "react";
import { ButtonBase } from "@mui/material";
import PropTypes from "prop-types";

function PostCard({ sentby, image, title, description, btnlikes, date }) {
    const [likes, setLikes] = useState(btnlikes || 0);
    const [liked, setLiked] = useState(false);
    const [showFull, setShowFull] = useState(false); // Read More state
    const [isModalOpen, setIsModalOpen] = useState(false); // Image modal state

    // Format the date
    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "Unknown date";

    const handleLike = () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const truncatedDesc = description?.length > 100 ? description.slice(0, 100) + "..." : description;

    const handleImageClick = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Check file type (image or PDF)
    const fileExtension = image?.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow max-w-3xl mx-auto mb-5 shadow-slate-500 hover:shadow-slate-900">
                {/* Sender Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlpZVBjdAgdJuJXrrGW-7EFgO4y2EN8xpslQ&s"
                        alt="Corporator"
                    />
                    <div>
                        <div className="font-medium text-gray-800">{sentby}</div>
                        <div className="text-xs text-gray-700">{formattedDate}</div>
                    </div>
                </div>

                <hr className="border-gray-300 dark:border-gray-700 mb-4" />

                {/* Post Title */}
                <h2 className="text-xl font-bold mb-2 text-teal-700">{title}</h2>

                {/* Description */}
                {description && (
                    <p className="text-gray-700 mb-4">
                        {showFull ? description : truncatedDesc}
                        {description.length > 100 && (
                            <span
                                className="text-slate-950 font-bold cursor-pointer"
                                onClick={() => setShowFull(!showFull)}
                            >
                                {showFull ? " Show Less" : " Read More"}
                            </span>
                        )}
                    </p>
                )}

                {/* Media Preview */}
                {image && (
                    <div className="relative mb-4 cursor-pointer overflow-hidden rounded-lg">
                        {isImage && (
                            <img
                                src={`http://localhost:5000/Images/${image}`}
                                alt="Post media"
                                className="object-cover h-72 w-full"
                                onClick={handleImageClick}
                                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                            />
                        )}

                        {isPDF && (
                            <div className="bg-gray-200 p-2 h-80 text-center rounded-lg">
                                <embed
                                    src={`http://localhost:5000/Images/${image}`}
                                    type="application/pdf"
                                    width="100%"
                                    height="400px"
                                    className="rounded-lg"
                                />
                                <a
                                    href={`http://localhost:5000/Images/${image}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-bold"
                                >
                                    Open PDF in new tab
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Like Button */}
                <div className="flex items-center">
                    <ButtonBase
                        onClick={handleLike}
                        className="rounded-md bg-teal-500 p-2.5 text-white shadow-md hover:shadow-lg focus:bg-teal-600 transition-all"
                        sx={{
                            padding: "8px",
                            backgroundColor: liked ? "darkslategray" : "teal",
                            color: "white",
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: liked ? "darkslategray" : "darkcyan",
                            },
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </ButtonBase>
                    <span className="ml-2 text-teal-700 font-medium">{likes} Likes</span>
                </div>
            </div>

            {/* Modal for Full-Size Image */}
            {isImage && isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <img
                        src={`http://localhost:5000/Images/${image}`}
                        alt="Full-size Post media"
                        className="max-w-full max-h-full"
                    />
                </div>
            )}
        </>
    );
}

PostCard.propTypes = {
    sentby: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    btnlikes: PropTypes.number,
    date: PropTypes.string,
};

export default PostCard;
