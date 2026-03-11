import { forwardRef, useState } from "react";
import VideoCard from "./VideoCard";

const ListVirtual = forwardRef(({ itemHeight, listHeight, list }, ref) => {
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + Math.floor(listHeight / itemHeight);
  const updatedList = list.slice(startIndex, endIndex);

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    const newStartIndex = Math.floor(top / itemHeight);
    setStartIndex(newStartIndex);
  };
  console.log({ updatedList, startIndex });
  return (
    <div
      className="virtual-list"
      style={{ height: listHeight }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: itemHeight * list.length,
          transform: `translateY(${startIndex * itemHeight}px)`,
        }}
      >
        {updatedList.map((item) => (
          <div
            className="list-item"
            key={item.id}
            ref={ref}
            style={{ height: itemHeight }}
          >
            <VideoCard title={item.title} thumbnailUrl={item.thumbnail} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default ListVirtual;
