import imageCompression from "browser-image-compression";

/**
 * Compresses an image file and converts it to WebP format.
 * @param {File} imageFile - The image file to compress.
 * @returns {Promise<File>} - The compressed WebP file.
 */
export const compressImage = async (imageFile) => {
  const options = {
    maxSizeMB: 1, // Max size in MB
    maxWidthOrHeight: 1920, // Max width or height
    useWebWorker: true,
    fileType: "image/webp", // Force conversion to WebP
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);

    // Create a new File object with the correct name and type if needed,
    // though browser-image-compression usually returns a Blob/File.
    // We ensure the name ends in .webp
    const newName = imageFile.name.replace(/\.[^/.]+$/, "") + ".webp";

    // If the result is a Blob, convert to File to preserve name
    return new File([compressedFile], newName, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Image compression error:", error);
    throw error;
  }
};
