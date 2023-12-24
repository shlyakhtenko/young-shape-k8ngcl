import "./styles.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { get_card_data } from "./card_data";
import { ReactSortable } from "react-sortablejs";
import Card from "./Card";

export default function Pipeline() {
  let params = useParams();
  let card_data = get_card_data(params.pipelineName, params.programCode);
  let column_cards = [];
  let setColumn_cards = [];
  //const [columns, setColumns] = useState(card_data.columns);
  let columns = card_data.columns;
  columns.forEach((c) => {
    [column_cards[c.name], setColumn_cards[c.name]] = useState(
      card_data.cards.filter((x) => x.target_column === c.name),
    );
  });

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
                group={{
                  name: c.name,
                  pull: c.pull,
                  put: c.put,
                }}
                key={c.name}
                list={column_cards[c.name]}
                setList={setColumn_cards[c.name]}
              >
                {column_cards[c.name].map((cc) => {
                  {
                    console.log(column_cards[c.name]);
                  }
                  return (
                    <Card
                      key={cc.card_id}
                      data={cc.card_data}
                      id={cc.card_id}
                      setter={setColumn_cards[c.name]}
                      all_cards={column_cards[c.name]}
                    />
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
