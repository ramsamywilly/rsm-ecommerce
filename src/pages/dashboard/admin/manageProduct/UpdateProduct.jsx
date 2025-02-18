import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';  

const categories = [
    { label: 'Choisir une catégorie', value: '' },
    { label: 'Matériel', value: 'materiel' },
    { label: 'Accessoire', value: 'accessoire' },
    { label: 'Manutention', value: 'manutention' },
    { label: 'Outillage', value: 'outillage' },
];

const gammes = [
    { label: 'Choisir une gamme', value: '' },
    { label: 'Agricole', value: 'agricole' },
    { label: 'Btp', value: 'btp' },
    { label: 'Industrie', value: 'industrie' },
];

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        gamme: '',
        price: '',
        description: '',
        image: ''
    });

    const {data: productData, isLoading: isProductLoading, error: fetchError, refetch} = useFetchProductByIdQuery(id);

    const [newImage, setNewImage] = useState(null);

    const {name, category, gamme, description, image: imageURL, price} = productData?.product || {};

    const [updateProduct, {isLoading: isUploading, error: updateError}] = useUpdateProductMutation();

    useEffect(() => {
        console.log("Données du produit:", productData);
        if (productData) {
            setProduct({
                name: name || '',
                category: category || '',
                gamme: gamme || '',
                price: price || '',
                description: description || '',
                image: imageURL || '',
            });
        }
    }, [productData]);
 console.log("Données de produit chargées :", productData);
useEffect(() => {
    console.log("Valeur actuelle de gamme :", product.gamme);
    console.log("Options disponibles :", gamme);
}, [product.gamme, gammes]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleImageChange = (image) => {
        setNewImage(image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image,
            author: user?._id,
        };

        try {
            await updateProduct({ id: id, ...updatedProduct }).unwrap();
            alert('Produit mis à jour avec succès');
            await refetch();
            navigate('/dashboard/manage-products');
        } catch (error) {
            console.log('Échec de la soumission du produit', error);
        }
    };

    if (isProductLoading) return <div>Chargement...</div>;
    if (fetchError) return <div>Erreur de Chargement de produit!...</div>;

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Mise à jour du Produit</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Nom du Produit"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nom du Produit"
                />

                <SelectInput 
                    label="Catégorie"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />

                <SelectInput
                    label="Gamme"
                    name="gamme"
                    value={product.gamme}
                    onChange={handleChange}
                    options={gammes}
                />

                <TextInput
                    label="Prix"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Prix"
                />

                {/* Using the UploadImage component */}
                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || product.image}
                    placeholder="Choisir une image"
                    setImage={handleImageChange}
                />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description du Produit
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="add-product-InputCSS"
                        value={product.description}
                        placeholder="Rédiger une description du produit"
                        onChange={handleChange}
                        style={{ height: "90px" }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="add-product-btn"
                >
                    {isUploading ? 'Actualisation...' : 'Mise à jour du produit'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;



