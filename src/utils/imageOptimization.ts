interface ImageConfig {
  url: string;
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export const optimizeImage = ({ 
  url, 
  width = 800, 
  quality = 80, 
  format = 'webp' 
}: ImageConfig): string => {
  // Check if it's an Unsplash image
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format,compress&w=${width}&q=${quality}&fm=${format}`;
  }
  
  // For other image sources, return the original URL
  // In a real app, you might want to implement other image service optimizations here
  return url;
};

export const getImagePlaceholder = (url: string): string => {
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?auto=format,compress&w=20&blur=10`;
  }
  return url;
}; 