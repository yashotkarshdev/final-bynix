// import { useEffect, useState } from "react";
// import api from "../services/api";

// function Team() {

//   const [teams, setTeams] = useState([]);

//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [editingId, setEditingId] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [errors, setErrors] = useState({});

//   // Fetch team members
//   const fetchTeams = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/team");
//       setTeams(res.data.data || []);
//     } catch {
//       alert("Failed to load team members");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTeams();
//   }, []);

//   // cleanup preview memory
//   useEffect(() => {
//     return () => {
//       if (preview && preview.startsWith("blob:")) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   // validation
//   const validate = () => {

//     const newErrors = {};

//     if (!name.trim()) {
//       newErrors.name = "Name is required";
//     } else if (name.trim().length < 2) {
//       newErrors.name = "Name must be at least 2 characters";
//     }

//     if (!role.trim()) {
//       newErrors.role = "Role is required";
//     } else if (role.trim().length < 2) {
//       newErrors.role = "Role must be at least 2 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;

//   };

//   // file upload handler
//   const handleFile = (e) => {

//     const file = e.target.files[0];
//     if (!file) return;

//     setImage(file);
//     setPreview(URL.createObjectURL(file));

//   };

//   // submit
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (!validate()) return;

//     setSubmitting(true);

//     const formData = new FormData();

//     formData.append("name", name);
//     formData.append("role", role);

//     if (image) {
//       formData.append("image", image);
//     }

//     try {

//       if (editingId) {

//         await api.put(`/team/${editingId}`, formData);
//         setEditingId(null);

//       } else {

//         await api.post("/team", formData);

//       }

//       setName("");
//       setRole("");
//       setImage(null);
//       setPreview(null);
//       setErrors({});

//       await fetchTeams();

//     } catch (err) {

//       alert(err?.response?.data?.message || "Something went wrong");

//     }

//     setSubmitting(false);

//   };

//   // edit
//   const startEdit = (team) => {

//     setName(team.name);
//     setRole(team.role);
//     setPreview(team.imageUrl || null);
//     setImage(null);
//     setEditingId(team._id);
//     setErrors({});

//   };

//   // delete
//   const deleteTeam = async (id) => {

//     const confirmDelete = window.confirm("Delete this team member?");
//     if (!confirmDelete) return;

//     try {

//       await api.delete(`/team/${id}`);
//       await fetchTeams();

//     } catch {

//       alert("Delete failed");

//     }

//   };

//   const cancelEdit = () => {

//     setEditingId(null);
//     setName("");
//     setRole("");
//     setImage(null);
//     setPreview(null);
//     setErrors({});

//   };

//   return (

//     <div className="space-y-8">

//       <h1 className="text-3xl font-bold">Team Management</h1>

//       {/* FORM */}

//       <div className="bg-white p-6 rounded-lg shadow-md">

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* NAME */}

//           <div>

//             <input
//               className="border p-2 w-full rounded"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name}</p>
//             )}

//           </div>

//           {/* ROLE */}

//           <div>

//             <input
//               className="border p-2 w-full rounded"
//               placeholder="Role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             />

//             {errors.role && (
//               <p className="text-red-500 text-sm">{errors.role}</p>
//             )}

//           </div>

//           {/* FILE INPUT */}

//           <div className="space-y-2">

//             <label className="block text-sm font-medium">
//               Team Member Image
//             </label>

//             <div className="flex items-center gap-4">

//               <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border text-sm">

//                 Choose Image

//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={handleFile}
//                 />

//               </label>

//               {image && (
//                 <span className="text-sm text-gray-600">
//                   {image.name}
//                 </span>
//               )}

//             </div>

//           </div>

//           {/* BUTTONS */}

//           <div className="flex gap-3">

//             <button
//               disabled={submitting}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//             >
//               {submitting
//                 ? "Saving..."
//                 : editingId
//                   ? "Update Member"
//                   : "Add Member"}
//             </button>

//             {editingId && (
//               <button
//                 type="button"
//                 onClick={cancelEdit}
//                 className="px-4 py-2 border rounded hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//             )}

//           </div>

//         </form>

//         {/* IMAGE PREVIEW */}

//         {preview && (

//           <div className="mt-4 flex items-center gap-4">

//             <img
//               src={preview}
//               alt="preview"
//               className="w-24 h-24 object-cover rounded-lg border"
//             />

//             <button
//               type="button"
//               onClick={() => {
//                 setImage(null);
//                 setPreview(null);
//               }}
//               className="text-sm text-red-500 hover:underline"
//             >
//               Remove
//             </button>

//           </div>

//         )}

//       </div>

//       {/* TABLE */}

//       <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">

//         {loading ? (

//           <p>Loading team members...</p>

//         ) : (

//           <table className="w-full">

//             <thead className="border-b">

//               <tr className="text-left">

//                 <th className="p-3">Image</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Role</th>
//                 <th className="p-3">Actions</th>

//               </tr>

//             </thead>

//             <tbody>

//               {teams.length === 0 && (

//                 <tr>
//                   <td colSpan="4" className="text-center p-6 text-gray-500">
//                     No team members found
//                   </td>
//                 </tr>

//               )}

//               {teams.map((team) => (

