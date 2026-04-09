import Image from "next/image";

interface CheckListDetailProps {
  id: number;
  name: string;
  isCompleted: boolean;
  onNameChange: (newName: string) => void;
  onStatusChange: (newStatus: boolean) => void;
}

/**
 * 상세 페이지 상단 타이틀 섹션
 * - 체크박스로 완료 상태 변경 가능
 * - 텍스트 입력을 통해 할 일 이름 바로 수정 가능
 */
export default function CheckListDetail({
  id,
  name,
  isCompleted,
  onNameChange,
  onStatusChange,
}: CheckListDetailProps) {
  return (
    <div
      className={`${
        isCompleted && "bg-violet-100"
      } flex justify-center items-center border-2 border-slate-900 rounded-3xl h-16 my-4 md:my-6`}
    >

      <Image
        src={isCompleted ? "/ic/checkbox_check.svg" : "/ic/checkbox.svg"}
        alt="체크박스"
        width={32}
        height={32}
        onClick={(e) => {
          e.stopPropagation();
          onStatusChange(!isCompleted);
        }}
        className="cursor-pointer"
      />

      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="ml-4 underline font-bold text-xl outline-none"
      />

    </div>
  );
}
