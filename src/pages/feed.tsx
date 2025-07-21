import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/comments";
import Loader from "../components/loader";
import NavBar from "../components/NavBar";


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
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-900">
            <Loader />
        </div>
    );

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
        <div className="min-h-screen bg-neutral-900 text-neutral-100">
            <NavBar />
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-28 md:py-32 space-y-8">
                {feeds.length === 0 && (
                    <p className="text-center text-neutral-400">No Post Yet</p>
                )}

                {feeds.map((feed) => (
                    <article
                        key={feed.id}
                        className="bg-neutral-800 border border-neutral-700 shadow-lg rounded-2xl p-5 sm:p-6 space-y-4 transition-all duration-200 hover:shadow-2xl"
                    >
                        <header className="flex items-center gap-3">
                            <img
                                src={feed.user.avatarUrl || "/default-avatar.png"}
                                alt="avatar"
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-neutral-600"
                            />
                            <div>
                                <p className="font-semibold text-sm sm:text-base">{feed.user.username}</p>
                                <time className="text-xs text-neutral-400" dateTime={feed.createdAt}>
                                    {new Date(feed.createdAt).toLocaleString()}
                                </time>
                            </div>
                        </header>

                        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-neutral-200">
                            {feed.content}
                        </p>

                        {feed.mediaUrl && (
                            <div className="w-full max-h-[60vh] overflow-hidden rounded-xl">
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
                            <button
                                onClick={() => handleLike(feed.id)}
                                className="flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-500 hover:scale-105 transition-transform"
                            >
                                {feed.like.some((l) => l.userId === currentUserId) ? "❤️" : "🤍"}
                                <span>{feed.like.length}</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment…"
                                className="w-full rounded-lg border border-neutral-700 px-3 py-2 text-sm bg-neutral-700 text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                onClick={() => handleComment(feed.id)}
                                disabled={posting}
                                className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
                            >
                                {posting ? "Posting…" : "Post"}
                            </button>
                        </div>

                        <CommentSection postId={feed.id} />
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Feed;
