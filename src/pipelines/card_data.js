export function get_card_data(pipeline, program_code) {
  console.log(pipeline, program_code);
  let card_data = {
    cards: [
      {
        card_id: 0,
        card_data: {
          userid: { value: 19345, editable: false, caption: "User ID" },
          firstname: {
            value: "XXXXX",
            editable: false,
            caption: "First Name",
            display_on_card: true,
          },
          lastname: {
            value: "Aarseth",
            editable: false,
            caption: "Last Name",
            display_on_card: true,
          },
          email: {
            value: "asdfasdf@asdfasdf",
            editable: false,
            caption: "E-mail",
          },
          comment: {
            value: null,
            editable: true,
            caption: "Comments",
            edit_type: "textarea",
          },
          title: {
            value: "N-Body Treatment of Binaries",
            editable: true,
            caption: "Title",
            edit_type: "default",
          },
          abstract: {
            value: "",
            editable: true,
            caption: "Abstract",
            edit_type: "textarea",
          },
        },
        target_column: "finished",
      },
      {
        card_id: 1,
        card_data: {
          userid: { value: 123123, editable: false, caption: "User ID" },
          firstname: {
            value: "Jane",
            editable: false,
            caption: "First Name",
            display_on_card: true,
          },
          lastname: {
            value: "Doe",
            editable: false,
            caption: "Last Name",
            display_on_card: true,
          },
          email: {
            value: "jane.doe@asdfasdf",
            editable: false,
            caption: "E-mail",
          },
          comment: {
            value: null,
            editable: true,
            caption: "Comments",
            edit_type: "textarea",
          },
          title: {
            value: "Large N-Body Treatment of Binaries",
            editable: true,
            caption: "Title",
            edit_type: "default",
          },
          abstract: {
            value:
              "Some text for abstract on large n-body treatment of Binaries",
            editable: true,
            caption: "Abstract",
            edit_type: "textarea",
          },
        },
        target_column: "finished",
      },
      {
        card_id: 3,
        card_data: {
          userid: { value: 23425, editable: false, caption: "User ID" },
          firstname: {
            value: "John",
            editable: false,
            caption: "First Name",
            display_on_card: true,
          },
          lastname: {
            value: "Doem",
            editable: false,
            caption: "Last Name",
            display_on_card: true,
          },
          email: {
            value: "john.doe@asdfasdf",
            editable: false,
            caption: "E-mail",
          },
          comment: {
            value: "Jonh's comments",
            editable: true,
            caption: "Comments",
            edit_type: "textarea",
          },
          title: {
            value: "A title on binaries",
            editable: true,
            caption: "Title",
            edit_type: "default",
          },
          abstract: {
            value: "Totally cool abstract on binaries",
            editable: true,
            caption: "Abstract",
            edit_type: "textarea",
          },
        },
        target_column: "in_progress",
      },
    ],
    columns: [
      { name: "speakers", pull: true, put: true, caption: "Speakers" },
      {
        name: "in_progress",
        pull: true,
        put: ["speakers", "finished"],
        caption: "In progress",
      },
      { name: "finished", pull: true, put: "in_progress", caption: "Finished" },
    ],
  };
  return card_data;
}
