# E SHOP Capacitor mobile app

The browser storefront remains the source of truth. Capacitor packages the same HTML, CSS, JavaScript, PWA assets, and image links into Android and iOS projects.

## First setup

```powershell
npm install
npm run cap:sync
```

Open the native projects with Android Studio or Xcode:

```powershell
npm run cap:open:android
npm run cap:open:ios
```

Android can be built on Windows with Android Studio. iOS builds require macOS and Xcode.

## API URL for installed apps

The browser uses relative `/api/...` routes. A packaged native app needs the deployed E SHOP Worker URL because it runs from the Capacitor local web origin.

Set `window.ESHOP_API_BASE` in `capacitor-api-config.js` before running `npm run cap:sync`, for example:

```js
window.ESHOP_API_BASE = 'https://your-eshop-domain.example';
```

Also add the native origins to the Worker `APP_ORIGINS` allowlist: `https://localhost,capacitor://localhost`. Add your web origin only if you will call the API cross-origin from a separate frontend host.

Leave it empty for the browser and local Cloudflare Worker development. Do not put Paystack secrets or the admin token in this file.
