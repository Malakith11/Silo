export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-white px-6 py-16 text-center text-brand-dark">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-brand-dark/70">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}
