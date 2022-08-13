export default class Horario {
    monitor!: string
    id!: string
    dia_da_semana!: number
    inicio_horas!: number
    inicio_minutos!: number
    termino_horas!: number
    termino_minutos!: number
}

export function translate(horario: Horario): string {
    let weekdays = new Map<number, string>();
    weekdays.set(0, "Domingo");
    weekdays.set(1, "Segunda-feira");
    weekdays.set(2, "Terça-feira");
    weekdays.set(3, "Quarta-feira");
    weekdays.set(4, "Quinta-feira");
    weekdays.set(5, "Sexta-feira");
    weekdays.set(6, "Sábado")

    return weekdays.get(horario.dia_da_semana)! + ": " + horario.inicio_horas + "h" + horario.inicio_minutos + " - " + horario.termino_horas + "h" + horario.termino_minutos;
}