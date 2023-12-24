import "./styles.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { get_card_data } from "./card_data";
import Card from "./Card";

export default function Pipeline() {
  let params = useParams();
  let card_data = get_card_data(params.pipelineName, params.programCode);
  const [cards, setCards] = useState(card_data.cards);
  const [columns, setColumns] = useState(card_data.columns);

  return (
    <div className="Pipeline">
      <h1>
        Pipeline: {params.pipelineName}, Workhshop: {params.programCode}
      </h1>
      <div className="Columns">
        {columns.map((c) => {
          return (
            <div className="columnContainer">
              <h2>{c.caption}</h2>
              <div className="column" key={c.name}>
                {cards
                  .filter((x) => x.target_column === c.name)
                  .map((c) => {
                    return (
                      <Card
                        key={c.card_id}
                        data={c.card_data}
                        id={c.card_id}
                        setter={setCards}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
