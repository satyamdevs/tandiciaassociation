import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return user ? <UploadPanel /> : <LoginForm />;
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Invalid email or password");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <img src="/logo.png" className="w-9 h-9 object-contain" alt="Tandicia" />
            <span className="text-lg font-semibold tracking-tight">Tandicia</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif mb-3">Admin Login</h1>
            <p className="text-gray-500">Sign in to manage gallery images</p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 md:p-10">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                  placeholder="admin@tandicia.org"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-800 text-white py-3.5 rounded-xl font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function UploadPanel() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [location, setLocation] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    if (!location.trim()) {
      alert("Please enter a location for the camp");
      return;
    }

    setUploading(true);
    setSuccess("");

    for (const file of files) {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      const { error } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      await supabase.from("gallery").insert({
        url: publicUrl,
        location: location.trim(),
        file_name: fileName,
        created_at: new Date().toISOString(),
      });
    }

    setUploading(false);
    setSuccess("Images uploaded successfully!");
    setLocation("");
    fetchImages();
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleUpload(Array.from(e.dataTransfer.files));
  };

  const handleDelete = async (image) => {
    if (!confirm("Delete this image?")) return;

    try {
      await supabase.storage.from("gallery").remove([image.file_name]);
      await supabase.from("gallery").delete().eq("id", image.id);
      fetchImages();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <img src="/logo.png" className="w-9 h-9 object-contain" alt="Tandicia" />
            <span className="text-lg font-semibold tracking-tight">Tandicia Admin</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-black transition"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-black transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm text-green-700 font-medium mb-4 tracking-wide"
          >
            Admin Panel
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-3"
          >
            Manage Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-500 text-lg"
          >
            Upload and organize images from your eye care camps.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-xl font-serif mb-6">Upload Images</h2>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Camp location (e.g., Kusumpur Pahadi)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-5 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
                    dragActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-400 hover:bg-green-50/30"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleUpload(Array.from(e.target.files))}
                    className="hidden"
                  />
                  <div className="w-14 h-14 mx-auto mb-5 bg-green-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-900">Drop images here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                </div>

                {uploading && (
                  <div className="mt-5 flex items-center gap-3 text-green-700">
                    <div className="animate-spin w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full" />
                    <p className="text-sm">Uploading...</p>
                  </div>
                )}

                {success && (
                  <p className="mt-5 text-sm text-green-700 bg-green-100 px-4 py-2 rounded-lg">{success}</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-xl font-serif mb-6">
                Uploaded Images ({images.length})
              </h2>

              {images.length === 0 ? (
                <div className="bg-gray-50 rounded-3xl py-16 text-center">
                  <p className="text-gray-400">No images uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square"
                    >
                      <img
                        src={image.url}
                        alt={image.location}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(image)}
                          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                        <p className="text-white text-xs truncate">{image.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
