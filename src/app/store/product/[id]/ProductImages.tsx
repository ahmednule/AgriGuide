"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImages = ({ images }: { images: string[] }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prepare images for the gallery
  const galleryImages = images?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <ImageGallery
      items={galleryImages}
      renderItem={(item) => renderImage(item, isFullscreen)}
      showNav={false}
      showPlayButton={false}
      autoPlay={false}
      useBrowserFullscreen={false}
      onScreenChange={(fullscreen) => setIsFullscreen(fullscreen)}
    />
  );
};

// Custom render function using @nextui-org/react Image component
const renderImage = (item: ReactImageGalleryItem, isFullscreen: boolean) => {
  return (
    <div
      className={`w-full flex items-center self-start justify-center ${
        isFullscreen ? "h-screen" : ""
      }`}
    >
      <Image
        src={item.original}
        alt={item.description || "Product Image"}
        className={isFullscreen ? "w-full h-full" : "h-80 object-cover"}
      />
    </div>
  );
};

export default ProductImages;
