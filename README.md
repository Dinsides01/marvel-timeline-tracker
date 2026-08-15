# Marvel Comic Timeline — versión independiente

Aplicación estática de React preparada para publicarse directamente con GitHub Pages. No depende de ChatGPT Sites, Cloudflare, Next.js ni un servidor propio. Supabase gestiona el registro, el inicio de sesión y la sincronización privada de cada colección.

## 1. Crear Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/).
2. Abre **SQL Editor**, pega el contenido de `supabase/schema.sql` y ejecútalo.
3. En **Authentication > Providers**, activa **Email**.
4. En **Authentication > URL Configuration**, coloca como **Site URL** la dirección final de GitHub Pages, por ejemplo `https://USUARIO.github.io/REPOSITORIO/`.
5. Copia la **Project URL** y la clave pública **anon/publishable**. Nunca uses `service_role` en esta aplicación.

## 2. Probar localmente

Requiere Node.js 22.13 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Edita `.env.local`:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA_ANON
```

Sin esas variables, la aplicación funciona normalmente pero guarda los datos solo en el navegador.

## 3. Subir a GitHub

```bash
git init
git add .
git commit -m "Publicar Marvel Comic Timeline"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## 4. Añadir Supabase a GitHub

En el repositorio abre **Settings > Secrets and variables > Actions** y crea dos secretos:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Aunque la clave `anon` es pública, se mantiene aquí para que el mismo código funcione en desarrollo y producción sin editar archivos.

## 5. Activar GitHub Pages

1. Abre **Settings > Pages**.
2. En **Build and deployment > Source**, selecciona **GitHub Actions**.
3. Vuelve a **Actions** y ejecuta “Publicar en GitHub Pages”, o realiza un nuevo `push` a `main`.

El flujo `.github/workflows/deploy-pages.yml` instala, compila y publica automáticamente la carpeta `dist`.

## Comandos

- `npm run dev`: desarrollo local.
- `npm run build`: validación de TypeScript y compilación estática.
- `npm run preview`: revisar localmente la compilación final.

## Seguridad y datos

- Las contraseñas son gestionadas por Supabase Auth.
- La aplicación solo utiliza la clave pública `anon/publishable`.
- Row Level Security impide que una cuenta consulte o modifique la colección de otra.
- Los usuarios sin cuenta conservan sus datos en `localStorage`.
- Al iniciar sesión, la colección se sincroniza en `public.watch_profiles`.
