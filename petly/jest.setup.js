// In-memory kv-store so persisted slices work under Jest.
jest.mock('expo-sqlite/kv-store', () => {
  const map = new Map();
  const api = {
    getItemSync: (k) => (map.has(k) ? map.get(k) : null),
    setItemSync: (k, v) => map.set(k, v),
    removeItemSync: (k) => map.delete(k),
  };
  return { __esModule: true, default: api, Storage: api };
});
