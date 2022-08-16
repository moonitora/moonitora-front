import {useEffect, useState} from "react";
import {delete_horario, fetch_horarios} from "../../api/api";
import {useCookies} from "react-cookie";
import Navbar from "../Navbar";
import HorarioAdd from "../HorarioAdd";
import * as React from "react";
import Horario, {translate} from "../../model/Horario";

export default function Horarios() {
    const [cookies, setCookies] = useCookies();
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [popupState, setPopupState] = useState(false)

    const trash = require("../../resources/trash.png")

    const handleHorarioDelete = (id: string) => {
        delete_horario(id, cookies.access_token, (resp) => {
            if (resp.status) {
                window.location.href = "/horarios";
            } else {
                alert(resp.status);
            }
        })
    }

    useEffect(() => {
        fetch_horarios(localStorage.getItem("email")!, cookies.access_token, (response) => {
                if (response.status) {
                    setHorarios(response.body);
                } else {
                    alert(response.status);
                }
        })
    }, [])

    return (
        <div>
            <Navbar/>
            <p className="text-2xl font-light py-10 ml-10">Gerenciar meus horários</p>
            <div className="w-1/4 mx-auto">
                <div className="font-inter text-gray-700">
                    {(horarios !== null && horarios !== undefined && horarios.length > 0) ? horarios.map(horario => {
                        return (
                            <div className="border-[1px] justify-between h-8 px-0.5 flex text-xs border-moonitora-cyan mb-2 w-full rounded-full">
                                <p className="my-auto ml-2">{translate(horario)}</p>
                                <img onClick={() => handleHorarioDelete(horario.id)} src={trash} alt="Deletar" title="Deletar" placeholder="Deletar" className="w-6 h-6 p-1 my-auto mr-1 hover:cursor-pointer"/>
                            </div>
                        )
                    })
                    :
                        (<div>
                            <p className="font-inter font-lg mb-2 text-center text-gray-500">Nenhum horário definido</p>
                        </div>)}
                    <HorarioAdd/>
                </div>
            </div>s
        </div>
    )
}