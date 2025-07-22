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
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <NavBar />
      <div className="px-4 pt-24 pb-12 max-w-2xl mx-auto">
        <div className="bg-neutral-900 border border-neutral-800 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold text-center text-lime-300 mb-6">
            Create Eco‑Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your eco‑friendly action…"
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
              rows={4}
            />

            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="media-input"
                className="cursor-pointer w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-600 px-4 py-6 hover:bg-neutral-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  className="text-lime-400 mb-2"
                >
                  <path
                    d="M12 5v14m7-7H5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs">
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
                <div className="w-full max-h-60 overflow-hidden rounded-md shadow">
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
              className="w-full bg-lime-500 hover:bg-lime-600 disabled:opacity-60 text-black font-semibold text-sm px-4 py-2 rounded-full transition-transform active:scale-95"
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
