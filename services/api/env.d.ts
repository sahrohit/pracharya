declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_ORIGINS: string;
      DATABASE_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: string;
      RESEND_HOST: string;
      RESENT_PORT: string;
      RESEND_AUTH_USER: string;
      RESEND_AUTH_PASS: string;
    }
  }
}

export {}
