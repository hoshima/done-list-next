import { describe, expect, it } from 'vitest';
import { formatDate } from '../dates';

describe('formatDate', () => {
  it('ハイフン区切りの日付をスラッシュ区切りに変換する', () => {
    expect(formatDate('2024-01-15')).toBe('2024/01/15');
  });

  it('月が1桁の場合にゼロ埋めする', () => {
    expect(formatDate('2024-03-01')).toBe('2024/03/01');
  });

  it('日が1桁の場合にゼロ埋めする', () => {
    expect(formatDate('2024-12-05')).toBe('2024/12/05');
  });

  it('月と日がともに1桁の場合にゼロ埋めする', () => {
    expect(formatDate('2024-01-01')).toBe('2024/01/01');
  });

  it('月と日がともに2桁の場合にそのまま変換する', () => {
    expect(formatDate('2024-11-30')).toBe('2024/11/30');
  });

  it('うるう年の2月29日を正しく変換する', () => {
    expect(formatDate('2024-02-29')).toBe('2024/02/29');
  });
});
