import { DotLottiePlayer } from '@dotlottie/react-player';

export function NotFoundAnimation() {
  return (
    <DotLottiePlayer
      src='/animations/not-found.lottie'
      autoplay
      loop
      style={{ width: '100%', maxWidth: 600, aspectRatio: 601 / 321 }}
    />
  );
}
