'use server';

import { redirect } from 'next/navigation';
import { signInWithPassword } from '@/services/auth.service';
import { encodedRedirect } from '@/utils/utils';

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signInWithPassword(email, password);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'サインインに失敗しました';
    return encodedRedirect('error', '/sign-in', errorMessage);
  }

  redirect('/home');
};
