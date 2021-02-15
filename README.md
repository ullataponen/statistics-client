# React Application for displaying statistical data

This project is a React application that utilizes a REST API to display statistical data.

## Installation

Project repo may be downloaded from GitHub and copied to local environment. Before use, libraries must be installed with `npm install` or `yarn add` command in the project directory. After installation, project can be started with `npm start` / `yarn start` command.

## Deployed version

The application is deployed on Heroku and may be accessed here: [https://statistics-client.herokuapp.com/](https://statistics-client.herokuapp.com/). No username or password is required for accessing the page but data can only be fetched with the correct access token.

## How does it work?

Initially the application shows only the form and user input is required for the data to be displayed. User inserts the start and end date and the access token. All fields are mandatory. If the date range is incorrect or the token is missing or incorrect, the app will display an error message temporarily.

When the correct date range and access token are input, the application will send an http request to the REST API to fetch the data. If the fetch is unsuccessful, the application will display an error message temporarily. If the fetch is successful, the user will see the data on the display. User's date and access token inputs are saved into the browser's local storage.

## Who will use this project?

Anyone can copy the repository for their own, non-commercial purposes. The creator and repository owner may use the skills learned during this project in future projects.

## What is the goal of this project?

This project's purpose is to practice using React library to fetch and display REST API data on a responsive and easy-to-use UI.

## Used technologies

- React
- JavaScript
- HTML (JSX)
- CSS (Material UI & stylesheet)
- Dependencies:
  - [Axios](https://github.com/axios/axios) for HTTP requests
  - [React Table v6](https://github.com/tannerlinsley/react-table/tree/v6) for displaying tabular data
  - [Material UI](https://material-ui.com/) for top banner, input form and button, product cards
  - [Toastify](https://fkhadra.github.io/react-toastify/introduction) for toast messages
  - [Moment](https://momentjs.com/) for date formatting
  - [@date-io/moment](https://github.com/dmtrKovalenko/date-io) as utility for Material UI datepicker
  - [PropTypes](https://www.npmjs.com/package/prop-types) for type checking
  - [Framer Motion](https://www.framer.com/motion/) for animations
