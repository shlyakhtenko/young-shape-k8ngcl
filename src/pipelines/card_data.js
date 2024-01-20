export async function get_card_data(
  pipeline,
  program_code,
  token,
  setter,
  raiseError,
) {
  const headers = {
    //authorization: "Basic " + token
  };
  const url =
    "https://docs.ipam.ucla.edu/cocytus/data_source.php?ipam_id=" +
    token.ipam_id +
    "&session_token=" +
    token.session_token +
    "&pipeline=" +
    pipeline +
    "&programcode=" +
    program_code;
  fetch(url, { mode: "cors", method: "GET", headers })
    .then((response) => {
      console.log("url", url);
      response
        .json()
        .then((data) => {
          //console.log("Got data:", data);
          setter(data);
          return;
        })
        .catch((err) => {
          raiseError(
            <div>
              <h1>JSON conversion error</h1>
              <h2>{"" + err}</h2>
              <div>{"url: " + url} </div>
              <div>
                Check your login credentials and whether the pipline name is
                valid
              </div>
            </div>,
          );
        });
    })
    .catch((err) => {
      raiseError(
        <div>
          <h1>Data load error</h1>
          <h2>{"" + err}</h2>
          <div>{"url: " + url} </div>
          <div>
            Check your login credentials and whether the pipline name is valid
          </div>
        </div>,
      );
    });
}
