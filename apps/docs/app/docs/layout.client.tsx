'use client';

import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { modes } from '@/utils/modes';

const itemVariants = cva(
  'rounded-md px-2 py-1 transition-colors hover:text-accent-foreground',
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground',
      },
    },
  },
);

export function Body({ children }: { children: ReactNode }): JSX.Element {
  const mode = useMode();

  return <div className={mode}>{children}</div>;
}

export function NavChildren(): JSX.Element {
  const mode = useMode();

  return (
    <div className="rounded-md border bg-secondary/50 p-1 text-sm text-muted-foreground max-md:absolute max-md:left-[50%] max-md:translate-x-[-50%]">
      {modes.map((m) => (
        <Link
          key={m.param}
          href={`/docs/${m.param}`}
          className={cn(itemVariants({ active: mode === m.param }))}
        >
          {m.name}
        </Link>
      ))}
    </div>
  );
}

export function useMode(): string | undefined {
  const { slug } = useParams();
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : undefined;
}

export function SidebarBanner(): JSX.Element {
  const mode = useMode();
  const currentMode = modes.find((item) => item.param === mode) ?? modes[0];
  const Icon = currentMode.icon;

  return (
    <div className="-mt-2 flex flex-row items-center gap-2 rounded-lg p-2 text-card-foreground transition-colors hover:bg-muted/80">
      <Icon className="size-9 shrink-0 rounded-md bg-primary/30 bg-gradient-to-t from-background/80 p-1.5 text-primary shadow-md shadow-primary/50" />
      <div>
        <p className="font-medium">{currentMode.package}</p>
        <p className="text-xs text-muted-foreground">
          {currentMode.description} - {currentMode.version}
        </p>
      </div>
    </div>
  );
}
