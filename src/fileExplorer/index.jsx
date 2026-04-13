import { useState } from "react";

const FileExplorer = () => {
  const [data, setData] = useState([
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1-1", type: "file" },
        { name: "File 1-2", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [
        { name: "File 2-1", type: "file" },
        { name: "File 2-2", type: "file" },
        {
          name: "Folder 3",
          type: "folder",
          children: [
            { name: "File 1-1", type: "file" },
            { name: "File 1-2", type: "file" },
          ],
        },
      ],
    },
  ]);

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <div key={node.name}>
        <div>{node.name}</div>
        {node.type === "folder" && renderTree(node.children)}
      </div>
    ));
  };

  return <div>{renderTree(data)}</div>;
};

export default FileExplorer;
