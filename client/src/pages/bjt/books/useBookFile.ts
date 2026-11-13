import { useEffect, useState } from 'react';
import { loadFile } from './library';

/** Object URL of a page or recording of an imported book; revoked when the path changes or on unmount. */
export function useBookFile(bookId: string, path: string | undefined): string | undefined {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    setUrl(undefined);
    if (!path) return;
    let alive = true;
    let made: string | undefined;
    void loadFile(bookId, path).then((blob) => {
      if (!alive || !blob) return;
      made = URL.createObjectURL(blob);
      setUrl(made);
    });
    return () => {
      alive = false;
      if (made) URL.revokeObjectURL(made);
    };
  }, [bookId, path]);
  return url;
}
