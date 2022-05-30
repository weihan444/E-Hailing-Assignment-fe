import DriverInfoPageComponent from "../Component/DriverInfoPageComponent"
import Head from 'next/head'


function DriverInfo() {
  return (
    <div>
            
            <Head>
                <title>Driver</title>
                <link rel="icon" href="/pupg-icon.ico" />
            </Head>

            <div style={{
                position: "absolute", 
                top: "50%", 
                left: "50%",
                transform: "translate(-50%, -50%)"
                }}>
                <DriverInfoPageComponent />
            </div>
        </div>
  )
}

export default DriverInfo