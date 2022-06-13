import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

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
      if (params.value.name) {
        name = params.value.name;
      }
      return name;
    },
  },
];

function CustomFooterStatusComponent(props) {
  return (
    <div>
      <Link href="/Admin">
        <IconButton aria-label="back">
          <KeyboardBackspaceIcon />
        </IconButton>
      </Link>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
    </div>
  );
}

const DriverList = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/drivers",
    })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Head>
        <title>Driver List</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

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
          disableColumnMenu
          components={{
            Footer: CustomFooterStatusComponent,
          }}
        />
      </div>
    </div>
  );
};

export default DriverList;
