"use server"

import axios from 'axios';
import { z } from 'zod';

const supplierSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type Supplier = z.infer<typeof supplierSchema>;

export const getSuppliers = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/suppliers`);
        return {
            success: true,
            data: response.data as Supplier[]
        };
    } catch (error) {
        return {
            success: false,
            error: "Erreur lors de la récupération des fournisseurs"
        };
    }
};
