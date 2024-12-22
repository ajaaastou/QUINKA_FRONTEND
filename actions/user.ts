"use server"

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {z} from 'zod'

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(4, {message: "4 caracters at least"} )
})

export const login = async (state: any, formData: FormData) => {
    try {
        console.log(formData);

        const validateFields = loginSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password")
        })
    
        if (!validateFields.success) {
            return {
                errors: validateFields.error.flatten().fieldErrors
            }
        } 

        const {email, password} = validateFields.data
        
        const response = await axios.post("http://localhost:8000/api/user/login", {email, password})
        console.log(response);
        
        // Configuration du cookie pour une durée d'1 heure
        cookies().set("token", response.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 // 1 heure en secondes (60 secondes * 60 minutes)
        })

    } catch (error) {
        console.log(error);
    }
    
    redirect("/dashboard")
}