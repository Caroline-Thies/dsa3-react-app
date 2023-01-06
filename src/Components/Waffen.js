import AddElement from "./AddElement";
import ElementList from "./ElementList";

export default function Waffen(props) {
  return (
    <>
      <ElementList
        title="Waffen"
        elements={props.waffen}
        deleteElement={props.removeWaffe}
      />
    </>
  );
}
