
import { FileOpener } from "@capawesome-team/capacitor-file-opener";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

const fetchFileAsBlob = async (filePath) => {
  const response = await fetch(filePath);
  return response.blob();
};

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const saveFileToFilesystem = async (fileName, base64Data) => {
  await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Documents,
    encoding: Encoding.Base64,
  });

  return Filesystem.getUri({
    path: fileName,
    directory: Directory.Documents,
  });
};

const openFileOnAndroid = async (filePath, name) => {
  try {
    const blob = await fetchFileAsBlob(filePath);
    const base64Data = await convertBlobToBase64(blob);
    const fileUri = await saveFileToFilesystem(name, base64Data);
    await FileOpener.openFile({ path: fileUri.uri });
  } catch (error) {
    console.error('PDF opener ERROR:', error);
    throw error;
  }
};

export const openFile = (category, target_name) => {
  const filePath = `/data/categories/${category.parent_dir}/${target_name}`;
  switch (Capacitor.getPlatform()) {
    case "android":
      return openFileOnAndroid(filePath, target_name);
    case "ios":
      return;
    case "web":
      window.open("/price" + filePath, "_blank");
      return;
  }
};
