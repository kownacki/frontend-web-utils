import {sleep} from 'mk-js-utils';

// Opens file upload window and resolves when user finishes upload.
// Depending on user's choice:
// 1. If user chooses a file to upload, returns a promise with that file.
// 2. If user cancels by closing the upload window without uploading a file, returns a promise with false.
// We assume that upload was canceled if 300ms lasted after focusing window
// see https://bit.ly/2V0F6DB
export const upload = async () => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';

    // Resolve as soon as a file is uploaded
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      resolve(file);
    });

    // Wait at most 300ms until assuming upload was canceled
    window.addEventListener('focus', async () => {
      await sleep(300);
      if (!input.files.length) {
        resolve(false);
      }
    }, {once: true});

    input.click();
  });
};
