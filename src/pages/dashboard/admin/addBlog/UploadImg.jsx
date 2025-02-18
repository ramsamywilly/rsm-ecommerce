import React, { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseURL";

const UploadImg = ({ setBlog }) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // Convertir un fichier en base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Fonction pour uploader l'image
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Format de fichier non supporté. Veuillez choisir une image JPG, PNG ou WEBP.");
      return;
    }

    try {
      setLoading(true);
      const base64 = await convertBase64(file);
      const response = await axios.post(`${getBaseUrl()}/uploadImage`, { image: base64 });

      if (response.data) {
        const uploadedImageUrl = response.data;
        console.log("Image uploadée avec succès :", uploadedImageUrl);
        
        setPreviewUrl(uploadedImageUrl); // Met à jour l'aperçu de l'image
        setBlog((prev) => ({ ...prev, imageUrl: uploadedImageUrl })); // Met à jour l'image du blog
      } else {
        alert("Erreur lors de l'upload de l'image.");
      }
    } catch (error) {
      console.error("Erreur de téléchargement de l'image :", error);
      alert("Une erreur est survenue lors du téléchargement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="upload-blog-image" className="block text-sm font-medium text-gray-700">
        Choisir une image pour le blog
      </label>
      <input
        type="file"
        id="upload-blog-image"
        accept="image/*"
        onChange={uploadImage}
        className="mt-2 border p-2 w-full rounded-md"
      />

      {loading && <p className="mt-2 text-blue-600">Téléchargement en cours...</p>}

      {previewUrl && (
        <div className="mt-2">
          <p className="text-green-600">Image téléchargée avec succès !</p>
          <img src={previewUrl} alt="Aperçu" className="w-full max-w-xs rounded-md mt-2" />
        </div>
      )}
    </div>
  );
};

export default UploadImg;
