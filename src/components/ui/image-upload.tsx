"use client";

import { ImagePlus, Trash, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-2">
          {value.map((url) => (
            <div key={url} className="relative">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
                className="absolute top-0"
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src={url}
                width="84"
              />
            </div>
          ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="gwyqmhlt">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <button
                onClick={onClick}
                disabled={disabled}
                className="flex aspect-square w-14 mt-5 items-center justify-center rounded-md border border-dashed"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </>
  );
};

{
  /* <div className="grid gap-2">
                            <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                            
                          </div> */
}

export default ImageUpload;
