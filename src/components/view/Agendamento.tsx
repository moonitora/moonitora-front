import {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, NativeSelect, Select} from "@mui/material";
import Dropdown from "../Dropdown";
import {fetch_departamentos, fetch_horarios, fetch_monitores} from "../../api/api";
import {useCookies} from "react-cookie";
import {Monitor} from "../../model/Monitor";
import Horario, {translate} from "../../model/Horario";
import Navbar from "../Navbar";

export default function Agendamento() {
    const [area, setArea] = useState<any>();

    const [departamentos, setDepartamentos] = useState<any[]>([]);
    const [availableMonitores, setAvailableMonitores] = useState<Monitor[]>([]);
    const [availableHorarios, setAvailableHorarios] = useState<Horario[]>([])


    const monitoresAdapted = availableMonitores.length > 0
        ? availableMonitores.map((monitor) => {
            return {label: monitor.nome, value: monitor.email}
        })
        : [];

    const horariosAdapted = availableHorarios.length > 0
        ? availableHorarios.map((horario) => {
            return {label: translate(horario), value: horario}
        })
        : [];

    const [monitor, setMonitor] = useState<any>()
    const [horario, setHorario] = useState<any>()
    const [conteudo, setConteudo] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [open, setOpen] = useState(false);
    const [cookies, setCookies] = useCookies()

    useEffect(() => {
        fetch_departamentos(cookies.access_token, (response) => {
            setDepartamentos(response)
        })
    }, [])

    useEffect(() => {
        if (monitor === undefined) {
            return
        }
        fetch_horarios(monitor.value, cookies.access_token, resp => {
            setAvailableHorarios(resp)
            console.log(resp)
        })
    }, [monitor])

    useEffect(() => {
        if (area === undefined) {
            return;
        }
        fetch_monitores(area.value, cookies.access_token, resp => {
            setAvailableMonitores(resp);
        })
    }, [area])

    function marcar_monitoria() {
        if (area === undefined || horario === undefined || monitor === undefined
            || conteudo.trim() === "" || disciplina.trim() === "") {
            alert("Preencha todos os campos");
            return;
        }
    }


    return (
        <>
            <Navbar/>
            <div className="font-inter flex text-gray-700 justify-center">
                <div className="py-10">
                    <p className="text-xl font-light">Agendamento</p>
                    <p className="text-xs font-medium mt-1">Especifique os detalhes da monitoria:</p>
                    <div className="flex gap-4 mt-10">
                        <Dropdown
                            onChange={() => {
                            }}
                            placeholder="Selecione um curso/matéria"
                            disabled={false}
                            value={area}
                            setter={setArea}
                            options={departamentos}
                        />
                        <Dropdown
                            onChange={() => {
                            }}
                            placeholder="Selecione um monitor"
                            disabled={area === undefined || availableMonitores.length === 0}
                            value={monitor}
                            setter={setMonitor}
                            options={monitoresAdapted}
                        />

                        <Dropdown
                            onChange={() => {
                            }}
                            placeholder="Selecione um horário"
                            disabled={monitor === undefined || availableHorarios.length === 0}
                            value={horario}
                            setter={setHorario}
                            options={horariosAdapted}
                        />

                    </div>
                    <div className="">
                        <div>
                            <p className="text-xs mb-1 mt-8">Disciplina:</p>
                            <input className="p-1 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8" />
                        </div>
                        <div>
                            <p className="text-xs mb-1 mt-8">Conteúdo:</p>
                            <input className="p-1 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8" />
                        </div>

                        <div className="flex justify-between">
                            <div></div>
                            <p onClick={marcar_monitoria} className="hover:cursor-pointer w-1/5 text-center text-sm font-bold text-moonitora-cyan mt-4 py-1 border-2 border-moonitora-cyan">Agendar monitoria</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}