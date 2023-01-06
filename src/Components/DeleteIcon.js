export default function DeleteIcon(props) {
  const deleteStyle = {
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: "5px",
  };
  return (
    <span onClick={() => props.removeItem(props.index)} style={deleteStyle}>
      x
    </span>
  );
}
