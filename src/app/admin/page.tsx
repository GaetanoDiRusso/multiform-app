export const fetchCache = 'force-no-store'

import React from 'react'
import AdminView from './_admin/AdminView'
import { callServerAction } from '@/utils/server-actions.utils';
import { getFormStructure } from '@/server/infraestructure/server-actions/FormActions';
import { ExtendedPFieldStructure, toExtendedPFormStructure } from '@/utils/form.utils';

const Admin = async () => {
    let formStructure: ExtendedPFieldStructure | undefined = undefined;

    try {
        const res = await callServerAction(getFormStructure());
        formStructure = toExtendedPFormStructure(res);
    } catch (error) {
        console.log({ error });
        return <div>Unexpected error, please try again</div>
    }

    if (!formStructure) return <div>Unexpected error, please try again</div>;

    return (
        <AdminView initialFormStructure={formStructure} />
    )
}

export default Admin