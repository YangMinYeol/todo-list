import Image from "next/image";

interface CheckListProps {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (id: number, isCompleted: boolean) => void;
  onNavigate: (id: number) => void;
}

/**
 * 목록용 개별 할 일 아이템 컴포넌트
 * - 체크박스 클릭 시 상태 토글
 * - 배경 클릭 시 상세 페이지로 이동
 */
export default function CheckList({
  id,
  name,
  isCompleted,
  onToggle,
  onNavigate,
}: CheckListProps) {
  return (
    <div
      className={`${
        isCompleted && "bg-violet-100"
      } border-2 border-slate-900 rounded-3xl h-12.5 flex items-center px-3 mb-4 cursor-pointer`}
      onClick={(e) => {
        onNavigate(id);
      }}
    >
      <Image
        src={isCompleted ? "/ic/checkbox_check.svg" : "/ic/checkbox.svg"}
        alt="체크박스"
        width={32}
        height={32}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id, isCompleted);
        }}
      />
      <span className={`${isCompleted && "line-through"} px-4 text-slate-800`}>
        {name}
      </span>
    </div>
  );
}
