"use server"

import axios from 'axios';
import { z } from 'zod';

// Schéma de validation pour les produits
const productSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
    price: z.number().positive({ message: "Le prix doit être positif" }),
    quantity: z.number().int().positive({ message: "La quantité doit être un nombre entier positif" }),
    category_id: z.string(),
    supplier_id: z.string()
})

// Type pour les produits
export type Product = z.infer<typeof productSchema>;

// Fonction pour récupérer tous les produits
export const getProducts = async () => {
    try {
        const response = await axios.get<{ data: Product[] }>("http://localhost:8000/api/products");
        return { success: true, data: response.data.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Erreur lors de la récupération des produits" };
    }
};

// Fonction pour créer un produit
export const createProduct = async (formData: FormData) => {
    try {
        const validateFields = productSchema.safeParse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: Number(formData.get("price")),
            quantity: Number(formData.get("quantity")),
            category_id: formData.get("category_id"),
            supplier_id: formData.get("supplier_id")
        });

        if (!validateFields.success) {
            return {
                errors: validateFields.error.flatten().fieldErrors
            };
        }

        const response = await axios.post("http://localhost:8000/api/products", validateFields.data);
        return { success: true, data: response.data };

    } catch (error: any) {
        return {
            error: error.response?.data?.message || "Une erreur est survenue lors de la création du produit"
        };
    }
};
