export const CategoryBadge = ({ categoryName }: { categoryName: string }) => {
  if (categoryName === "Other") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-gray-700 py-2 px-2.5 text-xs font-medium text-gray-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "Math") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-blue-900 py-2 px-2.5 text-xs font-medium text-blue-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "Biology") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-green-900 px-2.5 py-2 text-xs font-medium text-green-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "Chemistry") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-pink-900 px-2.5 py-2 text-xs font-medium text-pink-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "History") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-yellow-900 px-2.5 py-2 text-xs font-medium text-yellow-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "Physics") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-purple-900 px-2.5 py-2 text-xs font-medium text-purple-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  if (categoryName === "Engineering") {
    return (
      <span className="mr-2 flex h-8 w-36 flex-1 justify-center rounded-tl-lg rounded-br-lg bg-indigo-900 px-2.5 py-2 text-xs font-medium text-indigo-300 hover:cursor-pointer">
        {categoryName}
      </span>
    );
  }
  return null;
};
