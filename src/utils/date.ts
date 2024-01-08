export function formatDate(initialDate: string): string {
  const date = new Date(initialDate);
  const month = date.toLocaleString('eng', { month: 'long' });

  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
}

