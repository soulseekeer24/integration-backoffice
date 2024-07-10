import IntegrationForm from "../components/IntegrationForm.tsx";

const CreateOrEditIntegrationPage = () => {
    return (
        <>
            <IntegrationForm integration={null} onSubmit={console.log}/>
        </>
    );
};

export default CreateOrEditIntegrationPage;