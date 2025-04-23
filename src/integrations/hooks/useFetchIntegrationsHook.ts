import {useState} from "react";
import {Page} from "../../shared_kernel/models/Page.ts";
import useAuth from "../../auth/context/AuthContext.tsx";

export async function fetchIntegrations(processorCode: string, token: string): Promise<Page<any>> {

    // return fetch(`https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations`, {
    return fetch(`/integrations?processor_code=${processorCode}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
    })
        .then(async (res) => {
            const result = await res.json();
            console.log({result})
            return result
        })

}

export function useFetchIntegration() {
    const [itsLoading, setItsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any[]>([])
    const {user} = useAuth()

    const execute = async (processorCode: string) => {
        setItsLoading(true);
        return fetchIntegrations(processorCode, user.authToken.jwtToken)
            .then((res: Page<any>) => setData(res.content))
            .catch(console.log)
            .finally(() => setItsLoading(false));
    };

    return {
        execute,
        itsLoading,
        integrations: data
    };

}
