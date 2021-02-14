import Statslist from "./components/Statslist";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StatsForm from "./components/StatsForm";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [valuesInMemory, setValuesInMemory] = useState({
    startDateFromMemory: window.localStorage.getItem("startDate")
      ? window.localStorage.getItem("startDate")
      : null,
    endDateFromMemory: window.localStorage.getItem("endDate")
      ? window.localStorage.getItem("endDate")
      : null,
    tokenFromMemory: window.localStorage.getItem("token")
      ? window.localStorage.getItem("token")
      : null,
  });

  const [searchCriteria, setSearchCriteria] = useState({
    startDate: valuesInMemory.startDateFromMemory,
    endDate: valuesInMemory.endDateFromMemory,
    token: valuesInMemory.tokenFromMemory,
  });
  const minDate = new Date(2017, 4, 1);
  const maxDate = new Date(2017, 5, 15);

  const getAndForwardProps = (passedCriteria) => {
    if (
      passedCriteria.startDate >= passedCriteria.endDate ||
      passedCriteria.startDate < minDate ||
      passedCriteria.startDate > maxDate ||
      passedCriteria.endDate < minDate ||
      passedCriteria.endDate > maxDate ||
      !passedCriteria.token
    ) {
      toast.error(
        "Start or end date is incorrect, must be between 2017-05-01 and 2017-06-15",
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
      window.localStorage.clear();
      setSearchCriteria({
        startDate: "",
        endDate: "",
        token: "",
      });
    } else {
      setSearchCriteria({
        startDate: moment(passedCriteria.startDate).format("YYYY-MM-DD"),
        endDate: moment(passedCriteria.endDate).format("YYYY-MM-DD"),
        token: passedCriteria.token,
      });
      console.log(searchCriteria);
      window.localStorage.setItem(
        "startDate",
        moment(passedCriteria.startDate).format("YYYY-MM-DD")
      );
      window.localStorage.setItem(
        "endDate",
        moment(passedCriteria.endDate).format("YYYY-MM-DD")
      );
      window.localStorage.setItem("token", passedCriteria.token);
    }
  };

  const areSearchValuesInput = () => {
    return Object.values(searchCriteria).some((x) => x !== null && x !== "");
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6">Statistics Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <ToastContainer autoClose={3000} />
      <StatsForm
        searchCriteria={searchCriteria}
        getProps={getAndForwardProps}
      />
      {areSearchValuesInput() ? (
        <Statslist searchCriteria={searchCriteria} />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
