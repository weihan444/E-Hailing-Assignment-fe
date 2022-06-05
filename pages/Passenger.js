import PassengerPageComponent from "../Component/PassengerPageComponent"
import Head from 'next/head'

function Passenger() {

  return (
    <div style={{backgroundImage: "url(passenger-bg.jpg)", backgroundSize: "cover", height: "100vh"}}>
            
            <Head>
                <title>Passenger</title>
                <link rel="icon" href="/pupg-icon.ico" />
            </Head>

            <div>
                <PassengerPageComponent />
            </div>
    </div>
  )
}

export default Passenger