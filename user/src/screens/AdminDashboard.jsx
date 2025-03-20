import { useEffect, useState } from "react";
import axios from "axios";
import ShowQueries from "./ShowQuries"; // Import ShowQueries

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [corporators, setCorporators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // Default tab
  const [newCorporator, setNewCorporator] = useState({
    name: "",
    email: "",
    password: "",
    political_party: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, corporatorsRes] = await Promise.all([
          axios.get("/api/admin/get-users", { withCredentials: true }),
          axios.get("/api/admin/get-corporators", { withCredentials: true }),
        ]);

        setUsers(Array.isArray(usersRes.data.users) ? usersRes.data.users : []);
        setCorporators(
          Array.isArray(corporatorsRes.data.corporators)
            ? corporatorsRes.data.corporators
            : []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCorporator((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCorporator = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/add-corporator", newCorporator, {
        withCredentials: true,
      });

      alert("Corporator added successfully!");

      const res = await axios.get("/api/admin/get-corporators", {
        withCredentials: true,
      });
      setCorporators(res.data.corporators);

      setNewCorporator({
        name: "",
        email: "",
        password: "",
        political_party: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding corporator:", error);
      alert("Failed to add corporator");
    }
  };

  if (loading) {
    return <div className="mt-10 text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h2 className="mb-6 text-3xl font-bold text-center">Admin Dashboard</h2>

      {/* ✅ Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 font-semibold border rounded-lg transition ${
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("corporators")}
          className={`px-6 py-2 font-semibold border rounded-lg transition ${
            activeTab === "corporators" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Corporators
        </button>
        <button
          onClick={() => setActiveTab("queries")}
          className={`px-6 py-2 font-semibold border rounded-lg transition ${
            activeTab === "queries" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Queries
        </button>
      </div>

      {/* ✅ Users Table */}
      {activeTab === "users" && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="mb-4 text-2xl text-center font-bold">Users</h3>
          {users.length > 0 ? (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="text-center">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.phoneNumber || "N/A"}</td>
                    <td className="px-4 py-2 border">{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No users found.</p>
          )}
        </div>
      )}

      {/* ✅ Corporators Table */}
      {activeTab === "corporators" && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="mb-4 text-2xl text-center font-bold">Corporators</h3>

          <div className="flex justify-end mb-4">
  <button
    onClick={() => setShowAddForm(!showAddForm)}
    className="px-4 py-2 bg-green-600 text-white rounded-lg"
  >
    Add Corporator
  </button>
</div>

          {showAddForm && (
            <form onSubmit={handleAddCorporator} className="space-y-3 mb-6">
              <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="w-full p-2 border rounded" required />
              <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full p-2 border rounded" required />
              <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full p-2 border rounded" required />
              <input type="text" name="political_party" placeholder="Political Party" onChange={handleInputChange} className="w-full p-2 border rounded" required />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            </form>
          )}

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Party</th>
                <th className="px-4 py-2 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {corporators.map((corp, index) => (
                <tr key={corp._id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{corp.name}</td>
                  <td className="px-4 py-2 border">{corp.email}</td>
                  <td className="px-4 py-2 border">{corp.political_party}</td>
                  <td className="px-4 py-2 border">{formatDate(corp.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "queries" && <ShowQueries />}
    </div>
  );
};

export default AdminDashboard;
