'use server';

import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';
import { signOut } from '@/services/auth.service';

export const signOutAction = async () => {
  await signOut();
  // レイアウト全体（HeaderAuth を含む）を再検証
  revalidatePath('/', 'layout');

  redirect('/sign-in', RedirectType.push);
};
