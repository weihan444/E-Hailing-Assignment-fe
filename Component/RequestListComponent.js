import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import Clock from "react-live-clock";

const columns = [
  { field: "name", headerName: "Customer", sortable: false, width: 300 },
  { field: "status", headerName: "status", width: 130 },
  { field: "capacity", headerName: "Capacity", width: 110 },
  { field: "expected_arrival_time", headerName: "Arrival Time", width: 130 },
  {
    field: "longitude",
    headerName: "From",
    sortable: false,
    width: 110,
  },
  { field: "latitude", headerName: "", sortable: false, width: 110 },
  {
    field: "dest_longitude",
    headerName: "Destination",
    sortable: false,
    width: 110,
  },
  { field: "dest_latitude", headerName: "", sortable: false, width: 110 },
];

const RequestList = () => {
  const [tableData, setTableData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  function CustomFooterStatusComponent(props) {
    return (
      <div style={{ display: "flex", flexDirectioin: "row" }}>
        <Link href="/Admin">
          <IconButton aria-label="back">
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <IconButton
          onClick={() => {
            const selectedIDs = new Set(selectionModel);
            selectedIDs.forEach((id) => {
              axios({
                method: "delete",
                url: `http://localhost:8080/customers/${id}`,
              });
            });
            setTableData((r) => r.filter((x) => !selectedIDs.has(x.id)));
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <h3>Last Update: {lastUpdate}</h3>
      </div>
    );
  }

  useEffect(() => {
    getData();
    setLastUpdate(new Date().toString().substring(16, 24));
  }, []);

  function getData() {
    axios({
      method: "get",
      url: "http://localhost:8080/customers",
    })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
        setLastUpdate(new Date().toString().substring(16, 24));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      style={{
        backgroundImage: "url(/request-bg.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>Request List</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>
      <Clock
        format="HH:mm:ss"
        ticking={true}
        style={{
          position: "absolute",
          right: "0%",
          backgroundColor: "white",
          borderRadius: "20px",
          fontSize: "2vw",
          padding: "5px",
        }}
        onChange={(date) => {
          if (Math.floor(date / 1000) % 5 === 0) {
            getData();
            setLastUpdate(new Date().toString().substring(16, 24));
          }
        }}
      />
      <h1
        style={{
          fontFamily: "cursive",
          textAlign: "center",
          fontStyle: "oblique",
          fontSize: "40px",
          marginTop: "0px",
        }}
      >
        Request List
      </h1>

      <div style={{ height: "85.5vh", width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          checkboxSelection
          disableColumnMenu
          components={{
            Footer: CustomFooterStatusComponent,
          }}
          onSelectionModelChange={(ids) => {
            setSelectionModel(ids);
          }}
        />
      </div>
    </div>
  );
};

export default RequestList;
