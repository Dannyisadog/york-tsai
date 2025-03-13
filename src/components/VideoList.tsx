import Link from "next/link";

interface VideoItemProps {
  title: string;
  href: string;
  style: React.CSSProperties;
}

const VideoItem = (props: VideoItemProps) => {
  const { title, href, style } = props;
  return (
    <Link href={href}>
      <li
        key={title}
        style={{
          color: "#f0f0f0",
          width: "100%",
          height: 200,
          border: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        Fake Video
      </li>
    </Link>
  );
};

export const VideoList = () => {
  const videos = [
    { title: "Video 1", href: "/video1", style: {} },
    { title: "Video 2", href: "/video2", style: {} },
    { title: "Video 3", href: "/video3", style: {} },
    { title: "Video 4", href: "/video4", style: {} },
    { title: "Video 5", href: "/video5", style: {} },
    { title: "Video 6", href: "/video6", style: {} },
    { title: "Video 7", href: "/video7", style: {} },
    { title: "Video 8", href: "/video8", style: {} },
    { title: "Video 9", href: "/video9", style: {} },
    { title: "Video 10", href: "/video10", style: {} },
    { title: "Video 11", href: "/video11", style: {} },
    { title: "Video 12", href: "/video12", style: {} },
  ];

  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        listStyleType: "none",
        padding: 0,
      }}
    >
      {videos.map((video) => (
        <VideoItem key={video.title} {...video} />
      ))}
    </ul>
  );
};
