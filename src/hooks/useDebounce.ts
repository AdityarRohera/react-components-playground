import { useState ,useEffect } from "react"

export const useDebounce = (value : string , delay : number) => {
    const [debouncedValue , setDebouncedValue] = useState(value);

    useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        
         return () => {
            clearTimeout(handler);
        };

    } , [value ,delay]);

    // Return the debounced value
    return debouncedValue;
}