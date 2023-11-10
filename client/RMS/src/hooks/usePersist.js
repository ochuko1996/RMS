import { useState } from "react";

export const usePersist = ()=>{
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    return {
        persist, setPersist
    }
}