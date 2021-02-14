import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  header: {
    fontSize: "3rem",
  },
  subheader: {
    fontSize: "1.5rem",
  },
});

export default function TotalCountView({ stat }) {
  const classes = useStyles();
  if (stat.title) stat.title = stat.title.replace(/\_/g, " ");

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Typography variant="h1" component="h1" className={classes.header}>
          {stat.value}
        </Typography>
        <Typography variant="h3" component="h3" className={classes.subheader}>
          {stat.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
