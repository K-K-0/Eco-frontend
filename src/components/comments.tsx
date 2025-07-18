import { useEffect, useState } from "react";
import axios from "axios";

const CommentSection = ({ postId }: { postId: string }) => {
    const [newComments, setNewComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            if (!postId) return;

            try {
                const BASE_URL = import.meta.env.VITE_BACKEND_URL
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
        <div className="mt-2 ml-10 space-y-2">
            {newComments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
                newComments.map((comment: any) => (
                    <div key={comment.id} className="text-sm text-gray-800">
                        • {comment.content}
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentSection;
