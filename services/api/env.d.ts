declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_ORIGINS: string;
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFREST_TOKEN_SECRET: string;
      PORT: string;
    }
  }
}

export {}
