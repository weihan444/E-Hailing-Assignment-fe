import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";

const columns = [
  { field: "name", headerName: "Customer", sortable: false, width: 300 },
  { field: "status", headerName: "status", width: 130 },
  { field: "capacity", headerName: "Capacity", width: 110 },
  { field: "expected_arrival_time", headerName: "Arrival Time", width: 130 },
  {
    field: "longitude",
    headerName: "Location",
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

  function CustomFooterStatusComponent(props) {
    return (
      <div>
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
      </div>
    );
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/customers",
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
        <title>Request List</title>
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
        Request List
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
          onSelectionModelChange={(ids) => {
            setSelectionModel(ids);
          }}
        />
      </div>
    </div>
  );
};

export default RequestList;
