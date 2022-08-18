import Navbar from "../Navbar";
import Dropdown from "../Dropdown";
import {useEffect, useState} from "react";
import {fetch_departamentos, post_monitor} from "../../api/api";
import {useCookies} from "react-cookie";
import {Monitor} from "../../model/Monitor";

export default function CadastrarMonitor() {
    const [departamentos, setDepartamentos] = useState([])

    const [area, setArea] = useState<any>(undefined);
    const [nome, setNome] = useState("");
    const [ra, setRa] = useState("");
    const [email, setEmail] = useState("");
    const [cookies, setCookies] = useCookies();
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    useEffect(() => {
        fetch_departamentos(cookies.access_token, (response) => {
            setDepartamentos(response.body)
        })
    }, [])

    const cadastrar_monitor = () => {

        if (area === undefined || nome === "" || ra === "" || email === "" || password === "" || confirmedPassword === "") {
            alert("Preencha todos os campos");
            return;
        }

        if(ra.length > 6) {
            alert("O número do RA não deve ultrapassar 6 caracteres");
            return;
        }

        let regex = new RegExp("/\\S+@\\S+\\.\\S+/");
        if(!email.endsWith("@g.unicamp.br")) {
            alert("Insira um email válido");
            return;
        }

        if(password !== confirmedPassword) {
            alert("As senhas não coincidem");
            return;
        }


        let monitor = new Monitor()
        monitor.email = email;
        monitor.nome = nome;
        monitor.ra = ra;
        monitor.departamento = area!.value;
        monitor.adm = 0;

        post_monitor(monitor, password, cookies.access_token, (response) => {
            if(response.status) {
                alert(response.message);
                setArea(undefined);
                setNome("");
                setPassword("");
                setConfirmedPassword("");
                setRa("");
                setEmail("");
            } else {
                alert(response.message);
            }
        })
    }

    return (
        <>
            <Navbar/>
            <div className="font-inter flex text-gray-600 justify-center">
                <div className="py-10">
                    <p className="text-2xl font-light">Cadastrar monitor</p>
                    <div>
                        <p className="text-xs mb-1 mt-8">Nome:</p>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-xs mb-1 mt-8">Curso/Matérias:</p>
                            <Dropdown
                                onChange={() => {
                                }}
                                placeholder="Selecione o curso/matéria do monitor"
                                disabled={false}
                                value={area}
                                setter={setArea}
                                options={departamentos}
                            />
                        </div>
                        <div>
                            <p className="text-xs mb-1 mt-8">RA:</p>
                            <input
                                value={ra}
                                onChange={(e) => {
                                    setRa(e.target.value);
                                    setEmail("cl" + e.target.value + "@g.unicamp.br");
                                }}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                        <div>
                            <p className="text-xs mb-1 mt-8">Email:</p>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 w-full">
                        <div className="w-1/2">
                            <p className="text-xs mb-1 mt-8">Senha:</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                        <div className="w-1/2">
                            <p className="text-xs mb-1 mt-8">Confirmar senha:</p>
                            <input
                                type="password"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex justify-between">
                            <div></div>
                            <p onClick={cadastrar_monitor} className="hover:cursor-pointer w-1/4 text-center text-sm font-bold text-moonitora-cyan mt-8 py-1 border-2 border-moonitora-cyan">Cadastrar monitor</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}