const VideoCard = ({ title, thumbnailUrl }) => {
  return (
    <div className="video-card">
      <img width={100} height={100} src={thumbnailUrl} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default VideoCard;
