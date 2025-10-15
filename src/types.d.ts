/// <reference types="vite/client" />

declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}

interface ImportMetaEnv {
  readonly WHOP_PRODUCT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}