'use client';
import React from 'react';
import { useParams } from '@/src/compat/router';
import Mentorship from '@/src/views/Mentorship';
import MentorshipDetail from '@/src/views/MentorshipDetail';
import { mentorshipData } from '@/src/data/mentorship';

export default function MentorshipDynamicPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : (params?.slug || '');
  const normalized = String(rawSlug).replace(/_/g, '-').toLowerCase();

  const isProgramSlug = mentorshipData.some(
    (m) =>
      m.slug === rawSlug ||
      m.slug.toLowerCase() === normalized ||
      m.slug.replace(/_/g, '-').toLowerCase() === normalized
  );

  if (isProgramSlug) {
    return <MentorshipDetail />;
  }

  return <Mentorship />;
}
