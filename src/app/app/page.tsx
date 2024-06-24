import Menu from "../context/menu";

export default async function Test() {
  const basePath = process.env.BASE_URL_LOGS;
  const data = await fetch(`${basePath}/logs`, { cache: "no-cache" }).then(
    (res) => res.json()
  );

  return data ? (
    <div className="h-full w-full overflow-auto">
      <table className="w-full ">
        <thead className="w-full">
          <tr>
            <th>Date</th>
            <th>Method</th>
            <th>Path</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data.map((item: any) => (
            <tr key={item._id} className="w-full">
              <td className="text-cyan-500">{item.date}</td>
              <td className="text-red-500">{item.method}</td>
              <td className="text-green-500">{item.path}</td>
              <td className="text-yellow-500">
                {item.message}
                {item.meta ? (
                  <div className="text-wrap text-ellipsis max-w-[400px] overflow-hidden mt-1">
                    <small>{JSON.stringify(item.meta)}</small>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>No hay logs</div>
  );
}
