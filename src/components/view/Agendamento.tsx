import {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, NativeSelect, Select} from "@mui/material";
import Dropdown from "../Dropdown";
import {fetch_departamentos, fetch_monitores} from "../../api/api";
import {useCookies} from "react-cookie";
import {Monitor} from "../../model/Monitor";

export default function Agendamento() {
    const [area, setArea] = useState<any>();

    const [departamentos, setDepartamentos] = useState<any[]>([]);
    const [avaiableMonitores, setAvaiableMonitores] = useState<Monitor[]>([]);


    const monitoresAdapted = avaiableMonitores.length > 0
        ? avaiableMonitores.map((monitor) => {
            return {label: monitor.nome, value: monitor.email}
        })
        : [];

    const [monitor, setMonitor] = useState<any>()
    const [horario, setHorario] = useState<any>()
    const [open, setOpen] = useState(false);
    const [cookies, setCookies] = useCookies()

    useEffect(() => {
        fetch_departamentos(cookies.access_token, (response) => {
            setDepartamentos(response)
        })
    }, [])

    useEffect(() => {
        if (area === undefined) {
            return
        }
        fetch_monitores(area.value, cookies.access_token, resp => {
            setAvaiableMonitores(resp)
            console.log(resp);
        })
    }, [area])

    const fetchHorarios = () => {

    }

    return (
        <div className="font-inter">
            <div className="flex">
                <Dropdown
                    onChange={() => {}}
                    placeholder="Selecione um curso/matéria"
                    disabled={false}
                    value={area}
                    setter={setArea}
                    options={departamentos}
                />
                <Dropdown
                    onChange={fetchHorarios}
                    placeholder="Selecione um monitor"
                    disabled={area === undefined || avaiableMonitores.length === 0}
                    value={monitor}
                    setter={setMonitor}
                    options={monitoresAdapted}
                />

            </div>
        </div>
    )

}