import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultComponents from 'fumadocs-ui/mdx';
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from 'fumadocs-ui/components/codeblock';
import type { ReactNode } from 'react';
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-ui/twoslash/popup';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import { Wrapper } from '@/components/preview/wrapper';
import { cn } from './utils/cn';

const shortcuts: Record<string, string> = {
  ui: './content/docs/ui/props.ts',
  headless: './content/docs/headless/props.ts',
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Popup,
    PopupContent,
    PopupTrigger,
    pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
      <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
        <Pre className={cn('max-h-[400px]', className)} {...props} />
      </CodeBlock>
    ),
    AutoTypeTable: ({ path, name }: { path: string; name: string }) => (
      <AutoTypeTable
        path={path in shortcuts ? shortcuts[path] : path}
        name={name}
      />
    ),
    Tabs,
    Tab,
    Callout,
    TypeTable,
    Accordion,
    Accordions,
    Wrapper,
    InstallTabs: ({
      items,
      children,
    }: {
      items: string[];
      children: ReactNode;
    }) => (
      <Tabs items={items} id="package-manager">
        {children}
      </Tabs>
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
  };
}
