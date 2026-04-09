"use client";
import Button from "@/component/Button";
import CheckListDetail from "@/component/CheckListDetail";
import ImageUpload from "@/component/ImageUpload";
import { use, useEffect, useState } from "react";
import {
  TodoItem,
  deleteItem,
  getDetailItem,
  updateTodo,
} from "../../../../lib/apis/todo";
import { useRouter } from "next/navigation";

/**
 * 항목 상세 정보 페이지
 * - 특정 할 일의 데이터(이름, 메모, 이미지) 수정 및 삭제 기능 담당
 */
export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [item, setItem] = useState<TodoItem | null>(null);

  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();
  const { id } = use(params);

  // 상세 정보 로드 및 상태 초기화
  const fetchTodo = async () => {
    try {
      const data = await getDetailItem(Number(id));
      setItem(data);
      setName(data.name);
      setIsCompleted(data.isCompleted);
      setMemo(data.memo || "");
      setImageUrl(data.imageUrl || "");
    } catch (error) {
      console.error("항목 상세 페이지를 불러오는데 실패했습니다.", error);
      alert("항목 상세 페이지를 불러오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    fetchTodo();
  }, [id]);

  // 서버 데이터와 현재 상태를 비교하여 변경사항이 있는지 확인
  const hasChanges =
    item !== null &&
    (item.name !== name ||
      item.isCompleted !== isCompleted ||
      (item.memo || "") !== memo ||
      (item.imageUrl || "") !== imageUrl);
  const canSave = hasChanges && name.trim().length > 0;

  // 항목 삭제 로직
  const handleDelete = async () => {
    try {
      await deleteItem(Number(id));
      router.push("/");
    } catch (error) {
      console.error("항목을 삭제하는데 실패했습니다.", error);
      alert("항목을 삭제하는데 실패했습니다.");
    }
  };

  // 수정 사항 저장 로직
  const handleUpdate = async () => {
    if (!canSave) return;
    try {
      const updateData = {
        name,
        isCompleted,
        memo,
        imageUrl,
      };
      await updateTodo(Number(id), updateData);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("항목을 수정하는데 실패했습니다.", error);
      alert("항목을 수정하는데 실패했습니다.");
    }
  };

  if (!item) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="mx-4 md:mx-6 ">
      {/* 항목명 및 완료 상태 섹션*/}
      <CheckListDetail
        id={item.id}
        name={name}
        isCompleted={isCompleted}
        onNameChange={setName}
        onStatusChange={setIsCompleted}
      />

      {/* 이미지 업로드 및 메모 입력 섹션 */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <ImageUpload value={imageUrl} onChange={setImageUrl} />

        <div className="h-77.75 lg:flex-1 bg-[url('/img/memo.svg')] flex flex-col items-center rounded-3xl gap-4 px-4 py-6">
          <span className="text-amber-800 font-extrabold">Memo</span>
          <textarea
            className="w-full h-full outline-none resize-none text-center
              [&::-webkit-scrollbar]:w-1 
              [&::-webkit-scrollbar-track]:bg-transparent 
              [&::-webkit-scrollbar-thumb]:bg-amber-200
              [&::-webkit-scrollbar-thumb]:rounded-[3px]"
            placeholder="메모를 입력해주세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>

      {/* 하단 제어 버튼 (수정/삭제) */}
      <div className="flex justify-center lg:justify-end gap-1.75 md:gap-4">
        <Button
          action={canSave ? "update_active" : "update"}
          label={"수정 완료"}
          onClick={canSave ? handleUpdate : () => {}}
        />
        <Button action={"delete"} label={"삭제하기"} onClick={handleDelete} />
      </div>
    </div>
  );
}
