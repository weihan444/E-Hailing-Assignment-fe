import Head from 'next/head'
import DriverResignComponent from "../../Component/DriverResignComponent"

 
function resign() {
    return (
        <div style={{backgroundImage: "url(../driver-bg.jpg)", backgroundSize: "cover", height: "100vh"}}>
            
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
                <DriverResignComponent />
            </div>
        </div>
    )
}

export default resign