//                 <tr
//                   key={team._id}
//                   className="border-b hover:bg-gray-50"
//                 >

//                   <td className="p-3">

//                     <img
//                       src={team.imageUrl || "/placeholder.png"}
//                       alt="team"
//                       className="w-12 h-12 object-cover rounded"
//                     />

//                   </td>

//                   <td className="p-3">{team.name}</td>

//                   <td className="p-3">{team.role}</td>

//                   <td className="p-3 space-x-2">

//                     <button
//                       onClick={() => startEdit(team)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteTeam(team._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         )}

//       </div>

//     </div>

//   );
// }

// export default Team;

import { useEffect, useState } from "react";
import api from "../services/api";

function Team() {
  const [teams, setTeams] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await api.get("/team");
      setTeams(res.data.data || []);
    } catch {
      alert("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!role.trim()) {
      newErrors.role = "Role is required";
    } else if (role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await api.put(`/team/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/team", formData);
      }
      setName("");
      setRole("");
      setImage(null);
      setPreview(null);
      setErrors({});
      await fetchTeams();
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (team) => {
    setName(team.name);
    setRole(team.role);
    setPreview(team.imageUrl || null);
    setImage(null);
    setEditingId(team._id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Mobile par edit click karne pe form dikhega
  };

  const deleteTeam = async (id) => {
    const confirmDelete = window.confirm("Delete this team member?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/team/${id}`);
      await fetchTeams();
    } catch {
      alert("Delete failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setImage(null);
    setPreview(null);
    setErrors({});
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 md:space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Team Management</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Add or manage your startup's core members.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 items-start">
        {/* FORM SECTION */}
        <div className="lg:col-span-1 lg:sticky lg:top-6 order-2 lg:order-1">
          <div className="bg-white border border-gray-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-800">
              {editingId ? "✏️ Edit Member" : "➕ Add New Member"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                <input
                  className={`w-full bg-gray-50 border p-3 md:p-4 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                    errors.name ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500"
                  }`}
                  placeholder="e.g. Yash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 ml-1 font-semibold">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Role / Designation</label>
                <input
                  className={`w-full bg-gray-50 border p-3 md:p-4 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 transition-all ${
                    errors.role ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500"
                  }`}
                  placeholder="e.g. Frontend Developer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                {errors.role && <p className="text-red-500 text-xs mt-2 ml-1 font-semibold">{errors.role}</p>}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700 ml-1">Profile Photo</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl md:rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
                  <span className="text-2xl mb-1">🖼️</span>
                  <span className="text-xs font-bold text-gray-500">Click to upload</span>
                </div>
                
                {preview && (
                  <div className="relative group w-20 h-20 md:w-24 md:h-24 mx-auto">
                    <img src={preview} alt="preview" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl md:rounded-2xl border-2 border-white shadow-md" />
                    <button
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600 shadow-sm"
                    >✕</button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  disabled={submitting}
                  className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-white transition-all active:scale-95 ${
                    submitting ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                  }`}
                >
                  {submitting ? "Processing..." : editingId ? "Update Member" : "Save Member"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
                  >Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white border border-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-800 pl-2">Current Members</h2>
            
            {loading ? (
              <div className="py-20 text-center animate-pulse text-gray-400 font-bold tracking-widest text-sm">LOADING TEAM...</div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="inline-block min-w-full align-middle px-4 md:px-0">
                  <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-left text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="pb-4 pl-4">Member</th>
                        <th className="pb-4 hidden sm:table-cell">Designation</th>
                        <th className="pb-4 text-right pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-20 text-gray-400 font-medium italic bg-gray-50 rounded-2xl md:rounded-3xl">No members added yet.</td>
                        </tr>
                      ) : (
                        teams.map((team) => (
                          <tr key={team._id} className="group hover:bg-gray-50 transition-all">
                            <td className="py-3 md:py-4 pl-4 rounded-l-2xl md:rounded-l-3xl border-y border-l border-transparent group-hover:border-gray-100">
                              <div className="flex items-center gap-3 md:gap-4">
                                <img
                                  src={team.imageUrl || "/placeholder.png"}
                                  alt={team.name}
                                  className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-lg md:rounded-2xl border-2 border-white shadow-sm"
                                />
                                <div className="flex flex-col">
                                  <span className="font-bold text-gray-900 text-sm md:text-base leading-tight">{team.name}</span>
                                  <span className="text-[10px] font-bold text-indigo-500 uppercase sm:hidden mt-1">{team.role}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 border-y border-transparent group-hover:border-gray-100 hidden sm:table-cell">
                              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-tight">
                                {team.role}
                              </span>
                            </td>
                            <td className="py-4 pr-4 text-right rounded-r-2xl md:rounded-r-3xl border-y border-r border-transparent group-hover:border-gray-100">
                              <div className="flex justify-end gap-1 md:gap-2">
                                <button
                                  onClick={() => startEdit(team)}
                                  className="p-1.5 md:p-2 md:px-4 bg-amber-50 text-amber-600 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-amber-100 transition-colors"
                                >Edit</button>
                                <button
                                  onClick={() => deleteTeam(team._id)}
                                  className="p-1.5 md:p-2 md:px-4 bg-red-50 text-red-600 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-red-100 transition-colors"
                                >Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;