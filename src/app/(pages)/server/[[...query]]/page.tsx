import { mcUtilsApi } from "@/app/common/mc-utils";
import { ServerType } from "mcutils-js-api/dist/types/server/server";

type Props = {
  params: Promise<{
    query: [ServerType, string];
  }>;
};

export default async function ServerPage({ params }: Props) {
  const { query } = await params;
  const [edition, hostname] = query;

  const response = await mcUtilsApi.fetchServer(hostname, edition);
  const server = response.server;
  const error = response.error;

  return (
    <div>
      {error && <div>Error: {error.message}</div>}

      {server && (
        <div>
          <p>
            {server.ip}:{server.port}
          </p>
        </div>
      )}
    </div>
  );
}
