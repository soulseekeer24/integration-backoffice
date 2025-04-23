import {ReactElement, useEffect, useState} from "react";
import {Table} from "../../shared_kernel/ui/atoms";
import {useFetchIntegration} from "../hooks/useFetchIntegrationsHook.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ContextMenu, ContextMenuItem, useContextMenu} from "../../shared_kernel";
import * as React from "react";
import {useActivateIntegrationHook} from "../hooks/useActivateIntegrationHook.ts";
import {useInactivateIntegrationHook} from "../hooks/useDeactivateIntegrationHook.ts";


interface IntegrationsTableProps {
    processorCode?: string
}

const IntegrationsTable = ({processorCode}: IntegrationsTableProps): ReactElement => {
    const {title} = useParams<string>();
    const {itsLoading, execute, integrations} = useFetchIntegration();
    const {activateIntegration} = useActivateIntegrationHook();
    const {inactivateIntegration} = useInactivateIntegrationHook();
    const [selectedIntegration, setSelectedIntegration] = useState<any | null>(null);
    const {visible, position, onContextMenu, closeMenu} = useContextMenu();


    //TODO: sacar la logica a la pagina
    const navigate = useNavigate();

    useEffect(() => {
        const call = async () => {
            try {
                await execute(processorCode!);
            } catch (e) {
                console.log(e)
            }
        }
        call()
            .then()
            .catch(console.log);
        // eslint-disable-next-line
    }, [processorCode])

    const getContextMenuItems = (): ContextMenuItem[] => {
        if (!selectedIntegration) return [];

        return [
            {
                label: 'Editar Parámetros',
                onClick: () => navigate(`/manpower/${title}/form/${selectedIntegration.id}`),
            },
            // {
            //     label: 'Duplicar',
            //     onClick: () => {
            //         console.log(`duplicating ${JSON.stringify(selectedIntegration)}`)
            //     },
            // },
            {
                label: selectedIntegration.status == 'ENABLED' ? 'Desactivar' : 'Activar',
                onClick: async () => {
                    if (selectedIntegration.active) {
                        await activateIntegration(selectedIntegration.id)
                    } else {
                        await inactivateIntegration(selectedIntegration.id)
                    }
                },
            },
        ];
    };
    const handleRowRightClick = (e: React.MouseEvent<HTMLTableRowElement>, integration: any) => {
        setSelectedIntegration(integration);
        onContextMenu(e);
    };

    return (
        <>
            {itsLoading ? <div>Cargando</div> :
                <Table
                    // onRowClick={handleRowRightClick}
                    onContextMenu={handleRowRightClick}
                    data={integrations}
                    columns={[
                        {property: "config.execution_parameters.companyName", header: "Empresa"},
                        {property: "config.execution_parameters.noCia", header: "ID Empresa manpower"},
                        {property: "config.company_id", header: "ID hcwork"},
                        {property: "status", header: "Status"}

                    ]}></Table>}

            {visible && selectedIntegration && (
                <ContextMenu
                    items={getContextMenuItems()}
                    position={position}
                    onClose={closeMenu}
                />
            )}
        </>);
}

export default IntegrationsTable;
