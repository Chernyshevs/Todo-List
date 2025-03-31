import { addTask } from "../../api/https";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";
import type { FieldNameTask } from "../../types/todoTypes";
import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";
import { memo } from "react";
const AddTask: React.FC<{ fetchTasks: () => Promise<void> }> = memo(
  ({ fetchTasks }) => {
    const [form] = Form.useForm();
    const handleAddTask: FormProps<FieldNameTask>["onFinish"] = async (
      values
    ) => {
      try {
        await addTask({ title: values.taskname?.trim(), isDone: false });
        await fetchTasks();
      } catch (error: any) {
        alert(`Ошибка: ${error.message}`);
      } finally {
        form.resetFields();
      }
    };
    const onFinishFailed: FormProps<FieldNameTask>["onFinishFailed"] = (
      errorInfo
    ) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <section>
        <Form
          name="basic"
          layout="inline"
          style={{ justifyContent: "center" }}
          onFinish={handleAddTask}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldNameTask>
            style={{ width: "55%" }}
            name="taskname"
            rules={[
              { required: true, message: "Пожалуйста введите имя задачи!" },
              {
                min: MIN_TAKS_LENGTH,
                message: `Имя задачи должно быть минимум ${MIN_TAKS_LENGTH} символа`,
              },
              {
                max: MAX_TAKS_LENGTH,
                message: `Имя задачи должно быть максимум ${MAX_TAKS_LENGTH} символов`,
              },
            ]}
          >
            <Input placeholder="Название задачи" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
);
export default AddTask;
