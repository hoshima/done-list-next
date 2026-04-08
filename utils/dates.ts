import { Temporal } from 'temporal-polyfill';

/**
 * "YYYY-MM-DD"形式の日付文字列を"YYYY/MM/DD"形式に変換します。
 * @param dateString
 * @returns
 */
export const formatDate = (dateString: string): string => {
  const date = Temporal.PlainDate.from(dateString);
  return `${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`;
};
