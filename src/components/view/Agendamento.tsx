import {useEffect, useState} from "react";
import Dropdown from "../Dropdown";
import {check_disponibility, fetch_departamentos, fetch_horarios, fetch_monitores, post_monitoria} from "../../api/api";
import {useCookies} from "react-cookie";
import {Monitor} from "../../model/Monitor";
import Horario, {getWeekday, translate} from "../../model/Horario";
import Navbar from "../Navbar";
import {Monitoria} from "../../model/Monitoria";

export default function Agendamento() {
    const [area, setArea] = useState<any>();

    const [avaiableDepartamentos, setAvaableDepartamentos] = useState<any[]>([]);
    const [availableMonitores, setAvailableMonitores] = useState<Monitor[]>([]);
    const [availableHorarios, setAvailableHorarios] = useState<Horario[]>([])

    const departamentosAdapted = avaiableDepartamentos != null && avaiableDepartamentos.length > 0
        ? avaiableDepartamentos.map((departamento) => {
            return {label: departamento.nome, value: departamento.id}
        })
        : [];

    const monitoresAdapted = availableMonitores != null && availableMonitores.length > 0
        ? availableMonitores.map((monitor) => {
            return {label: monitor.nome, value: monitor.email}
        })
        : [];

    const horariosAdapted = availableHorarios != null && availableHorarios.length > 0
        ? availableHorarios.map((horario) => {
            return {label: translate(horario), value: horario.id}
        })
        : [];

    const [monitor, setMonitor] = useState<any>();
    const [horario, setHorario] = useState<any>();
    const [conteudo, setConteudo] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [cookies, setCookies] = useCookies();
    const [alunoNome, setAlunoNome] = useState("");
    const [raAluno, setAlunoRA] = useState("");
    const [data, setData] = useState("");
    const [sala, setSala] = useState("");

    useEffect(() => {
        fetch_departamentos(cookies.access_token, (response) => {
            setAvaableDepartamentos(response.body)
        })
    }, [])

    function handleDateChange(e: any) {
            let date = new Date(e.target.value);
            if (date < (new Date())) {
                alert("Selecione um dia válido.")
                return
            }
            if(date.getUTCDay() !== getWeekday(horario.label.split(':')[0])) {
                alert("Dia da semana não corresponde.")
                return
            }

            let value = e.target.value

            check_disponibility(value, horario.value, cookies.access_token, (response) => {
                if(response.status) {
                    setData(value)
                } else {
                    alert(response.message)
                }
            })
    }

    useEffect(() => {
        if (monitor === undefined) {
            return
        }
        setHorario(undefined)
        fetch_horarios(monitor.value, cookies.access_token, resp => {
            setAvailableHorarios(resp.body)
        })
    }, [monitor])

    useEffect(() => {
        if (area === undefined) {
            return;
        }
        fetch_monitores(area.value, cookies.access_token, resp => {
            setAvailableMonitores(resp.body);
        })
        setMonitor(undefined)
        setHorario(undefined)
    }, [area])

    function marcar_monitoria() {
        if (area === undefined || horario === undefined || monitor === undefined
            || conteudo.trim() === "" || disciplina.trim() === "" || sala.trim() === "") {
            alert("Preencha todos os campos");
            return;
        }

        let monitoria = new Monitoria()
        monitoria.departamento = area.value;
        monitoria.monitor = monitor.value;
        monitoria.horario = horario.value;
        monitoria.disciplina = disciplina;
        monitoria.conteudo = conteudo;
        monitoria.aluno_nome = alunoNome;
        monitoria.aluno_ra = raAluno;
        monitoria.data = data;
        monitoria.id = "";
        monitoria.marcada_por = "";
        monitoria.sala = sala;

        console.log(JSON.stringify(monitoria))

        post_monitoria(monitoria, cookies.access_token, (response) => {
            if (!response.status) {
                alert(response.message)
                return
            }
            if (response.status) {
                setArea(undefined);
                setConteudo("");
                setDisciplina("");
                setHorario(undefined);
                setMonitor(undefined);
                setAlunoRA("");
                setAlunoNome("");
                setData("");
            }
            alert(response.message)
        })
    }


    return (
        <>
            <Navbar/>
            <div className="font-inter flex text-gray-600 justify-center">
                <div className="py-10">
                    <p className="text-2xl font-light">Agendamento</p>
                    <p className="text-xs font-medium mt-1">Especifique os detalhes da monitoria:</p>
                    <div className="flex gap-4 mt-10">
                        <Dropdown
                            onChange={() => {
                            }}
                            placeholder="Selecione um curso/matéria"
                            disabled={false}
                            value={area}
                            setter={setArea}
                            options={departamentosAdapted}
                        />
                        <Dropdown
                            onChange={() => {
                            }}
                            placeholder="Selecione um monitor"
                            disabled={area === undefined || (availableMonitores !== null && availableMonitores.length === 0)}
                            value={monitor}
                            setter={setMonitor}
                            options={monitoresAdapted}
                        />

                        <Dropdown
                            onChange={() => setData("")}
                            placeholder="Selecione um horário"
                            disabled={monitor === undefined || (availableHorarios !== null && availableHorarios.length === 0)}
                            value={horario}
                            setter={setHorario}
                            options={horariosAdapted}
                        />

                    </div>
                    <div className="">
                        <div>
                            <p className="text-xs mb-1 mt-8">Disciplina:</p>
                            <input
                                value={disciplina}
                                onChange={(e) => setDisciplina(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                        <div>
                            <p className="text-xs mb-1 mt-8">Conteúdo:</p>
                            <input
                                value={conteudo}
                                onChange={(e) => setConteudo(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                        <div>
                            <p className="text-xs mb-1 mt-8">Sala do aluno:</p>
                            <input
                                value={sala}
                                onChange={(e) => setSala(e.target.value)}
                                className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/3">
                                <p className="text-xs mb-1 mt-8">Nome completo do aluno:</p>
                                <input
                                    value={alunoNome}
                                    onChange={(e) => setAlunoNome(e.target.value)}
                                    className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                                />
                            </div>
                            <div className="w-1/3">
                                <p className="text-xs mb-1 mt-8">RA do aluno:</p>
                                <input
                                    value={raAluno}
                                    onChange={(e) => setAlunoRA(e.target.value)}
                                    className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                                />
                            </div>
                            <div className="w-1/3">
                                <p className="text-xs mb-1 mt-8">Data da monitoria:</p>
                                <input
                                    value={data}
                                    disabled={horario === undefined}
                                    onChange={(e) => handleDateChange(e)}
                                    type="date"
                                    className="p-1 pl-2 rounded-md outline-none border-[1px] border-moonitora-cyan text-xs w-full h-8"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div></div>
                            <p onClick={marcar_monitoria} className="hover:cursor-pointer w-1/5 text-center text-sm font-bold text-moonitora-cyan mt-8 py-1 border-2 border-moonitora-cyan">Agendar monitoria</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}