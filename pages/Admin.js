import Head from "next/head";
import Box from "@mui/material/Box";
import AdminPageButton from "../Component/AdminPageButton";
import Link from "next/link";

function Admin() {
  return (
    <div
      style={{
        backgroundImage: "url(admin-bg.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Head>
        <title>🔞ADMIN ONLY🔞</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

      <div>
        <AdminPageButton />
      </div>
    </div>
  );
}

export default Admin;
