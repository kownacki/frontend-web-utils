import {calculateCropAndResize} from './fitAndCompress.js';

describe('calculateCropAndResize', () => {
  test('Same dimensions', () => {
    const maxWidth = 150;
    const maxHeight = 100;
    const srcWidth = 150;
    const srcHeight = 100;
    ['cover', 'cover-with-clip', 'scale-down'].forEach((fit) => {
      expect(calculateCropAndResize(fit, maxWidth, maxHeight, srcWidth, srcHeight))
        .toEqual({
          newSize: {width: 150, height: 100},
          crop: {x: 0, y: 0, width: 150, height: 100},
        });
    });
  });

  test('Bigger max dimensions.', () => {
    const maxWidth = 300;
    const maxHeight = 400;
    const srcWidth = 150;
    const srcHeight = 100;
    ['cover', 'cover-with-clip', 'scale-down'].forEach((fit) => {
      expect(calculateCropAndResize(fit, maxWidth, maxHeight, srcWidth, srcHeight))
        .toEqual({
          newSize: {width: 150, height: 100},
          crop: {x: 0, y: 0, width: 150, height: 100},
        });
    });
  });

  test('Smaller max dimensions - crop top and bottom.', () => {
    const maxWidth = 150;
    const maxHeight = 80;
    const srcWidth = 1500;
    const srcHeight = 1000;
    expect(calculateCropAndResize('cover', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 150, height: 100},
        crop: {x: 0, y: 0, width: 1500, height: 1000},
      });
    expect(calculateCropAndResize('cover-with-clip', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 150, height: 80},
        crop: {x: 0, y: 100, width: 1500, height: 800},
      });
    expect(calculateCropAndResize('scale-down', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 120, height: 80},
        crop: {x: 0, y: 0, width: 1500, height: 1000},
      });
  });

  test('Smaller max dimensions - crop left and right.', () => {
    const maxWidth = 120;
    const maxHeight = 100;
    const srcWidth = 1500;
    const srcHeight = 1000;
    expect(calculateCropAndResize('cover', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 150, height: 100},
        crop: {x: 0, y: 0, width: 1500, height: 1000},
      });
    expect(calculateCropAndResize('cover-with-clip', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 120, height: 100},
        crop: {x: 150, y: 0, width: 1200, height: 1000},
      });
    expect(calculateCropAndResize('scale-down', maxWidth, maxHeight, srcWidth, srcHeight))
      .toEqual({
        newSize: {width: 120, height: 80},
        crop: {x: 0, y: 0, width: 1500, height: 1000},
      });
  });

  test('Max width bigger, max height smaller', () => {
    const maxWidth = 1500;
    const maxHeight = 1000;
    const srcWidth = 1500;
    const srcHeight = 1000;
    ['cover', 'cover-with-clip', 'scale-down'].forEach((fit) => {
      expect(calculateCropAndResize('cover', maxWidth, maxHeight, srcWidth, srcHeight))
        .toEqual({
          newSize: {width: 1500, height: 1000},
          crop: {x: 0, y: 0, width: 1500, height: 1000},
        });
    });
  });

  test('Max width smaller, max height bigger', () => {
    const maxWidth = 2000;
    const maxHeight = 800;
    const srcWidth = 1500;
    const srcHeight = 1000;
    ['cover', 'cover-with-clip', 'scale-down'].forEach((fit) => {
      expect(calculateCropAndResize('cover', maxWidth, maxHeight, srcWidth, srcHeight))
        .toEqual({
          newSize: {width: 1500, height: 1000},
          crop: {x: 0, y: 0, width: 1500, height: 1000},
        });
    });
  });
});
