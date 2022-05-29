import DriverPageComponent from "../Component/DriverPageComponent"
import Head from 'next/head'


function Driver() {
    return (
        <div style={{backgroundImage: "url(driver-bg.jpg)", backgroundSize: "cover", height: "100vh"}}>
            
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
                <DriverPageComponent />
            </div>
        </div>
    )
}

export default Driver