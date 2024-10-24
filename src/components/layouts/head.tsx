import NextHead from 'next/head';

type HeadProps = {
  page?: string;
};

export function Head({ page }: HeadProps) {
  const titles = () => {
    const paths = ['Verified Starter App'];
    if (page) paths.push(page);
    return paths;
  };

  return (
    <NextHead>
      <title>{titles().join(' - ')}</title>
      <meta name='description' content='Verified Starter App' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </NextHead>
  );
}
