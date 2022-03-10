const calculateNewSize = (fit, maxWidth, maxHeight, srcWidth, srcHeight) => {
  let newSize;
  if (fit === 'cover-with-clip') {
    newSize = {
      width: Math.min(srcWidth, maxWidth),
      height: Math.min(srcHeight, maxHeight),
    }
  } else { // 'cover' or 'scale-down'
    const widthRatio = maxWidth / srcWidth;
    const heightRatio = maxHeight / srcHeight;
    let resizeRatio = (fit === 'cover')
      ? Math.max(widthRatio, heightRatio)
      // 'scale-down'
      : Math.min(widthRatio, heightRatio);
    // Prevent enlarging image. Image can only get smaller.
    resizeRatio = Math.min(resizeRatio, 1);
    newSize = {width: srcWidth * resizeRatio, height: srcHeight * resizeRatio};
  }
  return newSize;
};
const cropWithAspectRatio = (newWidth, newHeight, srcWidth, srcHeight) => {
  const resizeRatio = Math.min(srcWidth / newWidth, srcHeight / newHeight);
  const cropSize = {
    width: newWidth * resizeRatio,
    height: newHeight * resizeRatio,
  };
  return {
    ...cropSize,
    x: (srcWidth - cropSize.width) / 2,
    y: (srcHeight - cropSize.height) / 2
  }
};
export const calculateCropAndResize = (fit, maxWidth, maxHeight, srcWidth, srcHeight) => {
  const newSize = calculateNewSize(fit, maxWidth, maxHeight, srcWidth, srcHeight);
  return {
    newSize,
    crop: fit === 'cover-with-clip'
      ? cropWithAspectRatio(newSize.width, newSize.height, srcWidth, srcHeight)
      // 'cover' or 'scale-down'
      : {x: 0, y: 0, width: srcWidth, height: srcHeight},
  };
};

// Returns promise with data URL containing resized and compressed image
// Based on goo.gl/DEP8Y
// fit - 'cover-with-clip', 'cover', or 'scale-down'
// quality - Quality of compressed jpeg image. Number between 0 and 1
export const fitAndCompress = async (fit = 'scale-down', maxWidth = Infinity, maxHeight = Infinity, quality, imageFile) => {
  const img = document.createElement('img');
  const canvas = document.createElement('canvas');
  img.src = URL.createObjectURL(imageFile);
  await new Promise((resolve) => img.addEventListener('load', resolve));
  const cropAndResize = calculateCropAndResize(fit, maxWidth, maxHeight, img.width, img.height);
  Object
    .assign(canvas, cropAndResize.newSize)
    .getContext('2d')
    .drawImage(img,
      ...[cropAndResize.crop.x, cropAndResize.crop.y, cropAndResize.crop.width, cropAndResize.crop.height],
      0, 0, canvas.width, canvas.height,
    );
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
};
