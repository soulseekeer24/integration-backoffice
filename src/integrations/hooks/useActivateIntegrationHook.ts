import {useState} from "react";
import useAuth from "../../auth/context/AuthContext.tsx";

 async function _activateIntegration(token: string, integrationId: string): Promise<any> {

    // return fetch(`https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations/${integrationId}`, {
    return fetch(`/integrations/${integrationId}}/toggle-active`, {
        method: 'PATCH',
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

export function useActivateIntegrationHook() {
    const [itsLoading, setItsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)
    const {user} = useAuth()

    const activateIntegration = async (integrationId: string) => {
        return _activateIntegration(user.authToken.jwtToken, integrationId)
            .then((res: any) => setData(res))
            .catch(console.log)
            .finally(() => setItsLoading(false));
    };

    return {
        activateIntegration,
        itsLoading,
        integration: data,
    };

}
