import { useState } from "react";

export default function LocalField(props) {
  const [fieldName, setfieldName] = useState(props.field_data.name);
  const fieldType = props.field_data.type;

  const save_name = (id, fieldName) => {
    props.setter({
      ...props.pipeline_data,
      localfields: props.localfields.map((lf) => {
        if (lf.name == props.field_data.name) {
          return {
            ...lf,
            name: fieldName,
          };
        } else {
          return lf;
        }
      }),
    });
  };

  const save_type = (id, fieldType) => {
    props.setter({
      ...props.pipeline_data,
      localfields: props.localfields.map((lf) => {
        if (lf.name == props.field_data.name) {
          return {
            ...lf,
            type: fieldType,
          };
        } else {
          return lf;
        }
      }),
    });
  };
  return (
    <>
      <td>
        <input
          value={fieldName}
          onChange={(e) => {
            //save_values(e.target.value, fieldType);
            setfieldName(e.target.value);
            save_name(e.target.value);
          }}
        ></input>
      </td>
      <td>
        <select value={fieldType} onChange={(e) => save_type(e.target.value)}>
          <option value="string">Short text or Number</option>
          <option value="textarea">Long text</option>
          <option value="select_yesno">Yes/No</option>
        </select>
      </td>
    </>
  );
}
