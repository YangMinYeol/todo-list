"use client";

import Image from "next/image";
import { useRef } from "react";
import { uploadImage } from "../../lib/apis/todo";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

/**
 * 이미지 업로드 컴포넌트
 * - 파일명(영문/숫자) 및 용량(5MB) 제한 검증
 * - 서버 업로드 후 반환된 URL을 부모 컴포넌트에 전달
 */
export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 영문 대소문자, 숫자, 그리고 확장자 구분용 점(.)만 허용
    const reg = /^[a-zA-Z0-9.]+$/;
    if (!reg.test(file.name)) {
      alert(
        "이미지 파일 이름은 영문자와 숫자만 가능합니다. (공백이나 특수문자 불가)"
      );
      return;
    }

    // 용량 검증 5MB 이하만 허용
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const data = await uploadImage(file);
      onChange(data.url);
    } catch (error) {
      alert("이미지 업로드하는데 실패했습니다.");
      console.error("이미지 업로드하는데 실패했습니다.", error);
    }
  };

  return (
    <div className="relative flex w-full lg:w-[384px] h-77.75 items-center justify-center border-dashed border-2 border-slate-300 rounded-3xl bg-slate-50 overflow-hidden">
      {value ? (
        <Image src={value} alt="미리보기" fill className="object-cover" />
      ) : (
        <Image src="/img/img.svg" alt="기본 이미지" width={64} height={64} />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className={`absolute bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center border-2 cursor-pointer ${
          value
            ? "bg-slate-900/50 border-slate-900"
            : "bg-slate-200 border-transparent "
        }`}
      >
        {value ? (
          <Image src="/ic/edit.svg" alt="수정" width={24} height={24} />
        ) : (
          <Image src="/ic/plus_slate.svg" alt="추가" width={24} height={24} />
        )}
      </button>
    </div>
  );
}
