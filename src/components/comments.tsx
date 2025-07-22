import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react"; // GenZ-style icon

const CommentSection = ({ postId }: { postId: string }) => {
    const [newComments, setNewComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            if (!postId) return;

            try {
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${BASE_URL}/api/posts/${postId}/comment`, {
                    withCredentials: true
                });
                setNewComments(res.data.comment);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComment();
    }, [postId]);

    return (
        <div className="mt-4 ml-4 mr-4 p-4 bg-[#111] rounded-xl border border-[#222] shadow-sm text-white max-w-xl">
            <div className="flex items-center gap-2 mb-3 text-lime-400">
                <MessageCircle size={18} />
                <h2 className="text-sm font-medium">Comments</h2>
            </div>

            {newComments.length === 0 ? (
                <p className="text-sm text-gray-400">No comments yet. Be the first to speak 👀</p>
            ) : (
                <div className="space-y-3">
                    {newComments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="text-sm bg-[#1a1a1a] p-3 rounded-md border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
                        >
                            <span className="text-lime-300">•</span> {comment.content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
