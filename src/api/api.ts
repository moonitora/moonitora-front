import { Monitor } from "../model/Monitor";
import Departamento from "../model/Departamento";
import Horario from "../model/Horario";

export const api_url = "https://blooming-coast-08475.herokuapp.com/https://moonitora.herokuapp.com"

export interface AuthResponse { status: boolean, jwt: String, body: any, message: string }
export interface Response { status: boolean, body?: any, message: string }

export function login(email: string, password: string, type: number, callback: (response: AuthResponse) => void) {
    fetch(api_url + "/login", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(
            {
                email: email,
                password: password,
            }
        )
    
    })

    .then(response => response.json())
    .then(response => callback(response as AuthResponse));
}

export function fetch_monitores(departamento: string, token: string, callback: (resp: Response) => void) {
    fetch(api_url + "/monitores?departamento=" + departamento, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'GET'
    }).then(r => r.json()).then(r => callback(r as Response))
}

export function fetch_departamentos(token: string, callback: (resp: Response) => void) {
    fetch(api_url + "/departamentos", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'GET'
    }).then(r => r.json()).then(r => callback(r as Response))
}

export function fetch_horarios(monitor: string, token: string, callback: (resp: Response) => void) {
    fetch(api_url + "/horario?monitor=" + monitor, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'GET'
    }).then(r => r.json()).then(r => callback(r as Response))
}

export function delete_horario(id: string, token: string, callback: (err: Response) => void) {
    fetch(api_url + "/horario?id=" + id, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'DELETE'
    }).then(r => r.json()).then(r => callback(r as Response))
}

export function post_monitoria(departamento: number, monitor: string, horario: string, disciplina: string, conteudo: string, aluno_nome: string, aluno_ra: string, data: string, token: string, callback: (response: Response) => void) {
    fetch(api_url + "/monitoria" + monitor, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'POST',
        body: JSON.stringify({
            id: "",
            marcada_por: "",
            departamento: departamento,
            monitor: monitor,
            horario: horario,
            disciplina: disciplina,
            conteudo: conteudo,
            aluno_ra: aluno_ra,
            aluno_nome: aluno_nome,
            data: data,
        })
    })
}

export function post_horario(horario: Horario, token: string, callback: (response: Response) => void) {
    fetch(api_url + "/horario", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'POST',
        body: JSON.stringify(horario)
    }).then(response => response.json()).then(response => callback(response as Response));
}

export const dias_da_semana = [
    {
        value: 0,
        label: "Domingo",
    },
    {
        value: 1,
        label: "Segunda-feira"
    },
    {
        value: 2,
        label: "Terça-feira"
    },
    {
        value: 3,
        label: "Quarta-feira"
    },
    {
        value: 4,
        label: "Quinta-feira"
    },
    {
        value: 5,
        label: "Sexta-feira"
    },
    {
        value: 6,
        label: "Sábado"
    }
]