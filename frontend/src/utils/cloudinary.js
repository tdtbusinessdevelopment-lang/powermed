// Cloudinary utility functions for image transformation

/**
 * Transform a Cloudinary URL with specified parameters
 * @param {string} url - The original Cloudinary URL
 * @param {Object} options - Transformation options
 * @param {number} options.width - Image width
 * @param {number} options.height - Image height
 * @param {string} options.crop - Crop mode (e.g., 'limit', 'fill', 'scale')
 * @returns {string} - Transformed Cloudinary URL
 */
export const transformCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary')) {
    return url;
  }

  const { width = 800, height = 800, crop = 'limit' } = options;
  
  // Replace /upload/ with /upload/transformation_string/
  const transformationString = `c_${crop},h_${height},w_${width}`;
  const transformedUrl = url.replace(
    '/upload/',
    `/upload/${transformationString}/`
  );
  
  return transformedUrl;
};

/**
 * Get a thumbnail version of a Cloudinary image
 * @param {string} url - The original Cloudinary URL
 * @param {number} size - Thumbnail size (width and height)
 * @returns {string} - Thumbnail URL
 */
export const getCloudinaryThumbnail = (url, size = 150) => {
  return transformCloudinaryUrl(url, {
    width: size,
    height: size,
    crop: 'fill',
  });
};

/**
 * Get a product image version with standard sizing
 * @param {string} url - The original Cloudinary URL
 * @returns {string} - Product image URL
 */
export const getCloudinaryProductImage = (url) => {
  return transformCloudinaryUrl(url, {
    width: 800,
    height: 800,
    crop: 'limit',
  });
};
