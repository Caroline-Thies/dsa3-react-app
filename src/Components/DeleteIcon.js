export default function DeleteIcon(props) {
  const deleteStyle = {
    cursor: "pointer",
    border: "2px solid black",
    borderRadius: "5px",
    paddingLeft: "2px",
    paddingRight: "2px",
    fontWeight: "bold",
  };
  return (
    <span onClick={() => props.removeItem(props.index)} style={deleteStyle}>
      x
    </span>
  );
}
