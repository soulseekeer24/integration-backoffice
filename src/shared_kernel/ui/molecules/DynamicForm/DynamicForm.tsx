import React, {HTMLInputTypeAttribute} from "react";
import {Button,  Input, useField} from "../../atoms";
import {Select, SelectOptionItem} from "../../atoms/Input/Select";
import {DynamicFormContextWrapper, useDynamicFormContext} from "./DynamicFormContext";

export interface DynamicFormProps {
    fieldsDescription: FieldDescription[];
    viewMode?: boolean;
    debugMode?: boolean;
    onSubmitHandler: (values: { [key: string]: any }) => void
}

export interface FieldDescription {
    name: string;
    propertyName: string;
    flexRate?: number;
    placeholder: string;
    fieldType: 'input' | 'select';
    inputType: HTMLInputTypeAttribute;
    initialValue: any;
    isRequired: boolean;
    // TODO implement input validations customs
    validators?: any[];
    options?: SelectOptionItem[];

}

export const DynamicForm: React.FC<DynamicFormProps> = ({fieldsDescription, debugMode, onSubmitHandler, viewMode}) => {

    return (
        <DynamicFormContextWrapper>
            <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                {fieldsDescription.map((fieldDescription) =>
                    <div
                        key={fieldDescription.propertyName}
                        style={{
                        padding: '0.5em',
                        width: fieldDescription.flexRate ? `${fieldDescription.flexRate * 100}%` : `100%`
                    }}>
                        <FormField
                            disabled={viewMode}
                            fieldDescription={fieldDescription}/>
                    </div>)}
                {/*    Here go the actions for this form*/}
                <div className="flex-1 p-[0.5em]">
                    {!viewMode && <DynamicFormActions onSubmitHandler={onSubmitHandler}/>}
                </div>
                {debugMode && <FormStateDebugPreview/>}
            </div>
        </DynamicFormContextWrapper>
    );
}

const FormStateDebugPreview: React.FC = () => {
    const {state} = useDynamicFormContext();
    return (<pre className="p-4">{JSON.stringify(state, null, 2)}</pre>)
}

export interface DynamicFormActionsProps {
    onSubmitHandler: (values: { [key: string]: any }) => void
}

const DynamicFormActions: React.FC<DynamicFormActionsProps> = ({onSubmitHandler}) => {
    const {state} = useDynamicFormContext();
    return (
        <>
            <Button className="flex-1"  label={"Enviar"} onClick={() => {
                let formValues: { [key: string]: any } = {};

                Object.keys(state).forEach((key) => {
                    formValues[key] = state[key].value;
                });

                onSubmitHandler(formValues);
            }}/>
        </>
    )
}

// TODO  Agregar Layout de los componentes con Flex layout
export const FormField: React.FC<{ fieldDescription: FieldDescription, disabled?: boolean }> =
    ({
         fieldDescription,
         disabled
     }) => {
        const {updateState} = useDynamicFormContext();
        const fieldController = useField<any>(fieldDescription.initialValue, (value: any) => {
            updateState((prevState) => {
                return {
                    ...prevState,
                    [fieldDescription.propertyName]: {value: value, itsValid: true}
                }
            })
        });

        switch (fieldDescription.fieldType) {
            case "input":
                return (<Input
                    disabled={disabled}
                    placeholder={fieldDescription.placeholder}
                    type={fieldDescription.inputType}
                    labelText={fieldDescription.name}
                    labelFor={fieldDescription.name}
                    {...fieldController}
                />);

            case "select":
                if (!fieldDescription.options) {
                    console.error("SELECT type most provide options Array")
                    return (
                        <pre>
                         "SELECT type most provide options Array"
                    </pre>
                    )
                }
                return <Select
                    labelText={fieldDescription.name}
                    options={fieldDescription!.options}
                    {...fieldController}
                />
            default:
                return <div>"invalid type"</div>
        }
    }
