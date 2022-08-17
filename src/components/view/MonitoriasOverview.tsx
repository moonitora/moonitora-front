import {useEffect, useState} from "react";
import {Monitoria} from "../../model/Monitora";
import {fetch_monitorias} from "../../api/api";
import {useCookies} from "react-cookie";
import Navbar from "../Navbar";

export default function MonitoriasOverview() {
    const [monitorias, setMonitorias] = useState<Monitoria[]>([])
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        fetch_monitorias(localStorage.getItem("email")!, cookies.access_token, (response) => {
            if (response.status) {
                setMonitorias(response.body);
            } else {
                alert(response.message);
            }
        });
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="grid-cols-3 grid gap-4 mx-16 my-16">
                {monitorias.map((monitoria) => {
                    console.log(monitoria.disciplina)
                    return (
                        <div className="font-inter text-gray-700 border-[1px] border-moonitora-cyan p-3 rounded-lg">
                            <p className="text-md">{monitoria.conteudo}</p>
                            <p className="text-xs mb-4">{monitoria.disciplina}</p>
                            <p className="text-xs">Aluno: {monitoria.aluno_nome} - {monitoria.aluno_ra}</p>
                            <p className="text-xs mb-4">Marcada por: {monitoria.marcada_por}</p>
                            {monitoria.status === 0 ? <p className="text-xs mb-4">Status: <span className="text-yellow-500">Aguardando confirmação</span></p>
                            : monitoria.status === 1 ?<p className="text-xs mb-4">Status: <span className="text-green-500">Confirmada</span></p>
                                    : <p className="text-xs mb-4">Status: <span className="text-red-500">Cancelada</span></p>}
                            <div className="justify-between flex">
                                <div></div>
                                <div>
                                    {monitoria.status === 0 ?
                                    <div className="flex gap-3">
                                        <p className="text-sm font-bold text-red-500 hover:cursor-pointer">Cancelar</p>
                                        <p className="text-sm font-bold text-green-500 hover:cursor-pointer">Confirmar</p>
                                    </div>
                                    : monitoria.status === 1 ?
                                    <div>

                                    </div>
                                    :
                                    <div>

                                    </div>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}