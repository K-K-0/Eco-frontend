import React, { useState } from "react";
import { createPost } from "../api/auth";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleMediaChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content || !media) return alert("All fields required");

        const formData = new FormData();
        formData.append("content", content);
        formData.append("media", media);
        formData.append("title", title);

        try {
            setLoading(true);
            await createPost(formData);
            alert("Post created");
            setTitle("");
            setContent("");
            setMedia(null);
            setPreview(null);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-neutral-100">
            <NavBar />

            <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-32 lg:pb-20 max-w-2xl md:max-w-2xl lg:max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-neutral-900 border border-neutral-700 shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-lime-400 tracking-tight">
                        Drop Your Eco Vibes
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your post a bold title..."
                            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 text-lg placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Talk about your green deed… 🌱"
                            className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 text-lg placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                            rows={5}
                        />

                        <div className="flex flex-col items-center gap-5">
                            <label
                                htmlFor="media-input"
                                className="cursor-pointer w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-600 px-6 py-10 hover:bg-neutral-800 transition-colors"
                            >
                                <PlusCircle className="text-lime-400 w-10 h-10 mb-3" />
                                <span className="text-base font-medium text-center text-neutral-300">
                                    {media ? media.name : "Tap or drag to add image / video"}
                                </span>
                                <input
                                    id="media-input"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleMediaChanges}
                                    className="hidden"
                                />
                            </label>

                            {preview && (
                                <div className="w-full max-h-80 overflow-hidden rounded-xl shadow border border-neutral-700">
                                    {media?.type.startsWith("video") ? (
                                        <video src={preview} controls className="w-full h-full object-contain" />
                                    ) : (
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                    )}
                                </div>
                            )}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto sm:ml-auto block bg-lime-400 hover:bg-lime-500 disabled:opacity-60 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg transition"
                        >
                            {loading ? "Posting…" : "Send it 🌍"}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreatePost;
