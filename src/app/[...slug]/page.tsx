interface VideoPage {
  params: Promise<{ slug: string }>;
}

export default async function VideoPage(props: VideoPage) {
  const { params } = await props;
  const { slug } = await params;
  return <div>Video Page: {slug}</div>;
}
