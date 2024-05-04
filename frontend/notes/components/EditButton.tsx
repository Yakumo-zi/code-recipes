import clsx from "clsx";
import Link from "next/link";
type Props = {
  noteID?: string;
};
const EditButton: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  noteID,
}) => {
  return (
    <Link href={`/note/edit/${noteID || ""}`} className="h-full">
      <button
        className={clsx(
          "h-full text-lg  rounded-2xl px-3 font-bold uppercase",
          {
            "bg-white text-sky-500 border-sky-500 border hover:bg-sky-500 hover:text-white":
              noteID,
          },
          { "text-white bg-sky-400 hover:bg-sky-500": !noteID },
        )}
      >
        {children}
      </button>
    </Link>
  );
};

export default EditButton;
