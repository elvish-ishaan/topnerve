declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_URL: string;
        BASE_DOMAIN: string
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        RAZORPAY_KEY_ID: string
        RAZORPAY_KEY_SECRET: string
        CLOUDINARY_CLOUD_NAME: string
        CLOUDINARY_API_KEY: string
        CLOUDINARY_API_SECRET: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}