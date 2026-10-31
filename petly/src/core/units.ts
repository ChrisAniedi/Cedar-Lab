import type { UnitSystem } from './types';

export const KG_PER_LB = 0.45359237;

export const kgToLb = (kg: number) => kg / KG_PER_LB;
export const lbToKg = (lb: number) => lb * KG_PER_LB;

/** Value in the user's unit, rounded to one decimal. */
export function displayWeight(kg: number, system: UnitSystem): number {
  const v = system === 'imperial' ? kgToLb(kg) : kg;
  return Math.round(v * 10) / 10;
}

/** Convert user input in their unit back to kg for storage. */
export function inputToKg(value: number, system: UnitSystem): number {
  return Math.round((system === 'imperial' ? lbToKg(value) : value) * 1000) / 1000;
}

/** Imperial is the default only where it is in everyday use. */
export function defaultUnitSystem(regionCode: string | null | undefined): UnitSystem {
  return regionCode && ['US', 'LR', 'MM'].includes(regionCode.toUpperCase()) ? 'imperial' : 'metric';
}

export function parseDecimal(input: string): number | null {
  const n = Number(input.trim().replace(',', '.'));
  return input.trim() !== '' && Number.isFinite(n) ? n : null;
}
