import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

//getting values from testComponent tester Items and witness Items
function ListItems(props) {
  const items = props.items;
  const listItems = items.map((item, index) => {
    return (
      <div className="list" key={index}>
        <p>
          <input type="text" style={{ color: "lime" }} id={item} value={item} />
          <span>
            <DeleteOutlined
              className="faicons"
              style={{ color: "red" }}
              onClick={() => {
                props.deleteItem(item);
              }}
              icon="trash"
            />
          </span>
        </p>
      </div>
    );
  });

  return <div>{listItems}</div>;
}

export default ListItems;
