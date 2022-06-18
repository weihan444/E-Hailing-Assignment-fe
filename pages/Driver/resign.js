import Head from "next/head";
import DriverResignComponent from "../../Component/DriverResignComponent";

function resign() {
  return (
    <div>
      <Head>
        <title>Driver</title>
        <link rel="icon" href="/pupg-icon.ico" />
      </Head>

      <DriverResignComponent />
    </div>
  );
}

export default resign;
