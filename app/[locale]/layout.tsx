import {ReactNode} from 'react';

export function generateStaticParams() {
  return ['en'].map((locale) => ({locale}));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 