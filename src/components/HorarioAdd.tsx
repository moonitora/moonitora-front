import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import {dias_da_semana, post_horario} from "../api/api";
import Dropdown from "./Dropdown";
import Horario from "../model/Horario";
import {useCookies} from "react-cookie";

export default function HorarioAdd(props: any) {
    const [open, setOpen] = useState(false);
    const [weekday, setWeekday] = useState<any>(undefined);
    const [inicio, setInicio] = useState("");
    const [termino, setTermino] = useState("");
    const [cookies, setCookies] = useCookies();

    const plus = require("../resources/plus.png")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addAndClose = () => {
        if(termino === "" || inicio === "" || weekday === undefined) {
            alert("Preencha todos os campos");
            return;
        }
        if(parseInt(inicio.trim().replaceAll(":", "")) >= parseInt(termino.trim().replaceAll(":", ""))) {
            alert("O horário de início nao pode ser igual ou maior que o horário de termino.");
            return;
        }

        let horario = new Horario();
        horario.id = "";
        horario.monitor = localStorage.getItem("email")!;
        horario.inicio_horas = parseInt(inicio.split(':')[0]);
        horario.inicio_minutos = parseInt(inicio.split(':')[1]);
        horario.termino_horas = parseInt(termino.split(':')[0]);
        horario.termino_minutos = parseInt(termino.split(':')[1]);
        horario.dia_da_semana = parseInt(weekday!.value);

        setOpen(false);

        post_horario(horario, cookies.access_token, (resp) => {
            if(resp.status) {
                alert("Horário adicionado com sucesso");
                window.location.href = "/horarios"
            } else {
                alert(resp.message)
            }
        })
    };

    return (
        <div className="font-inter">
            <div onClick={handleClickOpen} className="border-[1px] hover:cursor-pointer h-8 px-0.5 flex text-xs border-moonitora-orange w-full rounded-full">
                <img src={plus} alt="" className="w-6 h-6 p-1 my-auto" />
                <p className="my-auto ml-2">Adicionar horário</p>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar horário</DialogTitle>
                <DialogContent>
                    <div className="flex gap-4">
                        <div>
                            <p className="text-xs text-gray-700 mb-1">Dia da semana: </p>
                            <Dropdown
                                onChange={() => {
                                }}
                                placeholder="Dia da semana"
                                disabled={false}
                                value={weekday}
                                setter={setWeekday}
                                options={dias_da_semana}
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-700 mb-1">Início:</p>
                            <input onChange={(e) => setInicio(e.target.value)} type="time" className="py-2 text-xs p-1 outline-none border-[1px] h-8 border-moonitora-cyan rounded-md"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-700 mb-1">Término:</p>
                            <input onChange={(e) => setTermino(e.target.value)} type="time" className="py-2 text-xs p-1 outline-none border-[1px] h-8 border-moonitora-cyan rounded-md"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={addAndClose}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}