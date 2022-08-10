import {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, NativeSelect, Select} from "@mui/material";
import Dropdown from "../Dropdown";

export default function Agendamento() {

    const options = [
        {
            label: "Biologia e Química",
            value: 1
        },
        {
            label: "Física e Matemática",
            value: 2
        },
        {
            label: "Linguagens",
            value: 3,
        },
        {
            label: "Saúde",
            value: 4,
        },
        {
            label: "Edificações",
            value: 5,
        },
        {
            label: "Geodésia e Cartografia",
            value: 6,
        },
        {
            label: "Desenvolvimento de Sistemas",
            value: 7,
        },
        {
            label: "Qualidade",
            value: 8,
        },
        {
            label: "Mecânica",
            value: 9,
        },
    ]

    const [area, setArea] = useState<any>();
    const [monitor, setMonitor] = useState<any>()
    const [horario, setHorario] = useState<any>()
    const [open, setOpen] = useState(false);

    return (
        <div className="font-inter">
            <div className="flex">
                <Dropdown placeholder="Selecione um curso/matéria" disabled={false} value={area} setter={setArea} options={options}/>
                <Dropdown placeholder="Selecione um monitor" disabled={false} value={monitor} setter={setMonitor} options={options}/>

            </div>
        </div>
    )

}