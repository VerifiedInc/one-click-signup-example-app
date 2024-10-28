import NextHead from 'next/head';

type HeadProps = {
  page?: string;
};

export function Head({ page }: HeadProps) {
  const titles = () => {
    const paths = ['Slooow'];
    if (page) paths.push(page);
    return paths;
  };

  return (
    <NextHead>
      <title>{titles().join(' - ')}</title>
      <meta name='description' content='Sign up to Sloow' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/slooow.png' />
    </NextHead>
  );
}
