import { InputHTMLAttributes } from "react";

// Extendendo o InputHTMLAttributes, nós indicamos ao React que este componente poderá usar todos os atributos de um input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
        />
    )
}