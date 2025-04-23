import {useState} from "react";
import useAuth from "../../auth/context/AuthContext.tsx";

export async function _inactivateIntegration(token: string, integrationId: string): Promise<any> {

    // return fetch(`https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations/${integrationId}`, {
    return fetch(`/integrations/${integrationId}}/toggle-inactive`, {
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

export function useInactivateIntegrationHook() {
    const [itsLoading, setItsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>(null)
    const {user} = useAuth()

    const inactivateIntegration = async (integrationId: string) => {
        return _inactivateIntegration(user.authToken.jwtToken, integrationId)
            .then((res: any) => setData(res))
            .catch(console.log)
            .finally(() => setItsLoading(false));
    };

    return {
        inactivateIntegration,
        itsLoading,
        integration: data,
    };

}
