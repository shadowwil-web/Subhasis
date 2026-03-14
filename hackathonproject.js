import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials! Try admin / 1234");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition">
      {!isLoggedIn ? (
        // ---------------- Login Page ----------------
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
          <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            🔐 Login to NTRO Estimator
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    </div>
  );
}

// ---------------- Dashboard Component ----------------
function Dashboard({ darkMode, setDarkMode }) {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    quantity: "",
  });

  const [items, setItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const basePrice = 100;
    const estimated = basePrice * (formData.quantity || 1);

    const newItem = {
      ...formData,
      price: estimated,
      reason: estimated > 500 ? "Above Market Average" : "Reasonable",
    };

    setItems([...items, newItem]);
    setFormData({ item: "", category: "", quantity: "" });
  };

  const pieData = [
    {
      name: "Reasonable",
      value: items.filter((i) => i.reason === "Reasonable").length,
    },
    {
      name: "Above Market",
      value: items.filter((i) => i.reason === "Above Market Average").length,
    },
  ];

  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 transition">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-indigo-700 dark:bg-indigo-900 text-white p-6 fixed md:static top-0 left-0 h-full z-20`}
      >
        <h1 className="text-xl font-bold mb-6">NTRO Estimator</h1>
        <nav className="space-y-4">
          <button className="block w-full text-left hover:bg-indigo-600 p-2 rounded">
            🏠 Home
          </button>
          <button className="block w-full text-left hover:bg-indigo-600 p-2 rounded">
            📊 Estimator
          </button>
          <button className="block w-full text-left hover:bg-indigo-600 p-2 rounded">
            📈 Analytics
          </button>
        </nav>
      </div>

      {/* Top Navbar (Mobile) */}
      <div className="md:hidden bg-indigo-700 dark:bg-indigo-900 text-white p-3 flex justify-between items-center fixed top-0 w-full z-10">
        <h1 className="font-bold">NTRO Estimator</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀" : "🌙"}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 mt-12 md:mt-0 md:ml-64">
        {/* Dark Mode Toggle (Desktop) */}
        <div className="hidden md:flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">
          Centralized Automated Solution for Price Estimation & Reasonability
        </h2>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-4 sm:p-6 shadow rounded-xl mb-6"
        >
          <input
            type="text"
            name="item"
            placeholder="Item Name"
            value={formData.item}
            onChange={handleChange}
            className="p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="p-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            ➕ Add Item
          </button>
        </form>

        {/* Items Table */}
        {items.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 shadow rounded-xl mb-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">📋 Item List</h3>
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                  <th className="p-3">Item</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Estimated Price</th>
                  <th className="p-3">Reasonability</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-3">{item.item}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 font-semibold">₹{item.price}</td>
                    <td
                      className={`p-3 font-bold ${
                        item.reason === "Reasonable"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Charts Section */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 shadow rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Reasonability Distribution
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 shadow rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Price Estimation by Item
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={items}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="price" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}