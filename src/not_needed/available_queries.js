export default function get_data_sources() {
  return [
    {
      name: "query",
      caption: "PITS data",
      available_queries: [
        {
          name: "v_speakers",
          caption: "All speaker data",
          fields: {
            firstname: {
              caption: "First Name",
              type: "string",
              editable: false,
            },
            lastname: {
              caption: "Last Name",
              type: "string",
              editable: false,
            },
            confirmed: {
              caption: "Confirmed",
              type: "selectyes_no",
              editable: true,
            },
            email: {
              caption: "E-mail",
              type: "string",
              editable: false,
            },
            userid: {
              caption: "User ID",
              type: "integer",
              editable: false,
              primary_key: true,
            },
          },
        },
        {
          name: "C",
          caption: "All speaker titles",
          fields: {
            firstname: {
              caption: "First Name",
              type: "string",
              editable: false,
            },
            lastname: {
              caption: "Last Name",
              type: "string",
              editable: false,
            },
            confirmed: {
              caption: "Confirmed",
              type: "selectyes_no",
              editable: true,
            },
            email: {
              caption: "E-mail",
              type: "string",
              editable: false,
            },
            userid: {
              caption: "User ID",
              type: "integer",
              primary_key: true,
              editable: false,
            },
            title: {
              caption: "Talk title",
              type: "textarea",
              editable: true,
            },
            abstract: {
              caption: "Abstract",
              type: "textarea",
              editable: true,
            },
          },
        },
      ],
    },
    {
      name: "excel",
      caption: "Excel data",
      available_queries: [
        {
          name: "paste_name_email",
          caption: "Paste name and email",
          fields: {
            firstname: {
              caption: "First Name",
              type: "string",
              editable: false,
            },
            lastname: {
              caption: "Last Name",
              type: "string",
              editable: false,
            },
            userid: {
              caption: "User ID",
              type: "integer",
              editable: true,
            },
            email: {
              caption: "E-mail",
              type: "string",
              primary_key: true,
              editable: false,
            },
          },
        },
      ],
    },
    {
      name: "pipeline_output",
      caption: "Output of another pipeline",
      available_queries: [],
    },
  ];
}
