import { useEffect, useState } from "react";

interface GalleryProps {
  images: string[];
  initialIndex?: number;
  onClose?: () => void;
}

const Gallery = ({ images, initialIndex = 0, onClose }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(initialIndex);

  useEffect(() => {
    setSelectedImage(initialIndex);
  }, [initialIndex]);

  const handleClose = () => {
    onClose?.();
  };

  const handlePrev = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "white",
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
        }}
      >
        ✕
      </button>

      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "1rem",
          color: "white",
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          opacity: selectedImage === 0 ? 0.5 : 1,
        }}
        disabled={selectedImage === 0}
      >
        ←
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "1rem",
          color: "white",
          fontSize: "1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          opacity: selectedImage === images.length - 1 ? 0.5 : 1,
        }}
        disabled={selectedImage === images.length - 1}
      >
        →
      </button>

      <img
        src={images[selectedImage]}
        alt={`Gallery image ${selectedImage + 1}`}
        style={{
          maxHeight: "90vh",
          maxWidth: "90vw",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default Gallery;
