import { PropsWithChildren, useEffect, useState } from 'react';

export function ClientOnly({ children }: Readonly<PropsWithChildren>) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return children;
}
