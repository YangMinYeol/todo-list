"use client";
import Button from "@/component/Button";
import CheckList from "@/component/CheckList";
import Search from "@/component/Search";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TodoItem, addTodo, getTodos, updateTodo } from "../../lib/apis/todo";

/**
 * 홈(메인) 페이지 컴포넌트
 * - 전체 할 일 목록 조회 및 상태 관리
 * - 새로운 할 일 추가 기능
 * - 완료 여부에 따른 목록 필터링 (TO DO / DONE)
 */
export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // 할 일 목록 로드
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("목록을 조회하는데 실패했습니다.", error);
      alert("목록을 조회하는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todoList = todos.filter((t) => !t.isCompleted);
  const doneList = todos.filter((t) => t.isCompleted);

  // 새로운 할 일 추가
  const handleAddTodo = async () => {
    try {
      if (inputValue.trim() === "") {
        alert("할 일을 입력해주세요. ");
        return;
      }
      await addTodo(inputValue);
      setInputValue("");
      await fetchTodos();
    } catch (error) {
      console.error("항목을 추가하는데 실패했습니다.", error);
      alert("항목을 추가하는데 실패했습니다.");
    }
  };

  // 완료 여부 토글(체크박스 클릭시)
  const handleToggleTodo = async (id: number, isCompleted: boolean) => {
    try {
      await updateTodo(id, { isCompleted: !isCompleted });
      fetchTodos();
    } catch (error) {
      console.error("항목을 변경하는데 실패했습니다.", error);
      alert("항목을 변경하는데 실패했습니다.");
    }
  };

  // 상세 페이지 이동
  const handleNavigate = (id: number) => {
    router.push(`/items/${id}`);
  };

  if (loading) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="flex flex-col gap-10 py-4 md:py-6">
      {/* 상단 입력 섹션 */}
      <div className="flex gap-2 md:gap-4">
        <Search
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAdd={handleAddTodo}
        />
        <Button
          action={inputValue.trim() === "" ? "add" : "add_active"}
          label="추가하기"
          onClick={handleAddTodo}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
        {/* TO DO 섹션 */}
        <div className="flex-1">
          <div className="mb-4">
            <Image src="/img/todo.svg" alt="todo" width={101} height={36} />
          </div>
          {todoList.length === 0 ? (
            <div className="flex flex-col items-center py-16 md:py-24 lg:py-32">
              <Image
                src="/img/todo_empty_small.svg"
                alt="todo empty mobile"
                width={120}
                height={120}
                className="mb-4 md:hidden"
              />
              <Image
                src="/img/todo_empty.svg"
                alt="todo empty desktop"
                width={240}
                height={240}
                className="mb-4 hidden md:block"
              />
              <p className="text-slate-400 font-bold text-center">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해 주세요!
              </p>
            </div>
          ) : (
            todoList.map((todo) => (
              <CheckList
                key={todo.id}
                id={todo.id}
                name={todo.name}
                isCompleted={todo.isCompleted}
                onToggle={handleToggleTodo}
                onNavigate={handleNavigate}
              />
            ))
          )}
        </div>

        {/* DONE 섹션 */}
        <div className="flex-1">
          <div className="mb-4">
            <Image src="/img/done.svg" alt="done" width={97} height={36} />
          </div>
          {doneList.length === 0 ? (
            <div className="flex flex-col items-center py-16 md:py-24 lg:py-32">
              <Image
                src="/img/done_empty_small.svg"
                alt="done empty mobile"
                width={120}
                height={120}
                className="mb-4 md:hidden"
              />
              <Image
                src="/img/done_empty.svg"
                alt="done empty desktop"
                width={240}
                height={240}
                className="mb-4 hidden md:block"
              />
              <p className="text-slate-400 font-bold text-center">
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해 보세요!
              </p>
            </div>
          ) : (
            doneList.map((todo) => (
              <CheckList
                key={todo.id}
                {...todo}
                onToggle={handleToggleTodo}
                onNavigate={handleNavigate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
