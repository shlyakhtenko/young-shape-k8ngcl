import "./styles.css";
import PipelineEditor from "./pipeline_editor/PipelineEditor.js";
import Assignments from "./assignments/Assignment.js";
import Pipeline from "./pipelines/Pipeline.js";
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
//import Login from "./Login.js";
import PipelineList from "./pipeline_list/Pipeline_list.js";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import Button from "react-bootstrap/Button";
//import localStorage from "local-storage";

export const LoginContext = createContext();

export default function App() {
  let localstorage_loginToken = sessionStorage.getItem("loginToken");
  if (localstorage_loginToken) {
    localstorage_loginToken = JSON.parse(localstorage_loginToken);
  }
  const [loginToken, setLoginToken] = useState(localstorage_loginToken);
  //return <Login setLoginToken={setLoginToken} />;
  return (
    <GoogleOAuthProvider clientId="435223085160-t6cbke5ne7embk66a3d72s87ki1mm8ph.apps.googleusercontent.com">
      {!loginToken ? (
        <div className="Login">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              const url = "https://docs.ipam.ucla.edu/cocytus/login.php";

              fetch(url, {
                method: "POST",
                body: JSON.stringify(credentialResponse),
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((r) => {
                r.json().then((response) => {
                  setLoginToken(response);
                  sessionStorage.setItem(
                    "loginToken",
                    JSON.stringify(response),
                  );
                  //console.log(response);
                });
              });
            }}
            useOneTap
          ></GoogleLogin>
        </div>
      ) : (
        <LoginContext.Provider value={loginToken}>
          <div className="logout">
            Logged in as {loginToken.firstname} {loginToken.lastname}.{" "}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => {
                googleLogout();
                setLoginToken(null);
                sessionStorage.removeItem("loginToken");
              }}
            >
              Logout
            </Button>
          </div>

          <Routes>
            <Route
              path="/pipeline_manager/new"
              element={<PipelineEditor pipeline={"new"} />}
            />
            <Route
              path="/pipeline_manager/edit/:pipelineName"
              element={<PipelineEditor />}
            />

            <Route path="/workshop/:programCode/" element={<PipelineList />} />
            <Route
              path="/workshop/:programCode/:pipelineName"
              element={<Pipeline />}
            />
            <Route path="*" element={<Assignments />} />
          </Routes>
        </LoginContext.Provider>
      )}
    </GoogleOAuthProvider>
  );
}
