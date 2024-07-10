import {ReactElement, useEffect} from "react";
import {Table} from "../../shared_kernel/ui/atoms";
import {useFetchIntegration} from "../hooks/useFetchIntegrationsHook.ts";

const IntegrationsTable = (): ReactElement => {
    const {itsLoading, execute, integrations} = useFetchIntegration();

    useEffect(() => {
        const call = async () => {
            try {
                await execute();
            } catch (e) {
                console.log(e)
            }
        }
        call()
            .then()
            .catch(console.log);
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {itsLoading ? <div>Cargando</div> :
                <Table
                    data={integrations}
                    columns={[
                        {property: "id", header: "ID"},
                        {property: "config.execution_parameters.noCia", header: "ID Empresa manpower"},
                        {property: "config.company_id", header: "ID hcwork"},
                        {property: "status", header: "Status"}
                    ]}></Table>}
        </>)

}


export default IntegrationsTable;
