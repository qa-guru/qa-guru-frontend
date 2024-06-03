import { useEffect, useState } from "react";

export type ImageModule = {
  default: string;
};

export type ImageDictionary = { [key: string]: string };

export function isImageModule(object: any): object is ImageModule {
  return object && typeof object.default === "string";
}

export function useLoadedImages(imageImports: { [key: string]: any }) {
  const [loadedImages, setLoadedImages] = useState<ImageDictionary>({});

  useEffect(() => {
    const loadImages = async () => {
      const images: ImageDictionary = {};

      const keys = Object.keys(imageImports);
      const modules = await Promise.all(keys.map((key) => imageImports[key]()));

      keys.forEach((key, index) => {
        if (isImageModule(modules[index])) {
          images[key] = modules[index].default;
        }
      });

      setLoadedImages(images);
    };

    loadImages();
  }, [imageImports]);

  return loadedImages;
}
