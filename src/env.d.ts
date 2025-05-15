interface ImportMetaEnv {
    readonly AUTHOR: string;
    readonly BASE_URL: string;
    readonly ALLOWED_HOSTS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}