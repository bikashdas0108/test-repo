import React, { useEffect, useState } from "react";

import "./list.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemCount = 12;
  const endIndex = startIndex + itemCount;
  const observerRef = React.useRef();

  const updatedUserList = users.slice(startIndex, endIndex);

  const generateUsers = async () => {
    try {
      setIsLoading(true);
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) =>
          setUsers((prev) => [...prev, ...data, ...data, ...data]),
        );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    const newStartIndex = Math.floor(top / 50);
    setStartIndex(newStartIndex);
  };

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          generateUsers();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [isLoading]);

  useEffect(() => {
    generateUsers();
  }, []);

  console.log({ startIndex, endIndex, updatedUserList });

  return (
    <div
      style={{
        border: "1px solid black",
        overflowY: "scroll",
        height: "600px",
        width: "500px",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: 50 * users.length,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * 50}px)`,
          }}
        >
          {updatedUserList.map((user, i) => (
            <div className="item" key={i}>
              <div>
                {i + 1} {updatedUserList.length}
              </div>
              <div>{user.email}</div>
            </div>
          ))}
          <div ref={observerRef}>{isLoading && <p>Loading...</p>}</div>
        </div>
      </div>
    </div>
  );
}
