import {useEffect, useState} from "react";
import {fetch_departamentos} from "../../../api/api";
import {useCookies} from "react-cookie";
import Departamento from "../../../model/Departamento";
import Navbar from "../../Navbar";
import DepartamentoAdd from "../../DepartamentoAdd";

export default function GerenciarDepartamentos() {

    const [departamentos, setDepartamentos] = useState<any>([])
    const [cookies, setCookies] = useCookies()

    useEffect(() => {
        fetch_departamentos(cookies.access_token, (response) => {
            if (response.status) {
                setDepartamentos(response.body)
                return
            }
            alert(response.message)
        })
    }, [])

    return (
        <div>
            <Navbar/>
            <div className="grid grid-cols-3 gap-4 font-inter text-gray-700 p-12">
                {departamentos !== null && departamentos.length >= 0 ?
                    departamentos.map((departamento: any) => {
                        return (
                            <div className="border-moonitora-cyan border-[1px] p-2 rounded-lg">
                                <div>
                                    <p className="text-lg font-semibold">{departamento.nome}</p>
                                    <table className="table-auto mt-2">
                                        <tr>
                                            <td><p className="text-xs font-medium">Aguardando confirmação:</p></td>
                                                <td><p className="pl-12 text-xs font-medium">{departamento.monitorias_aguardando}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-xs font-medium">Confirmadas:</p></td>
                                            <td className="pl-12 text-xs font-medium">{departamento.monitorias_confirmadas}</td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-xs font-medium">Concluídas:</p></td>
                                            <td className="pl-12 text-xs font-medium">{departamento.monitorias_concluidas}</td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-xs font-medium">Canceladas:</p></td>
                                            <td className="pl-12 text-xs font-medium">{departamento.monitorias_canceladas}</td>
                                        </tr>
                                    </table>

                                    <p className="text-xs font-bold mt-4">Monitores em atividade: {departamento.monitores}</p>

                                </div>
                                <div className="flex justify-between mt-2">
                                    <div></div>
                                    <div>
                                        <p className="hover:cursor-pointer hover:text-white hover:bg-red-500 text-xs border-red-500 text-red-500 border-[1px] p-1 rounded-md font-semibold">DELETAR</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>
                        <p>Nenhum departamento cadastrado</p>
                    </div>}
            </div>
            <DepartamentoAdd/>
        </div>
    )
}