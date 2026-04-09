import { SetStateAction } from "react";

interface SearchProps {
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
  onAdd: () => void;
}

/**
 * 할 일 입력창 컴포넌트
 * - 텍스트 입력 및 엔터 키를 통한 빠른 추가 기능 제공
 */
export default function Search({
  inputValue,
  setInputValue,
  onAdd,
}: SearchProps) {
  return (
    <div
      className="
      flex items-center gap-2 
      flex-1 
      h-14
      px-6 
      bg-slate-100
      border-2 border-slate-900
      rounded-3xl
      shadow-[4px_4px_0_0_#0F172A]
    "
    >
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="
          w-full h-full 
          bg-transparent 
          outline-none 
          placeholder:text-slate-500
        "
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onAdd();
        }}
      />
    </div>
  );
}
