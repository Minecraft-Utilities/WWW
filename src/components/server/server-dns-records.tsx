import { DnsRecord, SRVRecord } from "mcutils-js-api/dist/types/dns/dns-record";

function isSrvRecord(r: DnsRecord): r is SRVRecord {
  return r.type === "SRV";
}

export default function ServerDnsRecords({
  records,
}: {
  records: DnsRecord[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        DNS Records
      </p>
      <div className="min-w-0 overflow-x-auto rounded-lg border border-border [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="whitespace-nowrap px-3 py-2 font-medium text-muted-foreground">
                Hostname
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium text-muted-foreground">
                Type
              </th>
              <th className="whitespace-nowrap px-3 py-2 font-medium text-muted-foreground">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="whitespace-nowrap px-3 py-2 font-mono text-foreground">
                  {isSrvRecord(record) ? record.name : (record.name ?? "—")}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-foreground">
                  {record.type}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-muted-foreground">
                  {isSrvRecord(record)
                    ? `${record.priority} ${record.weight} ${record.port} ${record.target}`
                    : (record.address ?? "—")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
