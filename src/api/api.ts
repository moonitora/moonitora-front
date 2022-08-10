import { Monitor } from "../model/Monitor";

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