import { searchBreeds } from '../breeds';

describe('breed search', () => {
  it('ranks prefix matches first', () => {
    expect(searchBreeds('dog', 'bo')[0]).toBe('Border Collie');
    expect(searchBreeds('dog', 'retriever')).toEqual(['Labrador Retriever', 'Golden Retriever']);
  });
  it('returns defaults with an empty query and nothing for unknown text', () => {
    expect(searchBreeds('cat', '', 3)).toHaveLength(3);
    expect(searchBreeds('fish', 'zzz')).toEqual([]);
  });
});
