import React, { useState } from "react";
import { ButtonBase, Tooltip, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Like Icons

function PostCard({ sentby, image, title, description, btnlikes, date }) {
    const [likes, setLikes] = useState(btnlikes || 0);
    const [liked, setLiked] = useState(false);
    const [showFull, setShowFull] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const theme = useTheme();

    // Format date
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

    // Check file type
    const fileExtension = image?.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension);
    const isPDF = fileExtension === "pdf";

    // Share functionality
    const sharePost = async () => {
        const postUrl = window.location.href;
        const shareMessage = `${title}\n\n${description}\n\nRead more: ${postUrl}`;
        const shareData = { title, text: shareMessage, url: postUrl };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            const encodedMessage = encodeURIComponent(shareMessage);
            const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodedMessage}`;

            window.open(telegramURL, "_blank") ||
                window.open(whatsappURL, "_blank") ||
                navigator.clipboard.writeText(postUrl);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow max-w-3xl mx-auto mb-5 shadow-slate-500 hover:shadow-slate-900 relative">
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
                            </div>
                        )}
                    </div>
                )}

                {/* Actions (Like + Share) */}
                <div className="flex items-center gap-3">
                    {/* Like Button */}
                    <ButtonBase
                        onClick={handleLike}
                        className="rounded-md bg-teal-500 p-2.5 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-1"
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
                        {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                        {likes}
                    </ButtonBase>

                    {/* Share Icon */}
                    <Tooltip title="Share">
                        <IconButton
                            onClick={sharePost}
                            sx={{
                                color: theme.palette.mode === "dark" ? "#1DA1F2" : "#0088CC",
                                "&:hover": {
                                    color: theme.palette.mode === "dark" ? "#0d72b9" : "#005d99",
                                },
                            }}
                        >
                            <FaTelegramPlane size={20} />
                        </IconButton>
                    </Tooltip>

                    {/* Toast Message */}
                    {copied && <span className="text-green-500 font-medium">Link copied!</span>}
                </div>

                {/* Open PDF or Image Buttons (Bottom-Right) */}
                {(isImage || isPDF) && (
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                        {isPDF && (
                            <a
                                href={`http://localhost:5000/Images/${image}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold bg-gray-200 p-1 rounded-md shadow-md"
                            >
                                Open PDF
                            </a>
                        )}
                        {isImage && (
                            <button
                                className="text-blue-600 font-bold bg-gray-200 p-1 rounded-md shadow-md"
                                onClick={handleImageClick}
                            >
                                Open Image
                            </button>
                        )}
                    </div>
                )}
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
