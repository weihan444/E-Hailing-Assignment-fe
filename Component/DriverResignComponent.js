import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Head from "next/head";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const columns = [
  { field: "name", headerName: "Driver", sortable: true, width: 200 },
  { field: "capacity", headerName: "Capacity", width: 100 },
  { field: "longitude", headerName: "Location", sortable: false, width: 90 },
  { field: "latitude", headerName: "", sortable: false, width: 90 },
  {
    field: "rating",
    headerName: "Rating",
    sortable: false,
    width: 100,
    valueGetter: (params) => {
      if (params.row.rating !== 0 && params.row.rating !== 0) {
        const rating = params.row.rating / params.row.ratingCount;
        return rating.toFixed(1);
      }
      return "0.0";
    },
  },
];

const ResignList = () => {
  const [tableData, setTableData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    getData();
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
    <div
      style={{
        backgroundImage: "url(/resign-bg.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Head>
        <title>Driver List</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <IconButton
          size="small"
          sx={{ float: "left", marginLeft: "10px" }}
          color="secondary"
          href="/Driver"
        >
          <ArrowBackIosIcon />
          <h5>BACK</h5>
        </IconButton>

        <h1
          style={{
            fontFamily: "cursive",
            textAlign: "center",
            fontStyle: "oblique",
            fontSize: "40px",
            marginTop: "0px",
            paddingTop: 50,
            textShadow:
              "0 0 10px #ebd9ce, 0 0 20px #ebd9ce, 0 0 30px #ede0d8, 0 0 40px #f5ede9, 0 0 50px #f5ede9",
          }}
        >
          RESIGN
        </h1>

        <div
          style={{
            height: "380px",
            width: "600px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <DataGrid
            rows={tableData}
            columns={columns}
            disableColumnMenu
            hideFooter
            sx={{
              backgroundColor: "rgb(255,255,255, 0.9)",
              color: "black",
              position: "center",
              borderRadius: 5,
              overflow: "hidden",
            }}
            onSelectionModelChange={(ids) => {
              setSelectionModel(ids);
            }}
          />

          <Button
            variant="contained"
            sx={{ float: "right", marginTop: 1 }}
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              selectedIDs.forEach((id) => {
                axios({
                  method: "delete",
                  url: `http://localhost:8080/drivers/${id}`,
                })
                  .then(alert("Thanks for joining us!"))
                  .then((window.location = "/"));
              });
              setTableData((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
          >
            Confirm
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ResignList;
