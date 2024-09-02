import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  // Handle successful upload
  const onSuccess = (result: any) => {
    // Add the new image URL to the value array
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-500 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {/* Use fill and ensure the container has relative positioning */}
            <div className="relative w-full h-full">
              <Image
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
              />
            </div>
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="sspcbe2z" onSuccess={onSuccess}>
        {({ open }) => (
          <Button
            type="button"
            onClick={() => open()}
            className="bg-red-500 text-white flex items-center p-2 rounded"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
