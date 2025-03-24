import { addTask } from "../../api/https";
import { Form, Input, Button } from "antd";
import type { FormProps } from "antd";
import type { FieldAddTask } from "../../types/todoTypes";
import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

const AddTask: React.FC<{ fetchTasks: () => Promise<void> }> = ({
  fetchTasks,
}) => {
  const onFinish: FormProps<FieldAddTask>["onFinish"] = async (values) => {
    console.log("Success:", values);
    try {
      await addTask({ title: values.taskname?.trim(), isDone: false });
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message}`);
    } finally {
    }
  };

  const onFinishFailed: FormProps<FieldAddTask>["onFinishFailed"] = (
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldAddTask>
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
          <Input placeholder="Название задачи" size="large"/>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" size="large">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
export default AddTask;
