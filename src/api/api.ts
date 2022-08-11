import { Monitor } from "../model/Monitor";
import Departamento from "../model/Departamento";

export const api_url = "https://blooming-coast-08475.herokuapp.com/https://moonitora.herokuapp.com"

export interface LoginResponse { status: boolean, jwt: String, user: Monitor, message: string }

export function login(email: string, password: string, type: number, callback: (response: LoginResponse) => void) {
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
    .then(response => callback(response as LoginResponse));
}

export function fetch_monitores(departamento: string, token: string, callback: (resp: Monitor[]) => void) {
    fetch(api_url + "/monitores?departamento=" + departamento, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'GET'
    }).then(r => r.json()).then(r => callback(r as Monitor[]))
}

export function fetch_departamentos(token: string, callback: (resp: Departamento[]) => void) {
    fetch(api_url + "/departamentos", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        method: 'GET'
    }).then(r => r.json()).then(r => callback(r as Departamento[]))
}