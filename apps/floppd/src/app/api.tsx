export function api<T>(url: string, method: string, body?: T): Promise<T> {
  return fetch(url, {
    method: method,
    headers: body
      ? {
          'Content-Type': 'application/json',
        }
      : {},
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());
}
