import { DataGrid } from "@mui/x-data-grid";
import Head from "next/head";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
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
    width: 300,
  },
];

const ChooseDriver = (props) => {
  const [select, setSelection] = useState(-1);
  const [drivers, setDrivers] = useState([]);
  const [x, setX] = useState(-999);
  const [y, setY] = useState(-999);
  const [click, setClick] = useState(false);
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

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/drivers/status/available",
    }).then((response) => {
      const hms = expected_arrival_time.split(":");
      let hours = Number(hms[0]);
      let minutes = Number(hms[1]);
      let seconds = Number(hms[2]);

      if (response.data) {
        const data = response.data;
        data.forEach((row) => {
          axios({
            method: "post",
            url: "http://localhost:8080/distance",
            data: { driverId: row.id, customerId: id },
          }).then((res) => {
            let total = res.data;
            hours = hours + res.data / 3600;
            total = total % 3600;
            minutes = minutes + res.data / 60;
            total = total % 60;
            seconds = seconds + total;
            if (seconds >= 60) {
              seconds = seconds % 60;
              minutes = minutes + 1;
            }
            if (minutes >= 60) {
              minutes = minutes % 60;
              hours = hours + 1;
            }
            hours = Math.floor(hours);
            minutes = Math.floor(minutes);
            seconds = Math.floor(seconds);
            row.time = `${hours < 10 ? "0" + hours : hours}:${
              minutes < 10 ? "0" + minutes : minutes
            }:${seconds < 10 ? "0" + seconds : seconds}`;
            setDrivers(response.data);
          });
        });
      }
    });
  }, []);

  function CustomFooterStatusComponent() {
    return (
      <div>
        <Button
          onClick={() => {
            axios({
              method: "post",
              url: `http://localhost:8080/drivers/${drivers[select]?.id}/fetch/${id}`,
            }).then(() => {
              setInterval(() => {
                axios({
                  method: "get",
                  url: `http://localhost:8080/drivers/${drivers[select]?.id}`,
                }).then((response) => {
                  setX(response.data.longitude);
                  setY(response.data.latitude);
                });
              }, 1000);
            });
          }}
        >
          Confirm
        </Button>
      </div>
    );
  }

  function ChooseDriver() {
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

  function ViewStatus() {}

  return (
    <div>
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
      {click ? <ViewStatus /> : <ChooseDriver />}
    </div>
  );
};

export default withRouter(ChooseDriver);
