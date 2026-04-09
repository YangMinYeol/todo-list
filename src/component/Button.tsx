import Image from "next/image";

interface ButtonProps {
  action?: "add" | "add_active" | "delete" | "update" | "update_active";
  label: string;
  onClick: () => void;
}

/**
 * 공통 버튼 컴포넌트
 * - 배경색, 아이콘, 반응형 너비를 action 속성으로 제어
 */
export default function Button({
  action = "add",
  label,
  onClick,
}: ButtonProps) {
  // 특정 상태에서는 모바일에서도 텍스트를 고정적으로 보여줌
  const fix = ["delete", "update", "update_active"].includes(action);

  const bgStyles = {
    add_active: "bg-violet-600 text-white",
    add: "bg-slate-200",
    update: "bg-slate-200",
    update_active: "bg-lime-300",
    delete: "bg-rose-500 text-white",
  };

  const iconSrcs = {
    add_active: "/ic/plus_white.svg",
    add: "/ic/plus_slate.svg",
    update: "/ic/check.svg",
    update_active: "/ic/check.svg",
    delete: "/ic/x.svg",
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-2
        h-14 shrink-0 font-bold border-2 border-slate-900 rounded-3xl 
        shadow-[4px_4px_0_0_rgba(15,23,42,1)] hover:cursor-pointer
        ${bgStyles[action]}
        ${fix ? "w-41" : "w-41 max-md:w-13"}
      `}
      onClick={onClick}
    >
      <Image
        src={iconSrcs[action]}
        alt="icon"
        width={16}
        height={16}
        className="shrink-0"
      />

      <span
        className={`
        ${fix ? "inline" : "hidden md:inline"}
      `}
      >
        {label}
      </span>
    </button>
  );
}
