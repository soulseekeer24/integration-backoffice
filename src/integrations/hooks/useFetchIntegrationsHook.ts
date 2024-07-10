import {useState} from "react";
import {Page} from "../../shared_kernel/models/Page.ts";
import useAuth from "../../auth/context/AuthContext.tsx";

export async function fetchIntegrations(token: string): Promise<Page<any>> {

    return fetch(`/integrations`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
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

    const execute = async () => {
        setItsLoading(true);
        return fetchIntegrations(user.authToken.jwtToken)
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
