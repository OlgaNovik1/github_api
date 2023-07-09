import { useEffect, useState } from "react";


export function useDebounce(value: string, delay: number = 500): string {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(id)  //чтобы к раз не отрабатывал - удалим. отработает новый только при след исп хука
    }, [value, delay])

    return debounced
}