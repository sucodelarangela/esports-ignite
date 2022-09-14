// 1080 -> '18:00'
export function convertMinutesToHourString(minutesAmount: number) {
    // 1080 / 60 = 18 horas (se o valor for quebrado, arredonda para baixo)
    const hours = Math.floor(minutesAmount / 60);

    // os minutos serão o resto da operação acima, se houver
    const minutes = minutesAmount % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// o padStart acrescenta um caractere no começo da string caso ela não tenha a quantidade designada
// padStart(quantidade de caracteres, caractere a ser inserido)