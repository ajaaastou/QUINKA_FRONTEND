"use server"

import axios from 'axios';
import { z } from 'zod';

const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/categories`);
        return {
            success: true,
            data: response.data as Category[]
        };
    } catch (error) {
        return {
            success: false,
            error: "Erreur lors de la récupération des catégories"
        };
    }
};
