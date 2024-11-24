const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { firebaseApp } = require("./firebase");

const storage = getStorage(firebaseApp);
const uploadFile = async (filePath, destination) => {
  const fileRef = ref(storage, destination);
  const fs = require("fs");
  const file = fs.readFileSync(filePath);

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir archivo:", error.message);
    throw new Error("Error al subir archivo a Firebase Storage");
  }
};

module.exports = { uploadFile };
