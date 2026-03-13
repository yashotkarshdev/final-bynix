// import { Link, useNavigate } from "react-router-dom";

// function AdminLayout({ children }) {

//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (

//     <div className="flex min-h-screen bg-gray-100">

//       {/* Sidebar */}

//       <aside className="w-64 bg-gray-900 text-white flex flex-col">

//         <div className="p-6 text-xl font-bold border-b border-gray-700">
//           Bynix Admin
//         </div>

//         <nav className="flex-1 p-4 space-y-2">

//           <Link
//             to="/dashboard"
//             className="block p-2 rounded hover:bg-gray-700"
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/team"
//             className="block p-2 rounded hover:bg-gray-700"
//           >
//             Team
//           </Link>

//           <Link to="/blogs"
//             className="block p-2 rounded hover:bg-gray-700"
//           >
//             Blogs
//           </Link>
//         </nav>

//         <div className="p-4 border-t border-gray-700">

//           <button
//             onClick={logout}
//             className="w-full bg-red-500 py-2 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>

//         </div>

//       </aside>


//       {/* Content */}

//       <main className="flex-1 p-8">

//         {children}

//       </main>

//     </div>

//   );

// }

// export default AdminLayout;

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Helper function to check active path for styling
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- MOBILE NAVBAR --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <span className="font-bold text-lg tracking-tight">Bynix Admin</span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-gray-800 rounded-lg focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 text-2xl font-black border-b border-gray-800 tracking-tighter text-indigo-400">
            Bynix Admin
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2 mt-4 lg:mt-0">
            {[
              { name: "Dashboard", path: "/dashboard", icon: "📊" },
              { name: "Team", path: "/team", icon: "👥" },
              { name: "Blogs", path: "/blogs", icon: "✍️" },
              { name: "Inquiries", path: "/inquiries", icon: "📬" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Mobile par link click hone pe sidebar band ho jaye
                className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all ${
                  isActive(item.path) 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* --- OVERLAY (Mobile only) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="p-4 md:p-8 mt-16 lg:mt-0 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;