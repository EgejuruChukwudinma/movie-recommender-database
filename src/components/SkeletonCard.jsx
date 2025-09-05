export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-80 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}