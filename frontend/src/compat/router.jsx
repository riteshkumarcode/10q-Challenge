'use client';
import React from 'react';
import NextLink from 'next/link';
import { useRouter, usePathname, useParams as useNextParams, useSearchParams } from 'next/navigation';

export function Link({ to, href, children, className, ...props }) {
  const target = to || href || '#';
  return (
    <NextLink href={target} className={className} {...props}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      if (typeof window !== 'undefined') {
        window.history.go(to);
      }
    } else if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useLocation() {
  const pathname = usePathname() || '/';
  return {
    pathname,
    search: '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    state: null
  };
}

export function useParams() {
  const params = useNextParams();
  return params || {};
}

export function BrowserRouter({ children }) {
  return <>{children}</>;
}

export function Routes({ children }) {
  return <>{children}</>;
}

export function Route() {
  return null;
}
