import type { Metadata } from 'next';
import Landing from '@/components/landing';

export const metadata: Metadata = {
  title: 'やったログ',
};

export default async function Home() {
  return <Landing />;
}
