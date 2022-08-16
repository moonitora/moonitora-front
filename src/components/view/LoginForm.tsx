import { useState } from "react"
import { Cookies, useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import {login as api_login, AuthResponse} from "../../api/api"

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [cookies, setCookies] = useCookies();
    const [password, setPassword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    let type = searchParams.get("type")

    const moonitora = require('../../resources/moonitora.png')

    function login() {
        if(email.trim().length <= 0 && password.trim().length <= 0) {
            alert("Preencha todos os campos");
            return
        }
        api_login(email, password, type === "monitor" ? 0 : 1, (response: AuthResponse) => {
            if(response.status) {
                setCookies("access_token", response.jwt);
                localStorage.setItem("login_type", type!);
                localStorage.setItem("email", response.body.email);
                localStorage.setItem("nome", response.body.nome);
                window.location.href = "/dashboard"
            } else {
                alert(response.message);
            }
        })
    }

    return (
        <div className="md:w-1/3 md:p-0 p-4 mx-auto mt-32 h-1/4">
            <div className="">
                <img src={moonitora} alt="" className="w-64 mx-auto" />
                <div>
                    {type === "monitor" ? <p className="text-center text-sm text-gray-700 font-medium">Fazer login como monitor</p>
                    : <p className="text-center text-sm text-gray-700 font-medium">Fazer login como administrador</p>}
                </div>
                
                <input onChange={(e) => setEmail(e.target.value)} 
                    placeholder="E-mail" 
                    type="text"
                    className={`md:mr-8 w-full border-b-moonitora-orange border-0 border-b-2 outline-none font-inter font-normal text-sm text-gray-700 mb-8 mt-8 p-1`} 
                />

                <input onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Senha" 
                    type="password"
                    className={`md:mr-8 w-full border-b-moonitora-orange border-0 border-b-2 outline-none font-inter font-normal text-sm text-gray-700 p-1`}
                />

                <div className="flex justify-between">
                    <div></div>
                    <p onClick={login} className="hover:cursor-pointer w-1/3 text-center text-sm font-bold text-moonitora-cyan mt-4 py-1 border-2 border-moonitora-cyan">Entrar</p>
                </div>
            </div>
        </div>
    )
}