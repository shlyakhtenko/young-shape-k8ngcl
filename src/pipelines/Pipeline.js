import "./styles.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { get_card_data } from "./card_data";
import { ReactSortable } from "react-sortablejs";
import PartCard from "./Card";

export default function Pipeline() {
  let params = useParams();
  let card_data = get_card_data(params.pipelineName, params.programCode);
  var column_cards = [];
  var setColumn_cards = [];
  let columns = card_data.columns;
  columns.forEach((c) => {
    [column_cards[c.name], setColumn_cards[c.name]] = useState(
      card_data.cards.filter((cc) => cc.target_column === c.name),
    );
  });
  //const [columns, setColumns] = useState(card_data.columns);

  return (
    <div className="Pipeline">
      <h1>
        Pipeline: {params.pipelineName}, Workhshop: {params.programCode}
      </h1>
      <div className="Columns">
        {columns.map((c) => {
          return (
            <div className="columnContainer" key={c.name}>
              <h2>{c.caption}</h2>
              <ReactSortable
                className="column"
                key={c.name}
                group={{
                  name: c.name,
                  pull: c.pull,
                  put: c.put,
                }}
                list={column_cards[c.name]}
                setList={setColumn_cards[c.name]}
                setList1={(newlist, callback = () => {}) => {
                  console.log(
                    "Sortable setlist newlist =",
                    newlist,
                    "callback",
                    callback,
                  );
                  console.log("Newlist", newlist);
                  console.log(
                    "got new list",
                    newlist,
                    "for column",
                    c.name,
                    "will update with",
                    newlist.map((cc) => {
                      return {
                        ...cc,
                        target_column: c.name,
                      };
                    }),
                  );

                  return setColumn_cards[c.name](
                    newlist.map((cc) => {
                      return {
                        ...cc,
                        target_column: c.name,
                      };
                    }, callback),
                  );
                }}
              >
                {column_cards[c.name].map((ccc) => {
                  return (
                    <div key={ccc.card_id}>
                      <PartCard
                        data={ccc.card_data}
                        card_id={ccc.card_id}
                        id={ccc.card_id}
                        field_update_function={(field_name, field_value) => {
                          setColumn_cards[c.name](
                            column_cards[c.name].map((card) => {
                              return card.card_id != ccc.card_id
                                ? card
                                : {
                                    ...card,
                                    card_data: {
                                      ...card.card_data,
                                      [field_name]: {
                                        ...card.card_data[field_name],
                                        value: field_value,
                                      },
                                    },
                                  };
                            }),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </ReactSortable>
            </div>
          );
        })}
      </div>
    </div>
  );
}
