"use client"
import FieldPlaceholder from '@/components/ui/FieldPlaceholder'
import React from 'react'
import useAdminViewModel from './useAdminViewModel'
import { ExtendedPFieldStructure } from '@/utils/form.utils'
import { Button } from '@/components/ui/button'

type Props = {
  initialFormStructure: ExtendedPFieldStructure,
}

const AdminView = ({ initialFormStructure }: Props) => {
  const { loading, error, formStructure, updateFieldPage, saveChanges } = useAdminViewModel({ initialFormStructure });

  return (
    <div className='flex flex-col gap-4 p-10'>
      <h1 className='pb-5 text-center text-3xl'>Admin Page</h1>

      {error && <span className='mx-auto text-red-500'>{error}</span>}

      <div className='flex flex-wrap gap-2'>
        {formStructure.map(e => (
          <FieldPlaceholder disabled={loading} key={e.id} fieldData={e} onUpdatePage={(p) => updateFieldPage(e.id, p)} />
        ))}
      </div>

      <Button onClick={saveChanges} disabled={loading} className='w-fit mx-auto'>{loading ? "Loading..." : "Save Changes"}</Button>
    </div>
  )
}

export default AdminView