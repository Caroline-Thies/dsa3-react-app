import { useEffect, useState } from "react";

export default function AddElement(props) {
  const [newElement, setNewElement] = useState({});

  const updateAttribute = (attribute, newValue) => {
    let updatedNewElement = JSON.parse(JSON.stringify(newElement));
    updatedNewElement[attribute] = newValue;
    setNewElement(updatedNewElement);
  };

  useEffect(() => {
    let newElement = {};
    props.attributes.map((attr) => {
      newElement[attr] = "";
    });
    setNewElement(newElement);
  }, []);

  return (
    <>
      {props.attributes.map((attribute, index) => {
        return (
          <span key={index}>
            {attribute}:
            <input
              type="text"
              value={newElement[attribute]}
              onChange={(event) =>
                updateAttribute(attribute, event.target.value)
              }
            />
            <br />
          </span>
        );
      })}

      <span onClick={() => props.addElement(newElement)}>+</span>
    </>
  );
}
