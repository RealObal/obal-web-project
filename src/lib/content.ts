import { createContext, useContext } from 'react';

export const ContentContext = createContext<unknown[] | null>(null);
export function useContentSnapshot<T>() { return useContext(ContentContext) as T[] | null; }
export function readContentSnapshot(): unknown[] | null {
  const node = document.getElementById('site-content');
  if (!node) return null;
  try { return JSON.parse(node.textContent || 'null'); } catch { return null; }
}
