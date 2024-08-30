import { redirect } from 'next/navigation'
import React from 'react'

const AdminSupplierPage = ({params: {id}}: {
    params: {
        id: string
    }
}) => redirect(`/admin/suppliers/${id}/products`)

export default AdminSupplierPage