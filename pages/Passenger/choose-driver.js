import Head from "next/head";
import dynamic from "next/dynamic";

const PCDC = dynamic(
  () => import("../../Component/PassengerChooseDriverComponent"),
  { ssr: false }
);

function DriverInfo() {
  return (
    <div
      style={{
        backgroundImage: "url(/passenger-bg.jpg)",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Head>
        <title>Driver</title>
        <link rel="icon" href="../pupg-icon.ico" />
      </Head>

      <div>
        <PCDC />
      </div>
    </div>
  );
}

export default DriverInfo;
