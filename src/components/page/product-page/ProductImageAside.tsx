import React from "react";
import ProductImages from "./ProductImages";

const ProductImageAside = ({ images }: { images: string[] | undefined }) => {
  return (
    <aside className="space-y-4 self-start">
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
