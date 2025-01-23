import { NextResponse } from 'next/server';

export function middleware(request) {
const token = request.cookies.get('token'); // Obtén el token de las cookies
const pathname = request.nextUrl.pathname;

// Define las rutas públicas y protegidas
const isPublicRoute = ['/login', '/signup'].includes(pathname);
/*
// Si no hay token y la ruta no es pública, redirige al login
if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
}
*/
// Si hay token y el usuario intenta acceder a una ruta pública (como login), redirige a /completo
if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/completo', request.url));
}

return NextResponse.next(); // Permite continuar con la solicitud
}

// Configuración del middleware para que se aplique a todas las rutas excepto las estáticas
export const config = {
matcher: ['/((?!_next/static|favicon.ico|api).*)'], // Aplica a todo excepto estáticos y API
};
