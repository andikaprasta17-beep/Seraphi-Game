import React from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import AdminShell from './AdminShell';

export const metadata: Metadata = {
  title: 'SERAPHI GAME — Admin CMS Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('seraphi_admin_token')?.value;
  const session = token ? verifySessionToken(token) : null;

  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  );
}
