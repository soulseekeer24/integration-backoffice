import React from 'react';
import {useParams} from 'react-router-dom';
import IntegrationsTable from '../components/IntegrationsTable';


const IntegrationsListPage: React.FC = () => {
    const {processorCode} = useParams<{ processorCode: string }>();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Integraciones {processorCode}</h1>

            <IntegrationsTable
                processorCode={processorCode || ''}
            />
        </div>
    );
};

export default IntegrationsListPage;
