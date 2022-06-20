import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { Button, Rating, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Clock from "react-live-clock";
import axios from "axios";
import Link from "next/link";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const PrismaZoom = dynamic(() => import("react-prismazoom"), { ssr: false });

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
  { field: "name", headerName: "Driver", sortable: false, width: 130 },
  { field: "capacity", headerName: "Capacity", width: 80 },
  { field: "longitude", headerName: "Location", sortable: false, width: 75 },
  { field: "latitude", headerName: "", sortable: false, width: 75 },
  {
    field: "time",
    headerName: "Arrival Time",
    sortable: true,
    width: 120,
  },
  {
    field: "rating",
    headerName: "Rating",
    sortable: false,
    width: 85,
    valueGetter: (params) => {
      if (params.row.rating !== 0 && params.row.rating !== 0) {
        const rating = params.row.rating / params.row.ratingCount;
        return rating.toFixed(1);
      }
      return "0.0";
    },
  },
];

let clicked = false;
let selectedDriver = null;

const ChooseDriver = (props) => {
  const [select, setSelection] = useState(-1);
  const [selectedId, setSelectedId] = useState(-1);
  const [drivers, setDrivers] = useState([]);
  const [x, setX] = useState(-999);
  const [y, setY] = useState(-999);
  const [click, setClick] = useState(false);
  const [custStatus, setCustStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [reached, setReached] = useState(false);
  const [rating, setRating] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const {
    id,
    name,
    status,
    expected_arrival_time,
    capacity,
    longitude,
    latitude,
    dest_longitude,
    dest_latitude,
  } = props.router.query;

  selectedDriver = drivers[select];
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios({
      method: "get",
      url: "http://localhost:8080/drivers/status/available",
    }).then((response) => {
      const expected_time = new Date();

      if (response.data) {
        const data = response.data;
        const promises = [];
        data.forEach((row) => {
          promises.push(
            axios({
              method: "post",
              url: "http://localhost:8080/distance",
              data: { driverId: row.id, customerId: id },
            })
          );
        });
        Promise.all(promises).then((array) => {
          array.forEach((res, idx) => {
            const total = res.data;
            expected_time.setTime(expected_time.getTime() + total * 1000);
            const hours = expected_time.getHours();
            const minutes = expected_time.getMinutes();
            const seconds = expected_time.getSeconds();
            data[idx].time = `${hours < 10 ? "0" + hours : hours}:${
              minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`;
          });
        });
        Promise.allSettled(promises).then(() => {
          console.log("Updated");
          setLastUpdate(expected_time?.toString().substring(16, 24));
          setDrivers(
            response.data.filter(
              (r) => r.capacity >= capacity && expected_arrival_time >= r.time
            )
          );
        });
      }
    });
  }

  function getLocation() {
    axios({
      method: "get",
      url: `http://localhost:8080/drivers/${selectedDriver?.id}`,
    }).then((response) => {
      setX(response.data.longitude);
      setY(response.data.latitude);
      setLastUpdate(new Date().toString().substring(16, 24));
    });
    axios({
      method: "get",
      url: `http://localhost:8080/customers/${id}`,
    }).then((response) => {
      setCustStatus(response.data.status);
      if (response.data.status === "REACHED") {
        setReached(true);
      }
    });
  }

  function ChooseDriverComponent() {
    return (
      <div
        style={{
          height: "60vh",
          width: "45%",
          position: "absolute",
          top: "50%",
          left: "75%",
          transform: "translate(-50%,-65%)",
        }}
      >
        <h1
          style={{
            fontFamily: "cursive",
            textAlign: "center",
            fontStyle: "oblique",
            fontSize: "30px",
          }}
        >
          Choose Your Driver
        </h1>
        <DataGrid
          rows={drivers}
          columns={columns}
          sx={{
            backgroundColor: "rgb(255,255,255,0.7)",
            overflow: "hidden",
            borderRadius: "15px",
          }}
          disableColumnMenu
          hideFooter
          selectionModel={selectedId}
          onSelectionModelChange={(ids) => {
            const selectedID = ids[0];
            if (drivers) {
              drivers.forEach((driver, idx) => {
                if (driver.id === selectedID) {
                  setSelectedId(selectedID);
                  setSelection(idx);
                  setX(driver.longitude);
                  setY(driver.latitude);
                }
              });
            }
          }}
        />
        <h3
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "powderblue",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          Last Update: {lastUpdate}
        </h3>
        <Button
          variant="contained"
          sx={{ margin: "5px", float: "right" }}
          onClick={() => {
            if (drivers[select]) {
              axios({
                method: "post",
                url: `http://localhost:8080/distance`,
                data: { driverId: drivers[select].id, customerId: id },
              }).then((res) => {
                const expected_time = new Date();
                const total = res.data;
                expected_time.setTime(expected_time.getTime() + total * 1000);
                const hours = expected_time.getHours();
                const minutes = expected_time.getMinutes();
                const seconds = expected_time.getSeconds();
                const processedEAT = `${hours < 10 ? "0" + hours : hours}:${
                  minutes < 10 ? "0" + minutes : minutes
                }:${seconds < 10 ? "0" + seconds : seconds}`;
                if (expected_arrival_time >= processedEAT) {
                  axios({
                    method: "post",
                    url: `http://localhost:8080/drivers/${drivers[select]?.id}/fetch/${id}`,
                  }).then(() => {
                    setClick(true);
                    clicked = true;
                  });
                } else {
                  alert("This driver no longer fulfils your time requirement.");
                }
              });
            } else {
              alert("Please select a driver.");
            }
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }

  function ViewStatus() {
    return (
      <div
        style={{
          height: "500px",
          width: "40%",
          position: "absolute",
          top: "50%",
          left: "75%",
          transform: "translate(-50%,-50%)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(255,255,255,0.7)",
          borderRadius: "15px",
        }}
      >
        <h1 style={{ margin: "10px", color: "brown", paddingLeft: "15px" }}>
          Driver Information
        </h1>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>
          Driver Name: {selectedDriver.name}
        </h3>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>Longitude: {x}</h3>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>Latitude: {y}</h3>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>
          Expected Arrival Time: {selectedDriver.time}
        </h3>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>
          Current Status: {custStatus}
        </h3>
        <h3 style={{ margin: "10px", paddingLeft: "15px" }}>
          Last Update: {lastUpdate}
        </h3>
        {reached ? (
          <>
            <Typography component="legend">Rate Driver</Typography>
            <Rating
              name="Driver Rating"
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
            />
            <Button
              sx={{
                float: "left",
                margin: "10px",
                width: "30%",
                paddingLeft: "15px",
              }}
              variant="contained"
              disabled={disableButton}
              onClick={() => {
                setDisableButton(true);
                axios({
                  method: "put",
                  url: `http://localhost:8080/drivers/${selectedDriver.id}/rate`,
                  data: { rating: rating },
                });
              }}
            >
              Submit Review
            </Button>
            <Link href="/">
              <Button
                sx={{ float: "left", margin: "10px" }}
                variant="contained"
              >
                Back
              </Button>
            </Link>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <IconButton
          color="secondary"
          size="small"
          href="/Passenger"
          sx={{ float: "left", marginLeft: "10px" }}
          onClick={() => {
            axios({
              method: "delete",
              url: `http://localhost:8080/customers/${id}`,
            });
          }}
        >
          <ArrowBackIosIcon />
          <h4>Back</h4>
        </IconButton>
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
            if (!clicked && Math.floor(date / 1000) % 5 === 0) {
              getData();
            }
            if (clicked) {
              getLocation();
            }
          }}
        />
        <Head>
          <title>Choose Driver</title>
          <link rel="icon" href="/pupg-icon.ico" />
        </Head>

        <div
          style={{
            display: "flex",
            height: "calc(100vh - 80px)",
            width: "calc(100vh - 80px)",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            margin: "15px",
            position: "absolute",
            left: "25%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <PrismaZoom
            style={{
              display: "block",
              width: "674px",
              height: "674px",
            }}
            maxZoom="8"
          >
            <DirectionsCarIcon
              sx={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -95%)",
                color: "red",
              }}
            />
            <LocationOnIcon
              sx={{
                position: "absolute",
                left: `${longitude}px`,
                top: `${latitude}px`,
                transform: "translate(-50%, -95%)",
                color: "powderblue",
              }}
            />
            <LocationOnIcon
              sx={{
                position: "absolute",
                left: `${dest_longitude}px`,
                top: `${dest_latitude}px`,
                transform: "translate(-50%, -95%)",
                color: "greenyellow",
              }}
            />
            <img src="../erangel.jpg" alt="test" height="100%" />
          </PrismaZoom>
        </div>
        {click ? <ViewStatus /> : <ChooseDriverComponent />}
      </ThemeProvider>
    </div>
  );
};

export default withRouter(ChooseDriver);
