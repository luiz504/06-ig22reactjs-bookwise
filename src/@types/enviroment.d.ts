declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID:string
    GITHUB_CLIENT_SECRET:string
    // Add more environment variables here if needed
  }
}