import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export function useFunctions(courseId) {
    const [functions, setFunctions] = useState([]);
    const makeRequest = useFetch();
    
    async function fetchFunctions() {
        const response = await makeRequest(`/functions/${courseId}`, 'GET');

        if (response.ok) {
            const { allowed_functions } = await response.json();
            setFunctions(allowed_functions);
        }
    }
    
    useEffect(() => {
        fetchFunctions();
    }, []);
    
    return [functions, setFunctions];
}