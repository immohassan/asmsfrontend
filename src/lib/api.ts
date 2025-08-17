import axios from 'axios';

const api = axios.create({
  baseURL: '/mock',
});

export const teachersApi = {
  getAll: () => api.get('/teachers.json'),
  getById: (id: number) => api.get('/teachers.json').then(res => res.data.find((t: any) => t.id === id)),
  create: (data: any) => Promise.resolve({ data: { ...data, id: Date.now() } }),
  update: (id: number, data: any) => Promise.resolve({ data: { ...data, id } }),
  delete: (id: number) => Promise.resolve({ success: true }),
};

export const studentsApi = {
  getAll: () => api.get('/students.json'),
  getById: (id: number) => api.get('/students.json').then(res => res.data.find((s: any) => s.id === id)),
  create: (data: any) => Promise.resolve({ data: { ...data, id: Date.now() } }),
  update: (id: number, data: any) => Promise.resolve({ data: { ...data, id } }),
  delete: (id: number) => Promise.resolve({ success: true }),
};

export const classesApi = {
  getAll: () => api.get('/classes.json'),
  getById: (id: number) => api.get('/classes.json').then(res => res.data.find((c: any) => c.id === id)),
  create: (data: any) => Promise.resolve({ data: { ...data, id: Date.now() } }),
  update: (id: number, data: any) => Promise.resolve({ data: { ...data, id } }),
  delete: (id: number) => Promise.resolve({ success: true }),
};

export const scheduleApi = {
  getAll: () => api.get('/schedule.json'),
};

export const gradesApi = {
  getAll: () => api.get('/grades.json'),
  getByStudentId: (studentId: number) => api.get('/grades.json').then(res => 
    res.data.filter((g: any) => g.studentId === studentId)
  ),
  update: (id: number, data: any) => Promise.resolve({ data: { ...data, id } }),
  create: (data: any) => Promise.resolve({ data: { ...data, id: Date.now() } }),
};

export const attendanceApi = {
  getAll: () => api.get('/attendance.json'),
  getByDate: (date: string) => api.get('/attendance.json').then(res => 
    res.data.filter((a: any) => a.date === date)
  ),
  getByClassAndDate: (classId: number, date: string) => api.get('/attendance.json').then(res => 
    res.data.filter((a: any) => a.class_id === classId && a.date === date)
  ),
  create: (data: any) => Promise.resolve({ data: { ...data, id: Date.now() } }),
  createBulk: (data: any[]) => Promise.resolve({ data: data.map(item => ({ ...item, id: Date.now() + Math.random() })) }),
  update: (id: number, data: any) => Promise.resolve({ data: { ...data, id } }),
};