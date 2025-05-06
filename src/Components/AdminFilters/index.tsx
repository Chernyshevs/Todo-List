import "./AdminFilters.css";

import { Input, Form, Select, Button } from "antd";

const { Option } = Select;

const AdminFilters: React.FC<{
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFinishFilter: (values: any) => void;
}> = ({ onChange, onFinishFilter }) => {
  return (
    <div className="admin-filters">
      <div className="search-users">
        <Input placeholder="Поиск" onChange={onChange} />
      </div>

      <Form
        name="control-hooks"
        onFinish={onFinishFilter}
        className="filter-form-admin"
      >
        <Form.Item name="filter">
          <Select placeholder="Выберите статус блокировки" allowClear>
            <Option value={true}>Заблокированные</Option>
            <Option value={false}>Не заблокированные</Option>
            <Option value={"all"}>Все пользователи</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Применить
        </Button>
      </Form>
    </div>
  );
};

export default AdminFilters;
