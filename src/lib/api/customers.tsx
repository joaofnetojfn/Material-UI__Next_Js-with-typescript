const rows = [
  { id: 1, name: 'João', email: 'joao@teste.com' },
  { id: 2, name: 'Michele', email: 'Michele@teste.com' },
  { id: 3, name: 'Daniela', email: 'Daniela@teste.com' },
  { id: 4, name: 'Renata', email: 'Renata@teste.com' },
];

export const getCustomers = (): Promise<
  Array<{ id: number; name: string; email: string }>
> => {
  return new Promise((resolve) => {
    resolve(rows);
  });
};

export const getCustomerById = (
  id: number
): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    const result = rows.find((row) => row.id === id);
    resolve(result);
  });
};
