import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esta es la línea mágica para Cloudflare Pages (sitio estático)
  output: "export", 
  
  // (Si tienes otras configuraciones aquí, déjalas intactas)
};

export default nextConfig;