import React, { useState } from "react";
import "../KidsAndYouth.css";
import image1 from "../../../assets/photos/KidsAndYouth/image1.JPG";
import image2 from "../../../assets/photos/KidsAndYouth/image2.JPG";
import image3 from "../../../assets/photos/KidsAndYouth/image3.JPG";
import image4 from "../../../assets/photos/KidsAndYouth/image4.JPG";
import image5 from "../../../assets/photos/KidsAndYouth/image5.JPG";
import image6 from "../../../assets/photos/KidsAndYouth/image6.JPG";
import image7 from "../../../assets/photos/KidsAndYouth/image7.JPG";
import image8 from "../../../assets/photos/KidsAndYouth/image8.JPG";
import image9 from "../../../assets/photos/KidsAndYouth/image9.JPG";
import image10 from "../../../assets/photos/KidsAndYouth/image10.JPG";
import image11 from "../../../assets/photos/KidsAndYouth/image11.JPG";
import image12 from "../../../assets/photos/KidsAndYouth/image12.JPG";

interface ImageItem {
  src: string;
  alt: string;
}

const IMAGES: ImageItem[] = [
  { src: image1, alt: "Kids and Youth 1" },
  { src: image2, alt: "Kids and Youth 2" },
  { src: image3, alt: "Kids and Youth 3" },
  { src: image4, alt: "Kids and Youth 4" },
  { src: image5, alt: "Kids and Youth 5" },
  { src: image6, alt: "Kids and Youth 6" },
  { src: image7, alt: "Kids and Youth 7" },
  { src: image8, alt: "Kids and Youth 8" },
  { src: image9, alt: "Kids and Youth 9" },
  { src: image10, alt: "Kids and Youth 10" },
  { src: image11, alt: "Kids and Youth 11" },
  { src: image12, alt: "Kids and Youth 12" },
];

const KidsAndYouthGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="wrapper--content mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {IMAGES.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidsAndYouthGallery;