import IntegrationForm from "../components/IntegrationForm.tsx";
import {useParams} from "react-router-dom";

const CreateOrEditIntegrationPage = () => {
    const {integrationId} = useParams();
    return (
        <>
            <IntegrationForm integration={null} onSubmit={console.log}/>
        </>
    );
};

export default CreateOrEditIntegrationPage;