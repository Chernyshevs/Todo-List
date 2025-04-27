import "./AdminFilters.css"

import { Input, Form, Select, Button } from "antd";
import type { GetProps } from "antd";

const { Search } = Input;
const { Option } = Select;
type SearchProps = GetProps<typeof Input.Search>;

const AdminFilters: React.FC<{
  onSearch: SearchProps["onSearch"];
  onFinishFilter: (values: any) => void;
}> = ({ onSearch, onFinishFilter }) => {
  return (
    <div className="admin-filters">
      <div className="search-users">
        <Search placeholder="Поиск" onSearch={onSearch} enterButton />
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
