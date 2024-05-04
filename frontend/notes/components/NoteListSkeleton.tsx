const NoteListSkeleton: React.FC = () => {
  return (
    <ul className="flex flex-col px-2 gap-5">
      <li className="block h-16 bg-gray-300 rounded-xl"></li>
      <li className="block h-16 bg-gray-300 rounded-xl"></li>
      <li className="block h-16 bg-gray-300 rounded-xl"></li>
      <li className="block h-16 bg-gray-300 rounded-xl"></li>
      <li className="block h-16 bg-gray-300 rounded-xl"></li>
    </ul>
  );
};
export default NoteListSkeleton;
