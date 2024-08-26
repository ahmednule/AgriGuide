import ProductImages from "@/app/store/product/[id]/ProductImages";
import React from "react";

const ProductImageAside = ({ images }: { images: string[] | undefined }) => {
  return (
    <aside className="space-y-4 md:sticky md:top-5 self-start">
      {images && images.length > 0 ? (
        <ProductImages images={images} />
      ) : (
        <div className="bg-gray-200 w-full h-[500px] rounded-lg flex items-center justify-center">
          <span>No image available</span>
        </div>
      )}
    </aside>
  );
};

export default ProductImageAside;
