import "./TaskCard.css";

import { useState } from "react";

import { editTask, deleteTask } from "../../api/https";
import { Todo } from "../../types/todoTypes";

import { Button, Form, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import type { FieldNameTask } from "../../types/todoTypes";
import type { FormProps } from "antd";

import TodoStatusSwitching from "../TodoStatusSwitching";
import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

const TaskCard: React.FC<{
  todo: Todo;
  fetchTasks: () => Promise<void>;
}> = ({ todo, fetchTasks }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleStartEdit = () => {
    setIsEdit(true);
  };
  const handleEndEdit = () => {
    setIsEdit(false);
  };

  const handleSubmit: FormProps<FieldNameTask>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      await editTask(todo.id, {
        title: values.taskname?.trim(),
        isDone: todo.isDone,
      });
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    } finally {
      setIsEdit(false);
    }
  };

  const onFinishFailed: FormProps<FieldNameTask>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleToggleDelele = async () => {
    try {
      await deleteTask(todo.id);
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось удалить задачу"}`);
    }
  };
  return (
    <div
      className={
        isEdit ? "task-card" : `task-card ${todo.isDone && "completed"}`
      }
    >
      <article className="left-side">
        <TodoStatusSwitching task={todo} fetchTasks={fetchTasks} />
        {!isEdit && <p>{todo.title}</p>}
        {isEdit && (
          <>
            <Form
              name="basic"
              layout="inline"
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              id={`task_${todo.id}`}
            >
              <Form.Item<FieldNameTask>
                style={{ width: "14rem" }}
                name="taskname"
                rules={[
                  { required: true, message: "Пожалуйста введите имя задачи!" },
                  {
                    min: MIN_TAKS_LENGTH,
                    message: `Должно быть минимум ${MIN_TAKS_LENGTH} символа`,
                  },
                  {
                    max: MAX_TAKS_LENGTH,
                    message: `Должно быть максимум ${MAX_TAKS_LENGTH} символов`,
                  },
                ]}
              >
                <Input
                  placeholder="Название задачи"
                  size="large"
                  defaultValue={todo.title}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </article>

      <article className="right-side">
        {isEdit && (
          <>
            <Button
              icon={<SaveOutlined />}
              htmlType="submit"
              form={`task_${todo.id}`}
            />
            <Button icon={<CloseOutlined />} onClick={handleEndEdit} />
          </>
        )}
        {!isEdit && (
          <>
            <Button icon={<EditOutlined />} onClick={handleStartEdit} />
            <Button icon={<DeleteOutlined />} onClick={handleToggleDelele} />
          </>
        )}
      </article>
    </div>
  );
};
export default TaskCard;
