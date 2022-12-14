import {useEffect, useState} from "react";
import {Monitoria} from "../../model/Monitoria";
import {fetch_monitorias, set_status} from "../../api/api";
import {useCookies} from "react-cookie";
import Navbar from "../Navbar";
import Horario, {translate} from "../../model/Horario";

interface MonitoriaWithHorario {
    monitoria: Monitoria,
    horario: Horario
}

export default function MonitoriasOverview() {
    const [monitorias, setMonitorias] = useState<MonitoriaWithHorario[]>([])
    const [cookies, setCookies] = useCookies();

    const change_monitoria_status = (monitoria: Monitoria, status: number) => {
        switch(status) {
            case 1:
                if(!window.confirm("Você tem certeza que deseja confirmar a monitoria \"" + monitoria.conteudo + "\"?")) {
                    return
                }
                break
            case 2:
                if(!window.confirm("Você tem certeza que deseja concluir a monitoria \"" + monitoria.conteudo + "\"?")) {
                    return
                }
                break
            case 3:
                if(!window.confirm("Você tem certeza que deseja cancelar a monitoria \"" + monitoria.conteudo + "\"?")) {
                    return
                }
                break
        }
        set_status(monitoria.id, status, cookies.access_token, (response) => {
            if (response.status) {
                window.location.href = "/monitorias";
            }
            alert(response.message);
        })
    }

    useEffect(() => {
        fetch_monitorias(localStorage.getItem("email")!, cookies.access_token, (response) => {
            if (response.status) {
                setMonitorias(response.body);
                console.log(response.body);
            } else {
                alert(response.message);
            }
        });
    }, [])

    return (
        <div>
            <Navbar/>
            {monitorias !== null ?
                <div className="pb-10">
                    <p className="text-2xl font-light py-10 px-10">Minhas monitorias</p>
                    <div className="grid-cols-3 grid gap-4 mx-16">
                        {monitorias.map((monitoria) => {

                            const data = monitoria.monitoria.data.split('-');

                            return (
                                <div className="font-inter text-gray-700 border-[1px] border-moonitora-cyan p-3 rounded-lg">
                                    <p className="text-md">{monitoria.monitoria.conteudo}</p>
                                    <p className="text-xs mb-4">{monitoria.monitoria.disciplina}</p>
                                    <p className="text-xs mb-4"><b>{data[2]}/{data[1]}/{data[0]}</b> {translate(monitoria.horario)}</p>
                                    <p className="text-xs">Aluno: {monitoria.monitoria.aluno_nome} - {monitoria.monitoria.aluno_ra}</p>
                                    <p className="text-xs mb-4">Marcada por: {monitoria.monitoria.marcada_por}</p>
                                    {monitoria.monitoria.status === 0 ? <p className="text-xs mb-4">Status: <span className="text-yellow-400 font-bold">Aguardando confirmação</span></p>
                                        : monitoria.monitoria.status === 1 ?<p className="text-xs mb-4">Status: <span className="text-green-400 font-bold">Confirmada</span></p>
                                            : monitoria.monitoria.status === 2 ?<p className="text-xs mb-4">Status: <span className="text-blue-400 font-bold">Concluída</span></p>
                                            : <p className="text-xs mb-4">Status: <span className="text-red-500">Cancelada</span></p>}
                                    <div className="justify-between flex">
                                        <div></div>
                                        <div>
                                            {monitoria.monitoria.status === 0 ?
                                                <div className="flex gap-3">
                                                    <p
                                                        onClick={() => change_monitoria_status(monitoria.monitoria, 3)}
                                                        className="text-sm font-bold text-red-400 hover:cursor-pointer">
                                                        Cancelar
                                                    </p>
                                                    <p
                                                        onClick={() => change_monitoria_status(monitoria.monitoria, 1)}
                                                        className="text-sm font-bold text-green-400 hover:cursor-pointer">
                                                        Confirmar
                                                    </p>
                                                </div>
                                                : monitoria.monitoria.status === 1 ?
                                                    <div className="flex gap-3">
                                                        <p
                                                            onClick={() => change_monitoria_status(monitoria.monitoria, 3)}
                                                            className="text-sm font-bold text-red-400 hover:cursor-pointer">
                                                            Cancelar
                                                        </p>
                                                        <p
                                                            onClick={() => change_monitoria_status(monitoria.monitoria, 2)}
                                                            className="text-sm font-bold text-blue-400 hover:cursor-pointer">
                                                            Marcar como concluída
                                                        </p>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p
                                                            onClick={() => change_monitoria_status(monitoria.monitoria, 3)}
                                                            className="text-sm font-bold text-red-400 hover:cursor-pointer">Cancelar
                                                        </p>
                                                    </div>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            :
                <div className="flex justify-center font-inter ">
                    <p className="text-6xl text-gray-300 mt-24 font-bold">Nenhuma monitoria marcada!</p>
                </div>}
        </div>
    );
}