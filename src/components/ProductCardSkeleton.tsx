const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse">
      <div className="bg-gray-200 rounded-xl h-56 mb-4" />

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-10 w-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;