import DeleteIcon from "./DeleteIcon";

export default function ElementList(props) {
  return (
    <>
      <h1>{props.title}</h1>
      <ol>
        {props.elements.map((element, index) => (
          <li key={index}>
            {element}{" "}
            <DeleteIcon removeItem={props.deleteElement} index={index} />
          </li>
        ))}
      </ol>
    </>
  );
}
