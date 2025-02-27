export default function Hero() {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white flex flex-col items-center text-center p-10">
      <h1 className="text-6xl font-extrabold animate-bounce">🚀 Personalized Learning with AI</h1>
      <p className="text-lg mt-4 max-w-lg animate-fade-in">Get AI-powered recommendations and track your progress with fun challenges.</p>
      <button className="btn btn-accent mt-6 px-8 py-3 text-xl hover:scale-110 transition-transform">
        Get Started
      </button>
    </div>
  );
}
