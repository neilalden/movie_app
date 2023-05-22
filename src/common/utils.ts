import { ArgFunction, VoidFunction } from "./types";

export const debounce = (func: VoidFunction | ArgFunction, delay = 1000) => {
    let timeout: any;
    return (...args: any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args)
        }, delay)
    }
}
export const trunc = (str: string, num = 20) => {
    if (str.length > num) return str.slice(0, num) + "...";
    else return str;
}