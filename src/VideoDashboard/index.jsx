import React, { useCallback, useEffect, useState } from "react";
import { getVideoCards } from "./api";

import "./styles.css";
import ListVirtual from "./ListVirtual";

const LIMIT = 10;
const VideoDashboard = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const observerRef = React.useRef();

  const fetchVideoCards = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVideoCards(page, LIMIT);
      console.log({ response });
      setList((prev) => [...prev, ...response.videos]);
    } catch (error) {
      console.error("Error fetching video cards:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getLastItemRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observerRef.current.observe(node);
  }, []);

  useEffect(() => {
    fetchVideoCards(page);
  }, [page]);

  return (
    <div className="video-container">
      {/* {list.map((item) => (
        <div key={item.id} ref={getLastItemRef}>
          <VideoCard title={item.title} thumbnailUrl={item.thumbnail} />
        </div>
      ))} */}
      <ListVirtual
        itemHeight={150}
        listHeight={400}
        list={list}
        ref={getLastItemRef}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VideoDashboard;
