type Props = {
  params: Promise<{
    query: string;
  }>;
};

export default async function ServerPage({ params }: Props) {
  const { query } = await params;

  return (
    <div>
      <p>todo</p>
    </div>
  );
}
