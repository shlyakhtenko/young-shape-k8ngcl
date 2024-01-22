export default function get_pipeline_data() {
  return [
    {
      data_source: "query",
      name: "confirm_speakers",
      caption: "Confirm Speakers",
      inputs: [
        {
          name: "inputs",
          caption: "Input Column",
          query: "v_speakers",
          fields: [
            {
              name: "firstname",
              caption: "First Name",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "lastname",
              caption: "Last Name",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: false,
              criteria: [[]],
              display: null,
              type: "selectyes_no",
            },
            {
              name: "email",
              caption: "E-mail",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              primary_key: true,
              edit: false,
              criteria: [[]],
              display: null,
              type: "integer",
            },
          ],
        },
      ],
      wips: [
        {
          name: "wip01",
          caption: "Emailed",
          query: "v_speakers",
          fields: [
            {
              name: "firstname",
              caption: "First Name",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "lastname",
              caption: "Last Name",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: true,
              criteria: [[]],
              type: "selectyes_no",
              display: true,
            },
            {
              name: "email",
              caption: "E-mail",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "integer",
              display: true,
            },
          ],
        },
      ],
      outputs: [
        {
          name: "outputs01",
          caption: "Accepted",
          query: "v_speakers",
          fields: [
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: false,
              criteria: [[{ op: "=1" }]],
              type: "selectyes_no",
              display: true,
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "integer",
              display: true,
            },
          ],
        },
        {
          name: "outputs11",
          caption: "Declined",
          query: "view_speakers",
          fields: [
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: false,
              criteria: [[{ op: "=0" }]],
              type: "selectyes_no",
              display: true,
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "integer",
              display: true,
            },
          ],
        },
      ],
    },
    {
      data_source: "query",
      name: "speaker_titles",
      caption: "Speaker Titles",
      inputs: [
        {
          name: "inputs",
          caption: "Input Column",
          query: "speaker_titles",
          fields: [
            {
              name: "firstname",
              caption: "First Name",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "lastname",
              caption: "Last Name",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: false,
              criteria: [[{ op: "=1" }]],
              display: null,
              type: "selectyes_no",
            },
            {
              name: "email",
              caption: "E-mail",
              editable: false,
              edit: false,
              criteria: [[]],
              display: null,
              type: "string",
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              primary_key: true,
              edit: false,
              criteria: [[]],
              display: null,
              type: "integer",
            },
            {
              name: "title",
              caption: "Talk title",
              editable: true,
              edit: false,
              criteria: [[]],
              display: null,
              type: "textarea",
            },
            {
              name: "abstract",
              caption: "Abstract",
              editable: true,
              edit: false,
              criteria: [[]],
              display: null,
              type: "textarea",
            },
          ],
        },
      ],
      wips: [
        {
          name: "wip01",
          caption: "Title",
          query: "speaker_titles",
          fields: [
            {
              name: "firstname",
              caption: "First Name",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "lastname",
              caption: "Last Name",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "confirmed",
              caption: "Confirmed",
              editable: true,
              edit: false,
              criteria: [[]],
              type: "selectyes_no",
              display: false,
            },
            {
              name: "email",
              caption: "E-mail",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "string",
              display: true,
            },
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "integer",
              display: false,
            },
            {
              name: "title",
              caption: "Talk title",
              editable: true,
              edit: true,
              criteria: [[]],
              type: "textarea",
              display: true,
            },
            {
              name: "abstract",
              caption: "Abstract",
              editable: true,
              edit: true,
              criteria: [[]],
              type: "textarea",
              display: true,
            },
          ],
        },
      ],
      outputs: [
        {
          name: "outputs01",
          caption: "Finished",
          query: "speaker_titles",
          fields: [
            {
              name: "userid",
              caption: "User ID",
              editable: false,
              edit: false,
              criteria: [[]],
              type: "integer",
              display: true,
            },
            {
              name: "title",
              caption: "Talk title",
              editable: true,
              edit: false,
              criteria: [[]],
              type: "textarea",
              display: true,
            },
            {
              name: "abstract",
              caption: "Abstract",
              editable: true,
              edit: false,
              criteria: [[]],
              type: "textarea",
              display: true,
            },
          ],
        },
      ],
    },
  ];
}
