export interface DisplayImagesProps {
  imgToPreview: string;
}

export interface UploadImageProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}
