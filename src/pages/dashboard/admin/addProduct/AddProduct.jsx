import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';  
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';


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

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        gamme: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState('');

    const [AddProduct, {isLoading, error}] = useAddProductMutation()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!product.name || !product.category || !product.price || !product.description || !product.gamme) {
            alert('Veuillez remplir tous les champs obligatoires!');
            return;
        }
            try {
                await AddProduct({...product, image, author: user?._id}).unwrap();
                alert('Produit ajouté avec succès');
                setProduct({name: '',
                        category: '',
                        gamme: '',
                        price: '',
                        description: ''
                    })
                setImage('');
                navigate('/shop')

        } catch (error) {
            console.log('Échec de la soumission du produit', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Ajout de Nouveau Produit</h2>
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
	                name="Image"
	                id="image"
	                value={e => setImage(e.target.value)}
	                placeholder="Choisir une image"
	                setImage={setImage}
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
                    Ajouter le Produit
                </button>
            </form>
        </div>
    );
};

export default AddProduct;



