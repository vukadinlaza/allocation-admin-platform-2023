'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = [];
    if (!event.target.files) return;
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file.type.startsWith('image/')) {
        newFiles.push(file);
      }
    }
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const renderFiles = () => {
    return files.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between px-3 py-3 border-b file"
      >
        <div className="flex items-center">
          <Image
            src="/attach.svg"
            alt={"Add File"}
            className="cursor-pointer text-primary"
            width={24}
            height={24}
            ref={imageRef}
          />
          <p className="text-xs">{file.name}</p>
        </div>
        <div className="transition opacity-75 hover:opacity-100">
          <Image
            alt={"Remove"}
            onClick={() => handleRemoveFile(index)}
            src="/bin.svg"
            className="cursor-pointer"
            width={24}
            height={24}
            ref={imageRef}
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="upload">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {files.length > 0 && <div className="w-full files">{renderFiles()}</div>}
      <div
        className="flex flex-col items-center upload--zone"
        onClick={() => {
          const input = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement;
          input.click();
        }}
      >
        <label className="text-primary">
          <Image
            alt="upload"
            src="/upload.svg"
            className="cursor-pointer text-primary"
            width={48}
            height={48}
            ref={imageRef}
          />
        </label>
      </div>
    </div>
  );
}
