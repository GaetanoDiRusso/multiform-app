"use client"
import { getLocalUserFormData, setLocalUserFormData } from '@/app/helpers/form.localstorage.helper';
import { PUserFormData } from '@/models/PUserFormData';
import { createOrSaveUserFormData } from '@/server/infraestructure/server-actions/FormActions';
import { callServerAction } from '@/utils/server-actions.utils';
import { useEffect, useState } from 'react'

const EMPTY_USER_FORM_DATA = {
    email: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    zip: undefined,
    state: '',
    about: '',
}

const useHomeViewModel = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const continueHandler = () => {
        if (currentPage < 3) {
            setCurrentPage(prev => prev < 3 ? prev + 1 : prev);
        }

        saveDataHandler();
    }

    const backHandler = () => {
        if (currentPage >= 1) {
            setCurrentPage(prev => prev >= 1 ? prev - 1 : prev);
        }
    }

    const [userFormData, setUserFormData] = useState<PUserFormData>(EMPTY_USER_FORM_DATA);

    useEffect(() => {
        retrieveExistingUserFormData();
    }, []);

    useEffect(() => {
        console.log("USEEFFECT", userFormData);
        if (Object.values(userFormData).some(v => !!v)) {
            console.log("SET LOCALSTORAGE", userFormData);
            setLocalUserFormData(userFormData)
        }
    }, [userFormData])

    const retrieveExistingUserFormData = async () => {
        try {
            setLoading(true);

            const localFormData = getLocalUserFormData();
            if (localFormData) {
                setUserFormData(localFormData);

                // const { email } = localFormData;

                // if (email) {
                //     // Retrieve the latest data from backend
                //     const data = await callServerAction(getCurrentUserFormData(email));
                //     if (data) {
                //         setUserFormData(data);
                //     }
                // }
            }
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    const saveDataHandler = async () => {
        try {
            setLoading(true);

            await callServerAction(createOrSaveUserFormData(userFormData));

            if (currentPage === 3) {
                alert("Data saved successfully");
                clearData();
                setCurrentPage(1);
            }
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    const changeField = (fieldName: keyof PUserFormData, data: string | number) => {
        setUserFormData(prev => ({ ...prev, [fieldName]: data }))
    }

    const clearData = () => {
        setUserFormData(EMPTY_USER_FORM_DATA);
        setLocalUserFormData(EMPTY_USER_FORM_DATA);
    }

    return {
        loading,
        error,
        userFormData,
        currentPage,
        continueHandler,
        backHandler,
        changeField,
        saveDataHandler,
        clearData,
    }
}

export default useHomeViewModel