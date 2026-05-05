import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
            <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-serif mb-3">Admin Login</h1>
            <p className="text-gray-400">Sign in to manage engagements</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-sm"
          >
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="admin@tandicia.org"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-100"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </motion.div>
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
  const [campSuggestions, setCampSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setImages(data);
      const uniqueCamps = [...new Set(data.map((img) => img.location).filter(Boolean))];
      setCampSuggestions(uniqueCamps);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleLocationInput = (value) => {
    setLocation(value);
    if (value.length > 0) {
      const filtered = campSuggestions.filter((camp) =>
        camp.toLowerCase().includes(value.toLowerCase())
      );
      setShowSuggestions(filtered.length > 0 && value !== filtered[0]);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCamp = (campName) => {
    setLocation(campName);
    setShowSuggestions(false);
    locationInputRef.current?.blur();
  };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    if (!location.trim()) {
      alert("Please enter a camp name");
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

  const handleDeleteCamp = async (campName) => {
    const campImages = images.filter((img) => img.location === campName);
    if (!confirm(`Delete all ${campImages.length} images from "${campName}"?`)) return;

    try {
      const fileNames = campImages.map((img) => img.file_name);
      await supabase.storage.from("gallery").remove(fileNames);
      await supabase.from("gallery").delete().eq("location", campName);
      fetchImages();
    } catch (error) {
      console.error("Delete camp error:", error);
    }
  };

  const camps = images.reduce((acc, img) => {
    const campName = img.location || "Uncategorized";
    if (!acc[campName]) acc[campName] = [];
    acc[campName].push(img);
    return acc;
  }, {});

  const campNames = Object.keys(camps);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <img src="/logo.png" className="w-9 h-9 object-contain" alt="Tandicia" />
            <span className="text-lg font-semibold tracking-tight">Tandicia Admin</span>
          </button>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/engagements")}
              className="text-sm text-gray-500 hover:text-gray-900 transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-900 transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="relative px-6 md:px-12 py-12 md:py-16 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-emerald-50 rounded-full blur-3xl opacity-40" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-5 py-2 rounded-full text-sm font-medium mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {images.length} {images.length === 1 ? "Moment" : "Moments"} Across {campNames.length} {campNames.length === 1 ? "Camp" : "Camps"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-3"
          >
            Manage Engagements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-lg"
          >
            Upload and organize images from your eye care camps.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm sticky top-32">
                <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Images
                </h2>

                <div className="relative mb-5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    ref={locationInputRef}
                    type="text"
                    value={location}
                    onChange={(e) => handleLocationInput(e.target.value)}
                    onFocus={() => {
                      if (campSuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Select or type camp name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-sm"
                  />
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto z-10"
                      >
                        {campSuggestions
                          .filter((camp) =>
                            camp.toLowerCase().includes(location.toLowerCase())
                          )
                          .map((camp) => (
                            <button
                              key={camp}
                              onClick={() => selectCamp(camp)}
                              className="w-full text-left px-4 py-3 hover:bg-green-50 transition text-sm text-gray-700 flex items-center gap-3 border-b border-gray-50 last:border-0"
                            >
                              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {camp}
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                    dragActive
                      ? "border-green-500 bg-green-50 shadow-md shadow-green-100"
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
                  <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-colors ${
                    dragActive ? "bg-green-200" : "bg-green-100"
                  }`}>
                    <svg className={`w-8 h-8 transition-colors ${dragActive ? "text-green-700" : "text-green-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16V4m0 0l-4 4m4-4l4 4M4 14v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-900">Drop images here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                </div>

                {uploading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-5 flex items-center gap-3 text-green-700"
                  >
                    <div className="animate-spin w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full" />
                    <p className="text-sm">Uploading...</p>
                  </motion.div>
                )}

                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl border border-green-100 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {success}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Uploaded Images
                  <span className="text-sm font-sans text-gray-400 ml-2">({images.length})</span>
                </h2>
              </div>

              {campNames.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 rounded-3xl py-20 text-center border border-gray-100"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">No images uploaded yet</p>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  {campNames.map((campName, idx) => (
                    <motion.div
                      key={campName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-serif text-gray-900">{campName}</h3>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                            {camps[campName].length}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteCamp(campName)}
                          className="text-xs text-red-400 hover:text-red-600 transition flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete camp
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {camps[campName].map((image, imgIdx) => (
                          <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: imgIdx * 0.02 }}
                            className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square shadow-sm hover:shadow-md transition-shadow"
                          >
                            <img
                              src={image.url}
                              alt={image.location}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => handleDelete(image)}
                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition transform hover:scale-110"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs truncate">{image.file_name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
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
