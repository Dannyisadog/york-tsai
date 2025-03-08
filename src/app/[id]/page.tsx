interface VideoPage {
  params: Promise<{ id: string }>;
}

export default async function VideoPage(props: VideoPage) {
  const { params } = await props;
  const { id } = await params;
  return <div>My Post: {id}</div>;
}
