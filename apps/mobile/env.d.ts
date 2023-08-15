declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      TAMAGUI_TARGET: string;
    }
  }
}

export {}
