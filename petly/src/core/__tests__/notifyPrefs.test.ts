import { shouldNotify } from '../notifyPrefs';

const all = { enabled: true, care: true, medication: true, vaccination: true, appointments: true };

describe('shouldNotify', () => {
  it('respects the master switch', () => {
    expect(shouldNotify('vaccination', { ...all, enabled: false })).toBe(false);
  });
  it('maps kinds to their preference', () => {
    expect(shouldNotify('refill', { ...all, medication: false })).toBe(false);
    expect(shouldNotify('appointment', { ...all, appointments: false })).toBe(false);
    expect(shouldNotify('grooming', { ...all, care: false })).toBe(false);
    expect(shouldNotify('vaccination', { ...all, care: false })).toBe(true);
  });
});
