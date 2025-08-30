import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome Admin 🎉</h1>
        <p>Manage products and blogs here.</p>
      </div>
    </div>
  );
}
