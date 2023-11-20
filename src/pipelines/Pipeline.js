import "../styles.css";
import { useParams } from "react-router-dom";

export default function Pipeline() {
  let params = useParams();
  console.log(params);
  return (
    <div>
      <h1>
        Pipeline: {params.pipelineName}, Workhshop: {params.programCode}
      </h1>
    </div>
  );
}
