export const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white/20 backdrop-blur-md">
      <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
};
