import {useState} from "react";
import {Page} from "../../shared_kernel/models/Page.ts";
import useAuth from "../../auth/context/AuthContext.tsx";

export async function update(token: string, integrationId: string, executionParameters: any): Promise<Page<any>> {
    // `https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations/${integrationId}/execution-parameters
    return fetch(`https://u0iwmgjmx0.execute-api.us-east-1.amazonaws.com/Prod/integrations/${integrationId}/execution-parameters`, {
        method: 'PATCH',
        body: JSON.stringify(executionParameters),
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

export function useUpdateExecutionParametersIntegration() {
    const [itsLoading, setItsLoading] = useState<boolean>(false)
    const {user} = useAuth()

    const execute = async (integrationId: string, executionParameters: any) => {
        setItsLoading(true);
        return update(user.authToken.jwtToken, integrationId, executionParameters)
            .catch(console.log)
            .finally(() => setItsLoading(false));
    };

    return {
        execute,
        itsLoading
    };

}
