import { ageOn } from '../age';
import { formatTime, greetingFor, initials } from '../format';
import { filterPets, resolveSelectedPet } from '../pets';
import { buildSampleData, isSampleId } from '../sample';
import { defaultUnitSystem, displayWeight, inputToKg, parseDecimal } from '../units';
import { collect, email, hasErrors, password, positiveNumber } from '../validation';

describe('units', () => {
  it('converts and rounds', () => {
    expect(displayWeight(28.5, 'imperial')).toBe(62.8);
    expect(displayWeight(28.5, 'metric')).toBe(28.5);
    expect(inputToKg(62.8, 'imperial')).toBeCloseTo(28.485, 2);
  });
  it('defaults by region', () => {
    expect(defaultUnitSystem('US')).toBe('imperial');
    expect(defaultUnitSystem('GB')).toBe('metric');
    expect(defaultUnitSystem(null)).toBe('metric');
  });
  it('parses comma decimals', () => {
    expect(parseDecimal('4,8')).toBe(4.8);
    expect(parseDecimal('')).toBeNull();
    expect(parseDecimal('abc')).toBeNull();
  });
});

describe('age', () => {
  it('counts whole months', () => {
    expect(ageOn('2023-08-14', '2026-10-31')).toEqual({ years: 3, months: 2 });
    expect(ageOn('2026-10-31', '2026-10-31')).toEqual({ years: 0, months: 0 });
  });
});

describe('format', () => {
  it('formats time in 12h and 24h', () => {
    expect(formatTime('07:05', '12h')).toBe('7:05 AM');
    expect(formatTime('00:30', '12h')).toBe('12:30 AM');
    expect(formatTime('18:00', '24h')).toBe('18:00');
  });
  it('picks greetings and initials', () => {
    expect(greetingFor(8)).toBe('morning');
    expect(greetingFor(15)).toBe('afternoon');
    expect(greetingFor(21)).toBe('evening');
    expect(initials('Sam Rivera')).toBe('SR');
    expect(initials('')).toBe('?');
  });
});

describe('validation', () => {
  it('validates email and password', () => {
    expect(email('a@b.co')).toBeNull();
    expect(email('nope')).toBe('email');
    expect(password('short1')).toBe('passwordShort');
    expect(password('longenough')).toBe('passwordWeak');
    expect(password('longenough1')).toBeNull();
  });
  it('collects errors', () => {
    const e = collect({ weight: positiveNumber('-1'), name: null });
    expect(e).toEqual({ weight: 'positive' });
    expect(hasErrors(e)).toBe(true);
  });
});

describe('pets', () => {
  const data = buildSampleData('2026-10-31', 'me', '2026-10-31T09:00:00Z');
  it('filters by query and species', () => {
    expect(filterPets(data.pets, 'gold', 'all').map((p) => p.name)).toEqual(['Max']);
    expect(filterPets(data.pets, '', 'cat').map((p) => p.name)).toEqual(['Luna']);
  });
  it('keeps a valid selection', () => {
    expect(resolveSelectedPet(data.pets, 'gone')).toBe('s-max');
    expect(resolveSelectedPet([], 'gone')).toBeNull();
  });
});

describe('sample data', () => {
  const data = buildSampleData('2026-10-31', 'me', '2026-10-31T09:00:00Z');
  const petIds = new Set(data.pets.map((p) => p.id));
  it('has the three PRD pets', () => {
    expect(data.pets.map((p) => [p.name, p.breed, p.weightKg])).toEqual([
      ['Max', 'Golden Retriever', 28.5],
      ['Luna', 'British Shorthair', 4.8],
      ['Bella', 'French Bulldog', 12.2],
    ]);
  });
  it('flags every record as sample and links every record to a pet', () => {
    const { pets, members, ...rest } = data;
    for (const list of Object.values(rest)) {
      for (const item of list as { id: string; petId: string; isSample?: boolean }[]) {
        expect(petIds.has(item.petId)).toBe(true);
        expect(isSampleId(item.id)).toBe(true);
      }
    }
    for (const p of [...pets, ...members]) expect(p.isSample).toBe(true);
  });
});
