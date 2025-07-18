import React, { useState } from "react";
import { createPost } from "../api/auth";
import NavBar from "../components/NavBar";


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
            setLoading(false);
        }
    };

    
    return (
        <div className="min-h-screen bg-gradient-to-b from-lime-50 to-sky-50 dark:from-neutral-800 dark:to-neutral-900 text-neutral-800 dark:text-neutral-100">
            <NavBar />

            
            <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-32 lg:pb-20 max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
                <div className="bg-white dark:bg-neutral-800 shadow-lg lg:shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 text-green-700 dark:text-lime-300">
                        Create Eco‑Post
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 md:space-y-10">
                        
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        {/* Content */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your eco‑friendly action…"
                            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-700 px-4 py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                            rows={5}
                        />

                        
                        <div className="flex flex-col items-center gap-4 sm:gap-5">
                            <label
                                htmlFor="media-input"
                                className="cursor-pointer w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-400/70 dark:border-neutral-600/70 px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="40"
                                    height="40"
                                    className="text-green-600 dark:text-lime-300 mb-3"
                                >
                                    <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm sm:text-base font-medium text-center">
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
                                <div className="w-full max-h-72 sm:max-h-80 md:max-h-[28rem] overflow-hidden rounded-xl shadow">
                                    {media?.type.startsWith("video") ? (
                                        <video src={preview} controls className="w-full h-full object-contain" />
                                    ) : (
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                    )}
                                </div>
                            )}
                        </div>

                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto sm:ml-auto block bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full transition-transform active:scale-95"
                        >
                            {loading ? "Posting…" : "Post"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
