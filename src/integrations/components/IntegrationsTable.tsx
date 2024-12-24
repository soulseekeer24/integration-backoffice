import {ReactElement, useEffect} from "react";
import {Table} from "../../shared_kernel/ui/atoms";
import {useFetchIntegration} from "../hooks/useFetchIntegrationsHook.ts";
import {useNavigate} from "react-router-dom";

const IntegrationsTable = (): ReactElement => {
    const {itsLoading, execute, integrations} = useFetchIntegration();
    //TODO: sacar la logica a la pagina
    const navigate = useNavigate();

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

    function handleOnRowClick(integration: any) {
        navigate(`/manpower-v3/form/${integration.id}`);
    }

    return (
        <>
            {itsLoading ? <div>Cargando</div> :
                <Table
                    onRowClick={handleOnRowClick}
                    data={integrations}
                    columns={[
                        {property: "config.execution_parameters.companyName", header: "Empresa"},
                        {property: "config.execution_parameters.noCia", header: "ID Empresa manpower"},
                        {property: "config.company_id", header: "ID hcwork"},
                        {property: "status", header: "Status"}

                    ]}></Table>}
        </>)

}


export default IntegrationsTable;
