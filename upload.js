import {sleep} from 'mk-js-utils';

// Opens file upload window and resolves when user finishes upload.
// Depending on user's choice:
// 1. If user chose a file to upload, returns a promise with that file.
// 2. If user closes window without uploading a file, returns a promise with false.
export const upload = async () => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';
    // Resolve as soon as a file is uploaded
    const changeHandler = (event) => {
      const file = event.target.files[0];
      event.target.value = '';
      resolve(file);
    };
    input.addEventListener('change', changeHandler, {once: true});
    // Wait at most 300ms until assuming upload was canceled
    window.addEventListener('focus', async () => {
      await sleep(300);
      if (!input.files.length) {
        input.removeEventListener('change', changeHandler);
        resolve(false);
      }
    }, {once: true});

    input.click();
  });
};
