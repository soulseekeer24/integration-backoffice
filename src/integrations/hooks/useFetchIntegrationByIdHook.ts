import {useState} from "react";
import useAuth from "../../auth/context/AuthContext.tsx";

export async function fetchIntegrations(token: string, integrationId: string): Promise<any> {

    // return fetch(`https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations/${integrationId}`, {
    return fetch(`/integrations/${integrationId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(async (res) => {
            const result = await res.json();
            return result
        })

}

export function useFetchIntegrationById() {
    const [itsLoading, setItsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)
    const {user} = useAuth()

    const execute = async (integrationId: string) => {
        return fetchIntegrations(user.authToken.jwtToken, integrationId)
            .then((res: any) => setData(res))
            .catch(console.log)
            .finally(() => setItsLoading(false));
    };

    return {
        execute,
        itsLoading,
        integration: data,
    };

}
