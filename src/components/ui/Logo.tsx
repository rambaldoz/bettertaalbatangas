import React from 'react';

type LogoVariant = 'color' | 'white';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 'color' for light backgrounds (header); 'white' for dark ones (footer). */
  variant?: LogoVariant;
  title?: string;
}

/**
 * Better Taal Batangas wordmark: the sun of the flag beside "Better Taal
 * Batangas." Source files: public/images/logo/logo.svg (flag colors) and
 * logo-white.svg. The sun alone is the favicon (favicon.svg).
 */
const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  title = 'Better Taal Batangas',
  ...props
}) => (
  <img
    src={
      variant === 'white'
        ? '/images/logo/logo-white.svg'
        : '/images/logo/logo.svg'
    }
    alt={title}
    width={329}
    height={109}
    {...props}
  />
);

export default Logo;
