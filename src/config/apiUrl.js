export const imageUrl = process.env.NEXT_PUBLIC_IMG_URL;
export const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_API_URL;
  
    return base_url;
  };