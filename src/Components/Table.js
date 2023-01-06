export default function Table(props) {
  if (props.data === undefined || props.data.length < 1) return <></>;
  let columns = props.columns ? props.columns : Object.keys(props.data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr key={index}>
            {columns.map((column, innerIndex) => (
              <td key={index + innerIndex}>{item[column].toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
