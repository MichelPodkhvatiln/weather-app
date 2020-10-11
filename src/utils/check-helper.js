export function objectIsEmpty(data) {
  return (
    data && Object.entries(data).length === 0 && data.constructor === Object
  );
}
export function isNotArray(data) {
  return data && !Array.isArray(data);
}
