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
    let week_days = new Map<number, string>();
    week_days.set(0, "Domingo");
    week_days.set(1, "Segunda-feira");
    week_days.set(2, "Terça-feira");
    week_days.set(3, "Quarta-feira");
    week_days.set(4, "Quinta-feira");
    week_days.set(5, "Sexta-feira");
    week_days.set(6, "Sábado")

    return week_days.get(horario.dia_da_semana)! + ": " + horario.inicio_horas + "h" + horario.inicio_minutos + " - " + horario.termino_horas + "h" + horario.termino_minutos;
}

export function getWeekday(data: string): number {
    let week_days = new Map<string, number>();
    week_days.set("Domingo", 0);
    week_days.set("Segunda-feira", 1);
    week_days.set("Terça-feira", 2);
    week_days.set("Quarta-feira", 3);
    week_days.set("Quinta-feira", 4);
    week_days.set("Sexta-feira", 5);
    week_days.set("Sábado", 6);

    return week_days.get(data)!;
}