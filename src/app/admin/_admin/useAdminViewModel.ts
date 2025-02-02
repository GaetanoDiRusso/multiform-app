"use client"
import { PFieldStructure, PFormStructure } from '@/models/PFormStructure'
import { updateFormStructure } from '@/server/infraestructure/server-actions/FormActions'
import { ExtendedPFieldStructure, fromExtendedPFormStructure, toExtendedPFormStructure } from '@/utils/form.utils'
import { callServerAction } from '@/utils/server-actions.utils'
import React, { useState } from 'react'

type Props = {
    initialFormStructure: ExtendedPFieldStructure,
}

const useAdminViewModel = ({ initialFormStructure }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formStructure, setFormStructure] = useState(initialFormStructure)

    const updateFieldPage = (fieldId: string, newPage: 1 | 2 | 3) => {
        setFormStructure(prev => prev.map(e => e.id === fieldId ? { ...e, page: newPage } : e))
    }

    const saveChanges = async () => {
        try {
            setLoading(true);
            const res = await callServerAction(updateFormStructure(fromExtendedPFormStructure(formStructure)));
            setFormStructure(toExtendedPFormStructure(res))
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        formStructure,
        loading,
        error,
        updateFieldPage,
        saveChanges,
    }
}

export default useAdminViewModel;