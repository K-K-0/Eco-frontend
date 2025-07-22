import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/comments";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";


type CommentType = {
    id: string;
    content: string;
    createdAt: string;
    user: {
        username: string;
        avatarUrl?: string;
    };
};

type Like = {
    userId: string;
    postId: string;
};

type FeedType = {
    id: string;
    content: string;
    mediaUrl?: string;
    createdAt: string;
    user: {
        username: string;
        avatarUrl?: string;
    };
    like: Like[];
    comments: CommentType[];
};

const Feed = () => {
    const [feeds, setFeeds] = useState<FeedType[]>([]);

    const auth = useAuth();
    const user = auth?.user;
    const currentUserId = user?.id;
    const [comment, setComment] = useState("");
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${BASE_URL}/`, { withCredentials: true });
                setFeeds(Array.isArray(res.data.feeds) ? res.data.feeds : res.data || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFeed();
    }, []);

    const handleLike = async (postId: string) => {
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.post(`${BASE_URL}/api/posts/${postId}/like`, {}, { withCredentials: true });

            setFeeds((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        const alreadyLiked = post.like.some((l) => l.userId === currentUserId);
                        const updatedLikes = alreadyLiked
                            ? post.like.filter((l) => l.userId !== currentUserId)
                            : [...post.like, { userId: currentUserId!, postId }];
                        return { ...post, like: updatedLikes };
                    }
                    return post;
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async (postId: string) => {
        if (!comment.trim()) return;
        try {
            setPosting(true);
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.post(
                `${BASE_URL}/api/posts/${postId}/comment`,
                { postId, content: comment },
                { withCredentials: true }
            );
            setComment("");
        } catch (error) {
            console.log("error while commenting", error);
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <NavBar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-28 md:py-32 space-y-10">
                {feeds.length === 0 && (
                    <p className="text-center text-neutral-500">No Post Yet</p>
                )}

                {feeds.map((feed) => (
                    <motion.article
                        key={feed.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 space-y-5"
                    >
                        <header className="flex items-center gap-4">
                            <img
                                src={feed.user.avatarUrl || "/default-avatar.png"}
                                alt="avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-700"
                            />
                            <div>
                                <p className="font-semibold text-sm sm:text-base">{feed.user.username}</p>
                                <time className="text-xs text-neutral-500" dateTime={feed.createdAt}>
                                    {new Date(feed.createdAt).toLocaleString()}
                                </time>
                            </div>
                        </header>

                        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-neutral-300">
                            {feed.content}
                        </p>

                        {feed.mediaUrl && (
                            <div className="w-full max-h-[60vh] overflow-hidden rounded-xl border border-neutral-800">
                                {feed.mediaUrl.endsWith(".mp4") ? (
                                    <video controls src={feed.mediaUrl} className="w-full h-full object-contain rounded-xl" />
                                ) : feed.mediaUrl.endsWith(".svg") ? (
                                    <object data={feed.mediaUrl} type="image/svg+xml" className="w-full h-full object-contain rounded-xl" />
                                ) : (
                                    <img src={feed.mediaUrl} alt="Post visual" className="w-full h-full object-cover rounded-xl" />
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4 pt-2">
                            <motion.button
                                whileTap={{ scale: 1.2 }}
                                onClick={() => handleLike(feed.id)}
                                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-sm"
                            >
                                {feed.like.some((l) => l.userId === currentUserId) ? (
                                    <Heart fill="currentColor" className="w-5 h-5" />
                                ) : (
                                    <HeartCrack className="w-5 h-5" />
                                )}
                                <span>{feed.like.length}</span>
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Say something..."
                                className="w-full rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                onClick={() => handleComment(feed.id)}
                                disabled={posting}
                                className="bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-xl transition-all"
                            >
                                {posting ? "Posting…" : "Post"}
                            </button>
                        </div>

                        <CommentSection postId={feed.id} />
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default Feed;
