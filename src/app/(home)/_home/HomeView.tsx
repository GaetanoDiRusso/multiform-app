"use client"
import React from 'react'
import useHomeViewModel from './useHomeViewModel'
import { PFormStructure } from '@/models/PFormStructure'
import FormPage from './FormPage'
import { Button } from '@/components/ui/button'

type Props = {
    formStructure: PFormStructure,
}

const HomeView = ({ formStructure }: Props) => {
    const { currentPage, loading, error, userFormData, changeField, clearData, continueHandler, backHandler } = useHomeViewModel();

    return (
        <div className='flex flex-col p-10 h-screen'>
            {error && <p className='mx-auto text-red-500'>{error}</p>}
            {(currentPage === 1) && (
                <FormPage title='Page one' fields={formStructure.pageOne} userFormData={userFormData} onUpdateField={changeField} />
            )}

            {(currentPage === 2) && (
                <FormPage title='Page Two' fields={formStructure.pageTwo} userFormData={userFormData} onUpdateField={changeField} />

            )}

            {(currentPage === 3) && (
                <FormPage title='Page Three' fields={formStructure.pageThree} userFormData={userFormData} onUpdateField={changeField} />
            )}

            <div className='flex gap-5 mx-auto mt-auto'>
                <Button disabled={loading} onClick={clearData} className='mx-auto mt-5' >Clear</Button>
                <Button disabled={currentPage === 1} onClick={backHandler} className='mx-auto mt-5' >Back</Button>
                <Button disabled={loading} onClick={continueHandler} className='mx-auto mt-5' >{currentPage < 3 ? "Continue" : "Submit"}</Button>
            </div>
        </div>
    )
}

export default HomeView