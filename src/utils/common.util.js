export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const getImage = (image, type = 'image') => {
  try {
    if (!image) return;
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if(type == 'raw'){
      image = image.split('.')[0]
    }
    return `https://res.cloudinary.com/${cloudName}/${type}/upload/portfolio/${image}`
  } catch (error) {
    throw error;
  }
}