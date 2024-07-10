import {DynamicForm, FieldDescription} from "../../shared_kernel/ui/molecules";

export interface IntegrationProp {
    name: string;
}

type AddPatientFormProps = {
    integration: IntegrationProp | null;
    viewMode?: boolean;
    onSubmit: (name: string) => void;
};

const MANPOWER_V3_FORM_DESCRIPTION: FieldDescription[] = [
    {
        name: "Nombre",
        isRequired: true,
        propertyName: "name",
        inputType: "text",
        placeholder: "Ingrese el nombre",
        initialValue: "",
        fieldType: "input"
    }
];

const IntegrationForm = ({onSubmit, integration, viewMode = false}: AddPatientFormProps) => {
    const fieldDescriptions = [...MANPOWER_V3_FORM_DESCRIPTION]
    fieldDescriptions.forEach((field) => {
        if (field.inputType === "date") {
            let date = (integration as any)[field.propertyName];
            let newdate = date.split("/").reverse().join("-");
            field.initialValue = integration ? newdate : "";
        } else {
            field.initialValue = integration ? (integration as any)[field.propertyName] : "";

        }
    })

    return (
        <>
            <DynamicForm
                viewMode={viewMode}
                onSubmitHandler={(formValues: any) => {
                    const {name} = formValues;
                    onSubmit(name);
                }}
                fieldsDescription={MANPOWER_V3_FORM_DESCRIPTION}/>
        </>
    );
};

export default IntegrationForm;
