import { DataGrid } from "@mui/x-data-grid";
import { drivers } from "../data/data";
import Head from "next/head";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";

const PrismaZoom = dynamic(() => import("react-prismazoom"), { ssr: false });

const columns = [
  { field: "driver", headerName: "Driver", sortable: false, width: 150 },
  { field: "capacity", headerName: "Capacity", width: 90 },
  { field: "longitude", headerName: "Longitude", sortable: false, width: 140 },
  { field: "latitude", headerName: "Latitude", sortable: false, width: 140 },
];

function CustomFooterStatusComponent() {
  return (
    <div>
      <Link href="//Passenger">
        <Button>Confirm</Button>
      </Link>
    </div>
  );
}

const chooseDriver = () => {
  const [select, setSelection] = useState(0);

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
            width: "100%",
            height: "100%",
          }}
          maxZoom="8"
        >
          <LocationOnIcon
            sx={{
              position: "absolute",
              left: `${drivers[select].longitude}px`,
              top: `${drivers[select].latitude}px`,
              transform: "translate(-50%, -95%)",
              color: "red",
            }}
          />
          <img src="../erangel.jpg" alt="test" height="100%" />
        </PrismaZoom>
      </div>

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
          onSelectionModelChange={(newSelection) => {
            setSelection(newSelection - 1);
          }}
        />
      </div>
    </div>
  );
};

export default chooseDriver;
