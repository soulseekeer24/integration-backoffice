import IntegrationForm from "../components/IntegrationForm.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetchIntegrationById} from "../hooks/useFetchIntegrationByIdHook.ts";
import {useUpdateExecutionParametersIntegration} from "../hooks/useUpdateExecutionParametersIntegrationHook.ts";

const EditIntegrationPage = () => {
    const {id, title} = useParams<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const {execute, integration, itsLoading} = useFetchIntegrationById();
    const navigate = useNavigate();
    const {itsLoading: isLoadingUpdate, execute: executeUpdate} = useUpdateExecutionParametersIntegration();

    useEffect(() => {
        if (!id) {
            return;
        }
        const call = async () => {
            try {
                await execute(id);
            } catch (e) {
                console.log(e)
            }
        }
        call()
            .then()
            .catch(console.log);
        // eslint-disable-next-line
    }, [])


    const handleOnSubmit = async (executionParameters: any) => {
        await executeUpdate(integration.id, executionParameters);
        // navigate("/manpower-v3/listing");
        setShowModal(true);
    };

    return (

        <>
            {showModal ?
                <Modal onConfirm={() => navigate(`/manpower/${title}/listing`)}
                       buttonText={"Presione para volver!"}
                       body={`Se ha actualizado correctamente la integracion con id ${integration.id}`}
                       title={"Integracion actualizada"}/> : null}
            {itsLoading || isLoadingUpdate ?
                <div>Cargando</div> :
                <IntegrationForm
                    integration={integration}

                    onCancel={() => navigate(`/manpower/${title}/listing`)}
                    onSubmit={handleOnSubmit}/>
            }
        </>


    );
};

export default EditIntegrationPage;


type ModalProps = {
    onConfirm: () => void;
    buttonText: string;
    body: string;
    title: string;
};

function Modal({onConfirm, title, body, buttonText}: ModalProps) {
    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {title}
                            </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                {body}
                            </p>
                        </div>
                        <div
                            className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onConfirm}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

