import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Clock from "react-live-clock";

const columns = [
  { field: "name", headerName: "Driver", sortable: false, width: 300 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "capacity", headerName: "Capacity", width: 110 },
  { field: "longitude", headerName: "Location", sortable: false, width: 130 },
  { field: "latitude", headerName: "", sortable: false, width: 130 },
  {
    field: "customer",
    headerName: "Customer",
    sortable: false,
    width: 300,
    valueGetter: (params) => {
      console.log(params);
      let name = "";
      if (params.value?.name) {
        name = params.value.name;
      }
      return name;
    },
  },
];

const DriverList = () => {
  const [tableData, setTableData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  function CustomFooterStatusComponent() {
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
                url: `http://localhost:8080/drivers/${id}`,
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
      url: "http://localhost:8080/drivers",
    })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Head>
        <title>Driver List</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>
      <Clock
        format="HH:mm:ss"
        ticking={true}
        style={{
          position: "fixed",
          top: "0px",
          right: "0px",
          backgroundColor: "white",
          borderRadius: "5px 5px 5px 5px",
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
        }}
      >
        Drivers List
      </h1>

      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          checkboxSelection
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

export default DriverList;
