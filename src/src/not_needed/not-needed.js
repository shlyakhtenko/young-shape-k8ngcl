
/*
let columns = {
  inputs: [
    {
      name: "inputs",
      caption: "Input Column",
      query: "all_pits_data",
      fields: [
        {
          name: "userid",
          caption: "User ID",
          editable: false,
          primary_key: true,
          display: null,
          edit: false,
          criteria: [
            // or criteria list
            [
              // and criteria list
              { op: "<>NULL" },
            ],
          ],
        },
        {
          name: "firstname",
          caption: "First Name",
          editable: false,
          display: null,
          primary_key: false,
          edit: false,
          criteria: [[]],
        },
        {
          name: "lastname",
          caption: "Last Name",
          editable: false,
          display: null,
          primary_key: false,
          edit: false,
          criteria: [[]],
        },
        {
          name: "confirmed",
          caption: "Confirmed",
          primary_key: false,
          display: null,
          editable: true,
          edit: false,
          criteria: [[]],
        },
      ],
    },
  ],
  wips: [
    {
      name: "wips1",
      caption: "Work in Progress Column 1",
      query: "inputs",
      fields: [
        {
          name: "userid",
          caption: "User ID",
          editable: false,
          display: false,
          edit: false,
          primary_key: true,
          criteria: [
            // or criteria list
            [
              // and criteria list
              { op: "<>NULL" },
            ],
          ],
        },
        {
          name: "firstname",
          caption: "First Name",
          editable: false,
          display: true,
          edit: false,
          primary_key: false,
          criteria: [[]],
        },
        {
          name: "lastname",
          caption: "Last Name",
          editable: false,
          display: true,
          primary_key: false,
          edit: false,

          criteria: [[]],
        },
        {
          name: "confirmed",
          caption: "Confirmed",
          editable: true,
          display: true,
          primary_key: false,
          edit: true,
          criteria: [[]],
        },
      ],
    },
  ],
  outputs: [
    {
      name: "outputs",
      caption: "Outputs",
      query: "inputs",
      fields: [
        {
          name: "userid",
          caption: "User ID",
          editable: false,
          edit: false,
          primary_key: true,
          criteria: [
            // or criteria list
            [
              // and criteria list
              { op: "<>NULL" },
            ],
          ],
        },
        {
          name: "confirmed",
          caption: "Confirmed",
          editable: true,
          edit: false,
          criteria: [[{ op: "<>NULL" }]],
        },
      ],
    },
  ],
};
*/
