import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
  PlayerState,
} from '@dotlottie/react-player';
import { Box, SxProps, Theme } from '@mui/material';
import { useEffect, useRef } from 'react';

export const animations = {
  play: '/animations/system-solid-26-play-hover-play.json',
  code: '/animations/system-solid-34-code-hover-code.json',
  settings: '/animations/settings.json',
  store: '/animations/store.json',
  home: '/animations/home.json',
};

export type IconPlayerProps = {
  animation: keyof typeof animations;
  speed?: number;
  autoPlay?: boolean;
  color?: string;
  paintFill?: boolean;
  paintStroke?: boolean;
  rotate?: number;
  additionalSx?: SxProps<Theme>;
};

export function IconPlayer({
  animation,
  speed = 1,
  autoPlay,
  color,
  paintFill,
  paintStroke,
  rotate,
  additionalSx,
  ...props
}: IconPlayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lottie = useRef<DotLottieCommonPlayer | null>(null);

  const animate = () => {
    if (lottie.current?.currentState === PlayerState.Playing) return;

    lottie.current?.goToAndPlay(0);
  };

  useEffect(() => {
    const container = ref.current;

    if (!container || autoPlay) return;

    container.parentElement?.addEventListener('mouseenter', animate);

    return () => {
      container.parentElement?.removeEventListener('mouseenter', animate);
    };
  }, [autoPlay]);

  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        ...additionalSx,
        color,
        aspectRatio: 1 / 1,
        overflow: 'hidden',
        transform: `rotate(${rotate}deg)`,

        '& svg path[fill]': {
          fill: paintFill ? 'currentColor' : undefined,
        },
        '& svg path[stroke]': {
          stroke: paintStroke ? 'currentColor' : undefined,
        },
      }}
    >
      <DotLottiePlayer
        ref={lottie}
        src={animations[animation]}
        autoplay={autoPlay}
        loop={false}
        speed={speed}
        style={{ width: 24, height: 24 }}
      />
    </Box>
  );
}
