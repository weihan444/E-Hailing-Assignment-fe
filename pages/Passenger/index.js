import Head from "next/head";
import Box from "@mui/material/Box";
import PassengerPageButton from "../../Component/PassengerPageButton";
import Link from "next/link";

function Passenger() {
  return (
    <div
      style={{
        backgroundImage: "url(update-bg.png)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Head>
        <title>Passenger Page</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

      <div>
        <PassengerPageButton />
      </div>
    </div>
  );
}

export default Passenger;
