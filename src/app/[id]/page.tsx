interface VideoPageProps {
  params: { id: string };
}

export default async function VideoPage(props: VideoPageProps) {
  const { params } = props;
  const { id } = await params;

  return <h1>Video Page {id}</h1>;
}
