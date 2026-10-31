import { completeOccurrence, occurrencesOn, progress, undoOccurrence } from '../tasks';
import type { CareLogEntry, CareTask } from '../types';

const task = (id: string, time: string): CareTask => ({
  id,
  petId: 'p1',
  title: id,
  category: 'feeding',
  time,
  recurrence: { kind: 'daily' },
  assigneeId: null,
  isSample: false,
  createdAt: '2026-01-01T00:00:00Z',
});

const now = { date: '2026-10-31', time: '12:00' };

describe('care tasks', () => {
  it('sorts by time and marks past items overdue', () => {
    const occ = occurrencesOn([task('b', '18:00'), task('a', '08:00')], [], '2026-10-31', now);
    expect(occ.map((o) => [o.task.id, o.status])).toEqual([
      ['a', 'overdue'],
      ['b', 'pending'],
    ]);
  });

  it('records who completed it and when', () => {
    const t = task('a', '08:00');
    const res = completeOccurrence([], t, '2026-10-31', 'me', '2026-10-31T08:05:00Z');
    expect(res.ok).toBe(true);
    const log = res.ok ? [{ id: '1', ...res.entry }] : [];
    const [occ] = occurrencesOn([t], log, '2026-10-31', now);
    expect(occ).toMatchObject({ status: 'done', completedBy: 'me', completedAt: '2026-10-31T08:05:00Z' });
  });

  it('prevents duplicate completion of the same occurrence', () => {
    const t = task('a', '08:00');
    const log: CareLogEntry[] = [{ id: '1', taskId: 'a', petId: 'p1', date: '2026-10-31', action: 'completed', by: 'me', at: 'x' }];
    expect(completeOccurrence(log, t, '2026-10-31', 'sam', 'y')).toEqual({ ok: false, reason: 'alreadyCompleted' });
  });

  it('allows correction through an audit-trail entry', () => {
    const t = task('a', '08:00');
    const log: CareLogEntry[] = [{ id: '1', taskId: 'a', petId: 'p1', date: '2026-10-31', action: 'completed', by: 'me', at: '2026-10-31T08:00:00Z' }];
    const undo = undoOccurrence(log, t, '2026-10-31', 'me', '2026-10-31T09:00:00Z');
    expect(undo.ok).toBe(true);
    if (!undo.ok) return;
    const next = [...log, { id: '2', ...undo.entry }];
    expect(occurrencesOn([t], next, '2026-10-31', now)[0]?.status).toBe('overdue');
    expect(next).toHaveLength(2); // history kept
    expect(undoOccurrence(next, t, '2026-10-31', 'me', 'z')).toEqual({ ok: false, reason: 'notCompleted' });
  });

  it('computes progress', () => {
    expect(progress([])).toEqual({ done: 0, total: 0, ratio: 0 });
  });
});
