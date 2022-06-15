import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Clock from "react-live-clock";
import axios from "axios";

const PrismaZoom = dynamic(() => import("react-prismazoom"), { ssr: false });

const columns = [
  { field: "name", headerName: "Driver", sortable: false, width: 150 },
  { field: "capacity", headerName: "Capacity", width: 90 },
  { field: "longitude", headerName: "Longitude", sortable: false, width: 140 },
  { field: "latitude", headerName: "Latitude", sortable: false, width: 140 },
  {
    field: "time",
    headerName: "Expected Arrival Time",
    sortable: true,
    width: 140,
  },
];

let clicked = false;
let selectedDriver = null;

const ChooseDriver = (props) => {
  const [select, setSelection] = useState(-1);
  const [drivers, setDrivers] = useState([]);
  const [x, setX] = useState(-999);
  const [y, setY] = useState(-999);
  const [click, setClick] = useState(false);
  const [custStatus, setCustStatus] = useState(null);
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
            setDrivers(
              response.data.filter(
                (r) => r.capacity >= capacity && expected_arrival_time >= r.time
              )
            );
          });
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
    });
    axios({
      method: "get",
      url: `http://localhost:8080/customers/${id}`,
    }).then((response) => {
      setCustStatus(response.data.status);
    });
  }

  function CustomFooterStatusComponent() {
    return (
      <div>
        <Button
          onClick={() => {
            axios({
              method: "post",
              url: `http://localhost:8080/drivers/${drivers[select]?.id}/fetch/${id}`,
            }).then((res) => {
              setClick(true);
              clicked = true;
            });
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }
  function ChooseDriverComponent() {
    return (
      <div
        style={{
          height: "60vh",
          width: "40%",
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
          components={{
            Footer: CustomFooterStatusComponent,
          }}
          onSelectionModelChange={(ids) => {
            const selectedID = ids[0];
            if (drivers) {
              drivers.forEach((driver, idx) => {
                if (driver.id === selectedID) {
                  setSelection(idx);
                  setX(driver.longitude);
                  setY(driver.latitude);
                }
              });
            }
          }}
        />
      </div>
    );
  }

  function ViewStatus() {
    return (
      <div
        style={{
          height: "60vh",
          width: "40%",
          position: "absolute",
          top: "50%",
          left: "75%",
          transform: "translate(-50%,-65%)",
        }}
      >
        <h3>Driver Location -</h3>
        <h3>Longitude: {x}</h3>
        <h3>Latitude: {y}</h3>
        <h3>Driver Status: {custStatus}</h3>
      </div>
    );
  }

  return (
    <div>
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
          <LocationOnIcon
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
    </div>
  );
};

export default withRouter(ChooseDriver);
