import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [teamCount, setTeamCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {

      const [teamRes, blogsRes, inquiriesRes] = await Promise.all([
        api.get("/team"),
        api.get("/blogs"),
        api.get("/contacts")
      ]);

      setTeamCount(teamRes.data.data.length);
      setBlogCount(blogsRes.data.data.length);
      setInquiryCount(inquiriesRes.data.data.length);

    } catch (error) {

      console.log("Failed to load dashboard data");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Admin Overview
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Welcome back! Here is what's happening with your site today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Team Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
              👤
            </div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Team</h3>
          </div>
          <p className="text-5xl font-black text-gray-900">
            {loading ? <span className="animate-pulse">...</span> : teamCount}
          </p>
          <Link
            to="/team"
            className="mt-6 flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Manage Members <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Blog Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
              📝
            </div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Content</h3>
          </div>
          <p className="text-5xl font-black text-gray-900">
            {loading ? <span className="animate-pulse">...</span> : blogCount}
          </p>
          <Link
            to="/blogs"
            className="mt-6 flex items-center text-sm font-bold text-amber-600 hover:text-amber-800 transition-colors"
          >
            Review Blogs <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Messages Card (Static for now) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">

          <div className="flex items-center space-x-4 mb-4">

            <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
              ✉️
            </div>

            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Inquiry
            </h3>

          </div>

          <p className="text-5xl font-black text-gray-900">
            {inquiryCount}
          </p>

          <p className="mt-6 text-sm font-semibold text-gray-400 italic">
            {inquiryCount === 0 ? "No new messages" : "New inquiries received"}
          </p>

        </div>

      </div>

      {/* Decorative Background Element (Optional) */}
      <div className="hidden lg:block absolute top-0 right-0 -z-10 opacity-5">
        <div className="w-96 h-96 bg-gray-200 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>
    </div>
  );
}

export default Dashboard;