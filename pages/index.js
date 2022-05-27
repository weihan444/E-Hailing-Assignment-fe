import Head from 'next/head'
import HomePage from '../Component/HomePage'

export default function Home() {
    
    return (
        <div style={{backgroundImage: "url(home-bg.jpg)", backgroundSize: "cover", height: "100vh"}}>
            <Head>
                <title>PUPG E-hailing</title>
                <link rel="icon" href="/pupg-icon.ico" />
            </Head>

            <div style={{
                position: "absolute", 
                top: "50%", 
                left: "50%",
                transform: "translate(-50%, -50%)"
                }}>
                <HomePage />  
            </div>
        </div>
    )
}
