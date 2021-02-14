import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function StatsForm(props) {
  const [searchCriteria, setSearchCriteria] = useState(props.searchCriteria);

  //   const handleChange = (event) => {
  //     console.log(event);

  //     setSearchCriteria({
  //       ...searchCriteria,
  //       [event.target.name]: event.target.value,
  //     });
  //   }; moment(date).format("YYYY-MM-DD")

  const handleStartDateChange = (date) => {
    setSearchCriteria({
      ...searchCriteria,
      startDate: new Date(date),
    });
  };

  const handleEndDateChange = (date) => {
    setSearchCriteria({
      ...searchCriteria,
      endDate: new Date(date),
    });
  };

  const handleTokenChange = (token) => {
    setSearchCriteria({
      ...searchCriteria,
      token: token.target.value,
    });
  };

  const fetchWithCriteria = () => {
    props.getProps(searchCriteria);
  };

  return (
    <div className="container form">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            format="yyyy-MM-DD"
            margin="normal"
            name="startDate"
            label="Start date"
            selected={searchCriteria.startDate}
            value={searchCriteria.startDate}
            onChange={(date) => handleStartDateChange(date)}
            KeyboardButtonProps={{
              "aria-label": "change start date",
            }}
          />
          <KeyboardDatePicker
            format="yyyy-MM-DD"
            margin="normal"
            name="endDate"
            label="End date"
            selected={searchCriteria.endDate}
            value={searchCriteria.endDate}
            onChange={(date) => handleEndDateChange(date)}
            KeyboardButtonProps={{
              "aria-label": "change end date",
            }}
          />
          <TextField
            type="password"
            margin="normal"
            id="standard-basic"
            name="token"
            label="Access Token"
            value={searchCriteria.token}
            onChange={(e) => handleTokenChange(e)}
          />
          <Button
            onClick={fetchWithCriteria}
            variant="outlined"
            color="secondary"
          >
            Search
          </Button>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
