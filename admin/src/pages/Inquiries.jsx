import { useEffect, useState } from "react";
import api from "../services/api";

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await api.get("/contacts");
      setInquiries(res.data.data || []);
    } catch (error) {
      console.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const deleteInquiry = async (id) => {
    const confirmDelete = window.confirm("Delete this inquiry?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/contacts/${id}`);
      fetchInquiries();
    } catch (error) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Contact Inquiries</h1>
        <p className="text-gray-500 font-medium">Manage and respond to your potential client leads.</p>
      </div>

      {/* Stats/Summary Row (Optional but looks good) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Inquiries</p>
          <p className="text-2xl font-black text-indigo-600">{inquiries.length}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center animate-pulse text-gray-400 font-bold tracking-widest uppercase">
            Fetching leads...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="px-6 py-5">Client Info</th>
                  <th className="px-6 py-5">Business</th>
                  <th className="px-6 py-5">Message</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-20 text-gray-400 italic">
                      No inquiries found yet.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-all group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{item.name}</span>
                          <span className="text-xs text-gray-500">{item.email}</span>
                          <span className="text-xs text-indigo-500 font-medium mt-1">{item.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                          {item.business || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-600 max-w-xs truncate lg:whitespace-normal">
                          {item.message}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500 font-medium">
                          {new Date(item.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => deleteInquiry(item._id)}
                          className="p-2 px-4 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm shadow-red-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inquiries;