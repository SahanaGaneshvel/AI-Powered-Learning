export default function Navbar() {
  return (
    <div className="navbar bg-primary text-white p-4 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold tracking-wide">🚀 LearnAI</a>
      </div>
      <div className="flex-none space-x-2">
        <button className="btn btn-warning font-semibold">Sign Up</button>
        <button className="btn btn-accent font-semibold">Login</button>
      </div>
    </div>
  );
}
