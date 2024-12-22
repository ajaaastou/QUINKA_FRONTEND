import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const isLoginPage = req.nextUrl.pathname === '/login';
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');

    // Si l'utilisateur est déjà connecté et essaie d'accéder à la page de login
    // le rediriger automatiquement vers le dashboard
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder au dashboard
    // le rediriger vers la page de login
    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/dashboard/:path*'
    ]
};