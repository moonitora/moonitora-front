import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dropdown from "./Dropdown";
import {dias_da_semana, post_departamento} from "../api/api";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {useCookies} from "react-cookie";

export default function DepartamentoAdd() {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState<any>("");
    const [cookies, setCookie] = useCookies();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addAndClose = () => {
        if(nome.trim().length <= 0) {
            alert("Especifique um nome para o departamento");
            return;
        }

        post_departamento(nome, cookies.access_token, response => {
            alert(response.message);
            if(response.status) {
                window.location.reload();
            }
        })
    }

    return (
        <div className="font-inter">
            <div onClick={handleClickOpen} className="mx-auto w-5/6 rounded-lg hover:cursor-pointer border-[1px] border-blue-500 text-center mb-10 py-1 font-inter text-blue-500 font-light text-sm">
                ADICIONAR DEPARTAMENTO
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar departamento</DialogTitle>
                <DialogContent>
                    <div>
                        <p className="text-xs mb-1 mt-2">Nome do departamento:</p>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                        />
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