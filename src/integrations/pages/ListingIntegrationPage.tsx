import IntegrationsTable from "../components/IntegrationsTable.tsx";
import {useParams} from "react-router-dom";


const PATH_TO_PROCESSOR_CODE: any = {
    "manpower-v1": "HCWORK_MANPOWER_MIGRATE_EMPLOYEES",
    "manpower-v2": "HCWORK_MANPOWER_MIGRATE_LOANS",
    "manpower-v3": "HCWORK_MANPOWER_LIQUIDATION_EMPLOYEE",
    "manpower-v4": "HCWORK_MANPOWER_NOTIFY_LOANS",
    "manpower-v5": "HCWORK_MANPOWER_MIGRATE_PAYMENT_ORDER",
    "manpower-v6": "HCWORK_MANPOWER_MIGRATE_ADDITIONAL_FIELDS_EMPLOYEE"
};
const ListingIntegrationPage = () => {
    const {title} = useParams<string>();
    return (
        <>
            <IntegrationsTable processorCode={PATH_TO_PROCESSOR_CODE[`${title}`]}/>
        </>
    );
};

export default ListingIntegrationPage;