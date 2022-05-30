import { InternalServerErrorInterface } from './interfaces';

const remoteServerURL = 'https://serene-inlet-66010.herokuapp.com';

// Not ready
export async function uploadFile(
  token: string,
  taskID: string,
  file: File
): Promise<string | InternalServerErrorInterface | void> {
  const formData: FormData = new FormData();
  formData.append('taskId', taskID);
  formData.append('file', file);
  await fetch(`${remoteServerURL}/file`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data', // Not necessary header
    },
    body: formData,
  })
    .then(async (response) => {
      let data;
      if (response.ok) {
        data = await Promise.resolve(response.text());
        console.log('data:string : ', data);
      } else if (!response.ok) {
        data = await response.json();
        if (response.status === 409) {
          console.log('file already exists or incorrect MIME type');
          console.log('data:InternalServerErrorInterface : ', data);
        } else {
          console.log('Something has gone wrong while uploadFile()');
          console.log('data:InternalServerErrorInterface : ', data);
        }
      }
      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}

// Not ready
export async function downloadFile(
  token: string,
  taskID: string,
  fileName: string
): Promise<Blob | InternalServerErrorInterface | void> {
  await fetch(`${remoteServerURL}/file/${taskID}/${fileName}`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      let data;
      if (response.ok) {
        data = await response.blob();
        console.log('data:Blob : ', data);
      } else if (!response.ok) {
        data = await response.json();
        console.log('Something has gone wrong while downloadFile()');
        console.log('data:InternalServerErrorInterface : ', data);
      }
      return data;
    })
    .catch((error) => {
      throw new Error(`${error.status} error: ${error.statusText}`);
    });
}
