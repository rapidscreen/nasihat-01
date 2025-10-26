'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /all by default
    router.replace('/dashboard/jobs/all');
  }, [router]);

  return null; // This page just redirects, so no UI needed
}