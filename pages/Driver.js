import Head from "next/head";
import dynamic from "next/dynamic";

const DriverPageComponent = dynamic(
  () => import("../Component/DriverPageComponent"),
  { ssr: false }
);

function Driver() {
  return (
    <div
      style={{
        backgroundImage: "url(driver-bg.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Head>
        <title>Driver</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

      <div>
        <DriverPageComponent />
      </div>
    </div>
  );
}

export default Driver;
