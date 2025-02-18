import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchOccasionByIdQuery, useUpdateOccasionMutation } from "../../../../redux/features/occasion/occasionApi";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";
import UploadImage from "../addProduct/UploadImage";

const categories = [
  { label: "Choisir une catégorie", value: "" },
  { label: "Matériel", value: "material" },
  { label: "Accessoire", value: "accessory" },
  { label: "Manutention", value: "lifting" },
  { label: "Outillage", value: "tools" },
];

const conditions = [
  { label: "Neuf", value: "Neuf" },
  { label: "Très bon état", value: "Très bon état" },
  { label: "Bon état", value: "Bon état" },
  { label: "Satisfaisant", value: "satisfaisant" },
];

const UpdateOccasion = () => {
  const { id } = useParams(); // Récupère l'ID de l'occasion depuis l'URL
  const navigate = useNavigate();
  
  const { data: occasionData, isLoading: isFetching } = useFetchOccasionByIdQuery(id);
  const [updateOccasion, { isLoading: isUpdating }] = useUpdateOccasionMutation();
  
  const [occasion, setOccasion] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    condition: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    if (occasionData) {
      setOccasion({
        title: occasionData.title || "",
        description: occasionData.description || "",
        category: occasionData.category || "",
        price: occasionData.price || "",
        condition: occasionData.condition || "",
      });
      setImage(occasionData.imageUrl || "");
    }
  }, [occasionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOccasion((prevOccasion) => ({
      ...prevOccasion,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) return;

    if (!occasion.title || !occasion.description || !occasion.category || !occasion.price || !occasion.condition || !image) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    try {
      await updateOccasion({ id, ...occasion, imageUrl: image }).unwrap();
      alert("Occasion mise à jour avec succès !");
      navigate("/occasion");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert(error?.data?.message || "Une erreur est survenue.");
    }
  };

  if (isFetching) return <p>Chargement des données...</p>;

  return (
    <div className="container mx-auto mt-8 bg-white shadow-md rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Modifier l'Occasion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput 
          label="Titre" 
          name="title" 
          value={occasion.title} 
          onChange={handleChange} 
          type="text" 
          placeholder="Titre de l'occasion" 
        />

        <SelectInput 
          label="Catégorie" 
          name="category" 
          value={occasion.category} 
          onChange={handleChange} 
          options={categories} 
        />

        <SelectInput 
          label="État" 
          name="condition" 
          value={occasion.condition} 
          onChange={handleChange} 
          options={conditions} 
        />

        <TextInput 
          label="Prix (€)" 
          name="price" 
          value={occasion.price} 
          onChange={handleChange} 
          type="number" 
          placeholder="Prix" 
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={occasion.description}
            placeholder="Description de l'occasion"
            onChange={handleChange}
            style={{ height: "90px" }}
          ></textarea>
        </div>

        {/* Upload Image */}
        <UploadImage
          name="Image"
          id="image"
          value={image}
          onChange={handleImageChange}
          placeholder="Choisir une image"
          setImage={setImage}
        />

        <button type="submit" className="add-product-btn" disabled={isUpdating}>
          {isUpdating ? "Mise à jour en cours..." : "Mettre à jour l'occasion"}
        </button>
      </form>
    </div>
  );
};

export default UpdateOccasion;

