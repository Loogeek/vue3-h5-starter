import { defineMock } from 'vite-plugin-mock-dev-server';

interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
}

const users: MockUser[] = [
  { id: '1', name: '张三', email: 'zhangsan@example.com', phone: '13800138001', department: '研发部' },
  { id: '2', name: '李四', email: 'lisi@example.com', phone: '13800138002', department: '产品部' },
  { id: '3', name: '王五', email: 'wangwu@example.com', phone: '13800138003', department: '设计部' },
];

export default [
  // GET /dev-api/users - 用户列表
  defineMock({
    url: '/dev-api/users',
    method: 'GET',
    delay: 600,
    body: {
      code: 0,
      message: 'success',
      data: users,
    },
  }),

  // GET /dev-api/users/:id - 用户详情
  defineMock({
    url: '/dev-api/users/:id',
    method: 'GET',
    delay: 400,
    body({ params }) {
      const user = users.find(u => u.id === params.id);
      if (!user) {
        return { code: 1, message: '用户不存在', data: null };
      }
      return { code: 0, message: 'success', data: user };
    },
  }),

  // POST /dev-api/users - 创建用户
  defineMock({
    url: '/dev-api/users',
    method: 'POST',
    delay: 300,
    body({ body }) {
      const payload = (body ?? {}) as Partial<Omit<MockUser, 'id'>>;
      const newUser: MockUser = {
        id: String(Date.now()),
        name: payload.name ?? '未命名用户',
        email: payload.email ?? '',
        phone: payload.phone ?? '',
        department: payload.department ?? '',
      };
      users.push(newUser);
      return { code: 0, message: 'success', data: newUser };
    },
  }),
];
