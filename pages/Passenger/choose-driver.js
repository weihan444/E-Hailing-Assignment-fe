import PCDC from "../../Component/PassengerChooseDriverComponent"
import Head from 'next/head'


function DriverInfo() {
  return (
    <div>
            
            <Head>
                <title>Driver</title>
                <link rel="icon" href="../pupg-icon.ico" />
            </Head>

            <div>
                <PCDC />
            </div>
        </div>
  )
}

export default DriverInfo