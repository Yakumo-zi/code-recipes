import { marked } from "marked";
import sanitize from "sanitize-html";
const allowedTags = sanitize.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);

const allowedAttributes = Object.assign(
  {},
  sanitize.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  },
);
const NotePreview: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[85%] overflow-scroll no-scrollbar">
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(marked(children || ""), {
            allowedTags,
            allowedAttributes,
          }),
        }}
      />
    </div>
  );
};

export default NotePreview;
