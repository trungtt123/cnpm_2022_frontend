import { createServer, Model } from 'miragejs';

export const setupServer = () => {
  createServer({
    routes() {
      this.get('/api/todos',  {
        todos: [
          {
            maho: 'HK001',
            sothanhvien: 10,
            diachi: "Số 1, Đại Cồ Việt",
            noicap: "Công an quận Hai Bà Trưng",
            ngaycap: "21/11/2022",
          },
          {
            maho: "HK002",
            sothanhvien: 11,
            diachi: "Số 2, Đại Cồ Việt",
            noicap: "Công an quận Hai Bà Trưng",
            ngaycap: "22/11/2022",
          }, 
        ]
      });

      this.post('/api/todos', (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        return schema.todos.create(payload);
      });

      this.post('/api/updateTodo', (schema, request) => {
        const id = JSON.parse(request.requestBody);

        const currentTodo = schema.todos.find(id);

        currentTodo.update({ completed: !currentTodo.completed});

        return currentTodo;
      })
    }
  });
};