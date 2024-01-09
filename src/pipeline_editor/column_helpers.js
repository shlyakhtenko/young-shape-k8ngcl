export function compute_inputs(query) {
  //console.log("compute inputs: query::", query.fields);
  let xyz = {
    name: "inputs",
    caption: "Input Column",
    query: query.name,
    fields: Object.entries(query.fields).map(([name, d]) => {
      return {
        name: name,
        caption: d.caption,
        editable: d.editable,
        primary_key: d.primary_key,
        edit_type: d.edit_type,
        edit: false,
        criteria: [[]],
        display_on_card: null,
        type: d.type,
      };
    }),
  };
  //console.log(xyz);
  return [xyz];
}

export function compute_wips(query, column_name, column_caption) {
  let xyz = {
    name: column_name,
    caption: column_caption,
    query: query.name,
    fields: Object.entries(query.fields).map(([name, d]) => {
      return {
        name: name,
        caption: d.caption,
        editable: d.editable,
        edit: false,
        criteria: [[]],
        type: d.type,
        display_on_card: true,
      };
    }),
  };
  return xyz;
}
export function compute_outputs(query, wips, column_name, column_caption) {
  let wip_fields = [
    ...new Set(
      wips
        .map((w) => {
          return w.fields;
        })
        .flat()
        .filter((f) => {
          return f.edit;
        }),
    ),
  ].map((ff) => {
    return ff.name;
  });
  console.log("compute_output: wip_fields = ", wip_fields, "query=", query);

  let xyz = {
    name: column_name,
    caption: column_caption,
    query: query.name,
    fields: Object.entries(query.fields)
      .map(([name, d]) => {
        return wip_fields.includes(name) || d.primary_key
          ? {
              name: name,
              caption: d.caption,
              editable: d.editable,
              edit: false,
              criteria: [[]],
              type: d.type,
              display_on_card: true,
            }
          : null;
      })
      .filter((x) => {
        return x != null;
      }),
  };
  console.log("compute_outputs returning", xyz);
  return xyz;
}
