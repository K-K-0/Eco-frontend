import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaCommentDots } from "react-icons/fa";
import { motion } from "framer-motion";

interface FeedItem {
    id: string;
    image: string;
    caption: string;
    createdAt: string;
    user: {
        id: string;
        username: string;
        avatarUrl?: string;
    };
    like: { userId: string }[];
    comments: { id: string; content: string }[];
}

const Feed = ({ currentUserId }: { currentUserId: string }) => {
    const [feeds, setFeeds] = useState<FeedItem[]>([]);
    const [comment, setComment] = useState("");
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/posts`, {
                    withCredentials: true,
                });
                setFeeds(res.data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeeds();
    }, [BASE_URL]);

    const handleLike = async (postId: string) => {
        try {
            await axios.post(`${BASE_URL}/api/posts/${postId}/like`, {}, { withCredentials: true });
            setFeeds((prev) =>
                prev.map((feed) =>
                    feed.id === postId
                        ? {
                            ...feed,
                            like: feed.like.some((l) => l.userId === currentUserId)
                                ? feed.like.filter((l) => l.userId !== currentUserId)
                                : [...feed.like, { userId: currentUserId }],
                        }
                        : feed
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleComment = async (postId: string) => {
        try {
            await axios.post(
                `${BASE_URL}/api/posts/${postId}/comment`,
                { content: comment },
                { withCredentials: true }
            );
            setComment("");
            setSelectedPostId(postId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="px-4 py-6 max-w-xl mx-auto space-y-6">
            {feeds.map((feed) => (
                <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#1a1a1a] rounded-2xl shadow-md p-4 border border-neutral-800 text-white"
                >
                    {/* Header */}
                    <header className="flex items-center gap-3">
                        <div className="relative">
                            <img
                                src={feed.user.avatarUrl || "/default-avatar.png"}
                                alt="avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-purple-500 object-cover"
                            />
                            <span className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-full text-[10px] px-[4px] py-[2px] font-bold">
                                ✓
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-sm sm:text-base">{feed.user.username}</p>
                            <time className="text-xs text-neutral-400" dateTime={feed.createdAt}>
                                {new Date(feed.createdAt).toLocaleString()}
                            </time>
                        </div>
                    </header>

                    {/* Post Image */}
                    {feed.image && (
                        <div className="my-3 rounded-xl overflow-hidden">
                            <motion.img
                                src={feed.image}
                                alt="post"
                                className="w-full object-cover max-h-96"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    )}

                    {/* Caption */}
                    <p className="text-sm sm:text-base">{feed.caption}</p>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                        {/* Like */}
                        <motion.button
                            onClick={() => handleLike(feed.id)}
                            className="flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-500"
                            whileTap={{ scale: 1.2 }}
                        >
                            {feed.like.some((l) => l.userId === currentUserId) ? <FaHeart /> : <FaRegHeart />}
                            <span>{feed.like.length}</span>
                        </motion.button>

                        {/* Comment Count */}
                        <div className="flex items-center gap-2 text-neutral-400 text-sm">
                            <FaCommentDots />
                            <span>{feed.comments.length} comments</span>
                        </div>
                    </div>

                    {/* Comment Input */}
                    <div className="mt-3">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-sm bg-neutral-900 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={() => handleComment(feed.id)}
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm float-right transition-all duration-200"
                        >
                            Post
                        </button>
                    </div>

                    {/* Display Comments */}
                    <div className="mt-4 space-y-1">
                        {selectedPostId === feed.id
                            ? feed.comments.map((c) => (
                                <p key={c.id} className="text-sm text-neutral-300 border-l-2 border-green-500 pl-2">
                                    • {c.content}
                                </p>
                            ))
                            : null}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Feed;
