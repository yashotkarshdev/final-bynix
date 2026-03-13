// import { useEffect, useState } from "react";
// import api from "../services/api";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// function Blogs() {

//   const [blogs,setBlogs] = useState([]);

//   const [title,setTitle] = useState("");
//   const [excerpt,setExcerpt] = useState("");
//   const [content,setContent] = useState("");
//   const [category,setCategory] = useState("");

//   const [metaTitle,setMetaTitle] = useState("");
//   const [metaDescription,setMetaDescription] = useState("");

//   const [image,setImage] = useState(null);
//   const [preview,setPreview] = useState(null);

//   const [editingId,setEditingId] = useState(null);
//   const [loading,setLoading] = useState(false);

//   const [errors, setErrors] = useState({});

//   const fetchBlogs = async()=>{

//     try{

//       const res = await api.get("/blogs");

//       setBlogs(res.data.data);

//     }catch(error){

//       console.error("Failed to load blogs");

//     }

//   }

//   useEffect(()=>{

//     fetchBlogs()

//   },[])


//   const validateForm = () => {

//   const newErrors = {};

//   if (!title.trim()) newErrors.title = "Title is required";

//   if (!category.trim()) newErrors.category = "Category is required";

//   if (!excerpt.trim()) newErrors.excerpt = "Excerpt is required";

//   if (!content || content === "<p><br></p>")
//     newErrors.content = "Content is required";

//   if (!metaTitle.trim()) newErrors.metaTitle = "Meta title is required";

//   if (!metaDescription.trim())
//     newErrors.metaDescription = "Meta description is required";

//   setErrors(newErrors);

//   return Object.keys(newErrors).length === 0;
// };

//   const handleSubmit = async(e)=>{

//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);

//     try{

//       const formData = new FormData();

//       formData.append("title",title)
//       formData.append("excerpt",excerpt)
//       formData.append("content",content)
//       formData.append("category",category)
//       formData.append("metaTitle",metaTitle)
//       formData.append("metaDescription",metaDescription)

//       if(image){
//         formData.append("image",image)
//       }

//       if(editingId){

//         await api.put(`/blogs/${editingId}`,formData)

//         setEditingId(null)

//       }else{

//         await api.post("/blogs",formData)

//       }

//       setTitle("")
//       setExcerpt("")
//       setContent("")
//       setCategory("")
//       setMetaTitle("")
//       setMetaDescription("")
//       setImage(null)
//       setPreview(null)

//       fetchBlogs()

//     }catch(error){

//       console.error("Blog save failed")

//     }

//     setLoading(false)

//   }


//   const startEdit = (blog)=>{

//     setTitle(blog.title)
//     setExcerpt(blog.excerpt)
//     setContent(blog.content)
//     setCategory(blog.category)
//     setMetaTitle(blog.metaTitle)
//     setMetaDescription(blog.metaDescription)

//     setPreview(blog.imageUrl)

//     setEditingId(blog._id)
//     setErrors({});

//   }


//   const deleteBlog = async(id)=>{

//     const confirmDelete = window.confirm("Delete blog?")

//     if(!confirmDelete) return

//     try{

//       await api.delete(`/blogs/${id}`)

//       fetchBlogs()

//     }catch(error){

//       console.error("Delete failed")

//     }

//   }


//   return(

// <div className="space-y-8">

// <h1 className="text-2xl font-bold">
// Blog Management
// </h1>


// <div className="bg-white p-6 rounded shadow">

// <form
// onSubmit={handleSubmit}
// className="space-y-4"
// >

// <input
// className="border p-2 w-full rounded"
// placeholder="Title"
// value={title}
// onChange={(e)=>setTitle(e.target.value)}
// />
// {errors.title && (
// <p className="text-red-500 text-sm">{errors.title}</p>
// )}

// <input
// className="border p-2 w-full rounded"
// placeholder="Category"
// value={category}
// onChange={(e)=>setCategory(e.target.value)}
// />
// {errors.category && (
// <p className="text-red-500 text-sm">{errors.category}</p>
// )}


// <textarea
// className="border p-2 w-full rounded"
// placeholder="Excerpt"
// value={excerpt}
// onChange={(e)=>setExcerpt(e.target.value)}
// />
// {errors.excerpt && (
// <p className="text-red-500 text-sm">{errors.excerpt}</p>
// )}

// <ReactQuill
// theme="snow"
// value={content}
// onChange={setContent}
// />
// {errors.content && (
// <p className="text-red-500 text-sm">{errors.content}</p>
// )}

// <input
// placeholder="Meta Title"
// value={metaTitle}
// onChange={(e)=>setMetaTitle(e.target.value)}
// className="border p-2 w-full rounded"
// />
// {errors.metaTitle && (
// <p className="text-red-500 text-sm">{errors.metaTitle}</p>
// )}

// <textarea
// placeholder="Meta Description"
// value={metaDescription}
// onChange={(e)=>setMetaDescription(e.target.value)}
// className="border p-2 w-full rounded"
// />
// {errors.metaDescription && (
// <p className="text-red-500 text-sm">{errors.metaDescription}</p>
// )}

// <input
// type="file"
// onChange={(e)=>{

// const file = e.target.files[0]

// setImage(file)

// setPreview(URL.createObjectURL(file))

// }}
// />


// <button
// disabled={loading}
// className="bg-blue-600 text-white px-4 py-2 rounded"
// >

