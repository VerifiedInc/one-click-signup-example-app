import { Button, ButtonProps } from '@mui/material';
import { animations, IconPlayer, IconPlayerProps } from './IconPlayer';

interface AnimatedButtonProps extends ButtonProps {
  text: string;
  animationIcon: keyof typeof animations;
  iconColor?: string;
  target?: string;
  iconProps?: IconPlayerProps;
}

export function AnimatedButton({
  text,
  animationIcon,
  iconColor,
  variant = 'text',
  color = 'neutral',
  target,
  iconProps,
  ...props
}: AnimatedButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      sx={{ lineHeight: 'normal', ...props.sx }}
      {...(target && { target })}
      startIcon={
        <IconPlayer
          animation={animationIcon}
          color={iconColor}
          paintFill
          paintStroke
          {...iconProps}
        />
      }
    >
      {text}
    </Button>
  );
}
