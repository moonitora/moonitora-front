import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const moonitora = require('../resources/moonitora.png')
    const login = require('../resources/login.png')

    const [cookies] = useCookies();

    const handleClick = () => {
        if(!isLoggedIn()) {
            window.location.href = "/logintype"
        }
    }

    function isLoggedIn() {
        return cookies.access_token !== undefined
    }

    function redirectIfAuthenticated(uri: string) {
        if (cookies.access_token !== undefined) {
            window.location.href = uri;
        }
    }

    return (
        <div>
            <div className="flex justify-between my-2">
                <div className="flex">
                    <img src={moonitora} alt="" className="w-40 my-auto" />
                    { localStorage.getItem("login_type") === "monitor" ?
                        (<div className="flex my-auto font-inter text-xs text-gray-700 gap-4 ml-4">
                            <p className="hover:cursor-pointer" onClick={() => redirectIfAuthenticated("/agendamento")}>Agendamento</p>
                            <p className="hover:cursor-pointer">Minhas monitorias</p>
                            <p className="hover:cursor-pointer">Relatório</p>
                        </div>)
                        :
                        (<div className="flex my-auto font-inter text-xs text-gray-700 gap-4 ml-4">
                            <p className="hover:cursor-pointer" onClick={() => redirectIfAuthenticated("/agendamento")}>Gerenciar monitores</p>
                        </div>)
                    }
                </div>
                <div className="my-auto">
                    <img src={login} className="w-8 my-auto mx-4 hover:cursor-pointer" alt="" onClick={handleClick} />
                </div>
            </div>
            <hr className="h-1 bg-moonitora-orange"/>
        </div>
    );
}