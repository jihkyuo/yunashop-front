interface Props<T> {
  dataSource: T[];
  rowKey: (row: T) => string | number;
  columns: {
    key: string;
    title: string;
    render: (row: T) => React.ReactNode;
  }[];
}

export const Table = <T,>({ dataSource, rowKey, columns }: Props<T>) => {
  return (
    <table style={{ width: '100%' }}>
      <thead style={{ backgroundColor: 'gray' }}>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ backgroundColor: 'white', color: 'black', textAlign: 'center' }}>
        {dataSource.map(row => (
          <tr key={rowKey(row)}>
            {columns.map(column => (
              <td key={column.key}>{column.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
