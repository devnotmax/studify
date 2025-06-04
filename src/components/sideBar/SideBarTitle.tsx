export const SideBarTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center h-16 pl-6">
      <p className="text-gray-500">{title.toUpperCase()}</p>
    </div>
  );
};
