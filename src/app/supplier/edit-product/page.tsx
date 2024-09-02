'use client'

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProductPageRedirect = () => {
    const router = useRouter()
    toast.error("Please select a product to edit from the view products page.");
    router.replace("/supplier/view-products");
    return null;
}

export default EditProductPageRedirect;
