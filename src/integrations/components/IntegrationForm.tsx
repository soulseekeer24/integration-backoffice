import {FormEvent, useState} from "react";
import {JsonEditor} from "json-edit-react";

type ExecutionParameters = {
    integration: any | null;
    onSubmit: (executionParameter: any) => void;
    onCancel: () => void;
};

const IntegrationForm = ({onSubmit, integration, onCancel}: ExecutionParameters) => {
    const [data, setData] = useState<any>(integration.config.execution_parameters);

    const handleSubmit = (e: FormEvent<any>) => {
        e.preventDefault();
        onSubmit(data);

    };

    const handleDataChange = (jsonData: unknown) => {
        setData(jsonData);
    };
    return (
        <div className="w-full h-full flex flex-col space-y-4">
            <div>
                <JsonEditor
                    data={data}
                    maxWidth={2400}
                    showErrorMessages={true}
                    collapse={1}
                    className={"w-full h-full"}
                    setData={handleDataChange} // Asegúrate de pasar jsObject
                />
            </div>

            <div className="flex justify-end">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"

                    type="button"
                    onClick={() => onCancel()}
                >
                    Cancelar
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    type="button"
                    onClick={handleSubmit}
                >
                    Guardar
                </button>
            </div>
        </div>

    )
        ;
};


export default IntegrationForm;
