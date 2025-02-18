import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddOccasionMutation } from "../../../../redux/features/occasion/occasionApi";
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

const AddOccasion = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [addOccasion, { isLoading }] = useAddOccasionMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [occasion, setOccasion] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    condition: "",
  });

  const [image, setImage] = useState("");

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
    if (isSubmitting) return;

    if (!occasion.title || !occasion.description || !occasion.category || !occasion.price || !occasion.condition || !image) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    setIsSubmitting(true);

    try {
      await addOccasion({ ...occasion, imageUrl: image }).unwrap();
      alert("Occasion ajoutée avec succès !");
      setOccasion({
        title: "",
        description: "",
        category: "",
        price: "",
        condition: "",
      });
      setImage("");
      navigate("/occasion");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert(error?.data?.message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-8 bg-white shadow-md rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une Occasion</h2>
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

        {/* Using the UploadImage component */}
        <UploadImage
          name="Image"
          id="image"
          value={image}
          onChange={handleImageChange}
          placeholder="Choisir une image"
          setImage={setImage}
        />

        <button type="submit" className="add-product-btn" disabled={isLoading || isSubmitting}>
          {isSubmitting ? "Ajout en cours..." : "Ajouter l'occasion"}
        </button>
      </form>
    </div>
  );
};

export default AddOccasion;
