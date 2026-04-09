import { api } from "../axios";

/**
 * 할 일 항목 기본 인터페이스
 */
export interface TodoItem {
  isCompleted: boolean;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: number;
}

/**
 * 항목 수정 시 사용하는 인터페이스
 */
export interface UpdateTodoItem {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

/**
 * 새로운 할 일을 등록합니다.
 * 항목 등록(POST)
 * @param name
 * @returns
 */
export const addTodo = async (name: string) => {
  const response = await api.post("/items", { name: name });
  return response.data;
};

/**
 * 전체 할 일 목록을 가져옵니다.
 * 목록 조회(GET)
 */
export const getTodos = async () => {
  const response = await api.get<TodoItem[]>("/items");
  return response.data;
};

/**
 * 특정 할 일의 상세 내용을 수정합니다.
 * 항목 수정(PATCH)
 */
export const updateTodo = async (id: number, data: UpdateTodoItem) => {
  const response = await api.patch<TodoItem>(`/items/${id}`, data);
  return response.data;
};

/**
 * 특정 할 일의 상세 정보를 수정합니다.
 * 항목 상세 조회(GET)
 */
export const getDetailItem = async (id: number) => {
  const response = await api.get<TodoItem>(`/items/${id}`);
  return response.data;
};

/**
 * 특정 할 일을 삭제합니다.
 * 항목 삭제(DELETE)
 */
export const deleteItem = async (id: number) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

/**
 * 이미지를 서버에 업로드하고 URL을 반환합니다.
 * 이미지 업로드 API(POST)
 */
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post<{ url: string }>("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