// {editingId ? "Update Blog" : "Create Blog"}

// </button>

// </form>

// {preview && (

// <img
// src={preview}
// className="mt-4 w-40 rounded"
// />

// )}

// </div>


// <div className="bg-white p-6 rounded shadow">

// <table className="w-full">

// <thead className="border-b">

// <tr>

// <th className="p-3">Image</th>
// <th className="p-3">Title</th>
// <th className="p-3">Category</th>
// <th className="p-3">Actions</th>

// </tr>

// </thead>

// <tbody>

// {blogs.map(blog=>(
// <tr key={blog._id} className="border-b">

// <td className="p-3">

// <img
// src={blog.imageUrl}
// className="w-16 h-16 object-cover rounded"
// />

// </td>

// <td className="p-3">
// {blog.title}
// </td>

// <td className="p-3">
// {blog.category}
// </td>

// <td className="p-3 space-x-2">

// <button
// onClick={()=>startEdit(blog)}
// className="bg-yellow-500 text-white px-3 py-1 rounded"
// >
// Edit
// </button>

// <button
// onClick={()=>deleteBlog(blog._id)}
// className="bg-red-500 text-white px-3 py-1 rounded"
// >
// Delete
// </button>

// </td>

// </tr>
// ))}

// </tbody>

// </table>

// </div>

// </div>

//   )

// }

// export default Blogs

import { useEffect, useState } from "react";
import api from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data.data || []);
    } catch (error) {
      console.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!content || content === "<p><br></p>") newErrors.content = "Content is required";
    if (!metaTitle.trim()) newErrors.metaTitle = "Meta title is required";
    if (!metaDescription.trim()) newErrors.metaDescription = "Meta description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      if (image) formData.append("image", image);

      if (editingId) {
        await api.put(`/blogs/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/blogs", formData);
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      alert("Blog save failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setMetaTitle("");
    setMetaDescription("");
    setImage(null);
    setPreview(null);
    setEditingId(null);
    setErrors({});
  };

  const startEdit = (blog) => {
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory(blog.category);
    setMetaTitle(blog.metaTitle);
    setMetaDescription(blog.metaDescription);
    setPreview(blog.imageUrl);
    setEditingId(blog._id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10">
      <div className="border-b pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Blog Management</h1>
        <p className="text-gray-500 font-medium">Write, edit, and optimize your startup's stories.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
        {/* FORM SECTION */}
        <div className="xl:col-span-3 order-2 xl:order-1">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
              {editingId ? "✏️ Edit Blog Post" : "📝 Create New Blog"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Blog Title</label>
                <input
                  className={`w-full bg-gray-50 border p-4 rounded-2xl focus:ring-4 transition-all ${errors.title ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"}`}
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="text-red-500 text-xs font-semibold ml-1">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                <input
                  className={`w-full bg-gray-50 border p-4 rounded-2xl focus:ring-4 transition-all ${errors.category ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"}`}
                  placeholder="e.g. Technology"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                {errors.category && <p className="text-red-500 text-xs font-semibold ml-1">{errors.category}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Short Excerpt</label>
              <textarea
                rows="2"
                className={`w-full bg-gray-50 border p-4 rounded-2xl focus:ring-4 transition-all ${errors.excerpt ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none"}`}
                placeholder="Brief summary for cards..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
              {errors.excerpt && <p className="text-red-500 text-xs font-semibold ml-1">{errors.excerpt}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Content</label>
              <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white min-h-[250px]" />
              </div>
              {errors.content && <p className="text-red-500 text-xs font-semibold ml-1">{errors.content}</p>}
            </div>

            {/* SEO Section */}
            <div className="bg-indigo-50/50 p-6 rounded-[1.5rem] border border-indigo-100 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">SEO Optimization</h3>
              <input
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-indigo-400"
                placeholder="Meta Title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-indigo-400"
                placeholder="Meta Description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-auto flex-1">
                <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 hover:bg-gray-100 transition-all text-center cursor-pointer">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }} />
                  <span className="text-sm font-bold text-gray-500">📸 {image ? image.name : "Upload Featured Image"}</span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-none bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingId ? "Update Post" : "Publish Blog"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="bg-white border border-gray-200 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50">
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {preview && (
              <div className="mt-4 relative inline-block">
                <img src={preview} className="w-40 h-24 object-cover rounded-xl border-4 border-white shadow-md" alt="preview" />
                <button type="button" onClick={() => { setImage(null); setPreview(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-lg">✕</button>
              </div>
            )}
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="xl:col-span-2 order-1 xl:order-2">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm h-full max-h-[1000px] flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Articles</h2>
            
            <div className="overflow-y-auto flex-1 space-y-4 pr-2 custom-scrollbar">
              {blogs.length === 0 ? (
                <div className="text-center py-20 text-gray-400 italic">No blogs published yet.</div>
              ) : (
                blogs.map((blog) => (
                  <div key={blog._id} className="group flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all">
                    <img src={blog.imageUrl || "/placeholder.png"} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl shadow-sm" alt="blog" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">{blog.category}</span>
                      <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">{blog.title}</h3>
                      <div className="flex gap-3 mt-3">
                        <button onClick={() => startEdit(blog)} className="text-xs font-bold text-amber-600 hover:underline">Edit</button>
                        <button onClick={() => deleteBlog(blog._id)} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;