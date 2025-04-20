import {ReactNode} from 'react';

export function generateStaticParams() {
  return ['en'].map((locale) => ({locale}));
}

export default function LocaleLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 