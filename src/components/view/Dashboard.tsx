import Navbar from '../Navbar'
import {useCookies} from "react-cookie";

export default function Dashboard() {

    const [cookies, setCookies] = useCookies();

    return (
        <div>
            <Navbar/>
            { cookies.access_token === undefined ?
                <div className="flex justify-center font-inte ">
                    <p className="text-6xl text-gray-300 mt-32 font-bold">Faça login para continuar</p>
                </div>
            :
                <div>

                </div>
            }
        </div>
    )
}