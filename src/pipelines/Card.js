export default function Card(props) {
  return (
    <div className="Card">
      {Object.entries(props.data).map(([name, c]) => {
        return c.display_on_card || c.editable ? (
          <div key={name} className={c.editable ? "Editable" : "NotEditable"}>
            {c.caption}: {c.value}
          </div>
        ) : null;
      })}
    </div>
  );
}
