import React, { useState } from "react";
import axios from "axios";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TotalCountView from "./TotalCountView";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function Statslist({ searchCriteria }) {
  const [stats, setStats] = useState([]);

  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const baseUrl = `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/`;
    const fetchStats = async () => {
      await axios
        .get(
          `${baseUrl}?start_date=${searchCriteria.startDate}&end_date=${searchCriteria.endDate}`,
          {
            headers: {
              Authorization: `Bearer ${searchCriteria.token}`,
            },
          }
        )
        .then((response) => {
          setShowData(true);
          setStats(response.data);
        })
        .catch((error) => {
          setShowData(false);
          if (error.response.status === 401) {
            toast.error("Incorrect token", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            console.error(error);
          } else if (error.response.status === 400) {
            toast.error(error.response.data.non_field_errors[0], {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            console.error(error);
          } else {
            toast.error("Error fetching data", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
            console.error(error);
          }
        });
    };
    fetchStats();
  }, [searchCriteria]);

  const columns = [
    {
      Header: "Conversation count",
      accessor: "conversation_count",
      width: "25%",
    },
    {
      Header: "Missed chat count",
      accessor: "missed_chat_count",
      width: "25%",
    },
    {
      Header: "Visitors with conversation count",
      accessor: "visitors_with_conversation_count",
      width: "25%",
    },
    {
      Header: "Date",
      accessor: "date",
      width: "25%",
    },
  ];

  return (
    <div className="container">
      <ToastContainer autoClose={3000} />
      {showData ? (
        <>
          <motion.div
            className="card-container"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
          >
            <TotalCountView
              stat={{
                title: Object.keys(stats)[10],
                value: Object.values(stats)[10],
              }}
            />
            <TotalCountView
              stat={{
                title: Object.keys(stats)[11],
                value: Object.values(stats)[11],
              }}
            />
            <TotalCountView
              stat={{
                title: Object.keys(stats)[12],
                value: Object.values(stats)[12],
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
          >
            <ReactTable
              pageSize={5}
              showPageSizeOptions={false}
              sortable
              data={stats.by_date}
              columns={columns}
              className="-striped -highlight"
            />
          </motion.div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

Statslist.propTypes = {
  baseUrl: PropTypes.string,
  showData: PropTypes.bool,
  stats: PropTypes.array,
  columns: PropTypes.array,
  fetchStats: PropTypes.func,
};
