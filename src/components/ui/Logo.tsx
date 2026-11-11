import React from 'react';

type LogoVariant = 'solid' | 'lines';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** 'solid' is the full-colour tile mark; 'lines' is single-colour and takes the current text colour. */
  variant?: LogoVariant;
  title?: string;
}

/**
 * Better Taal Batangas tile mark (3x3, 1572 in the centre), inlined so the
 * page font (Manrope) and currentColor apply. Source files live in
 * public/images/logo/ (btb-mark-*.svg; the 4x4 pattern is btb-logo-*.svg).
 */
const Logo: React.FC<LogoProps> = ({
  variant = 'solid',
  title = 'Better Taal Batangas',
  ...props
}) => {
  if (variant === 'lines') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="4 4 166 166"
        role="img"
        aria-label={title}
        {...props}
      >
        <defs>
          <g id="l1">
            <path d="M4 50 C4 24 24 4 50 4 C50 30 30 50 4 50 Z M4 50 L50 4" />
          </g>
          <g id="l2" transform="translate(27 27)">
            <circle r="23" />
            <circle r="10" />
            <path d="M13.5 0 H19.5 M-13.5 0 H-19.5 M0 13.5 V19.5 M0 -13.5 V-19.5 M9.55 9.55 L13.79 13.79 M-9.55 -9.55 L-13.79 -13.79 M9.55 -9.55 L13.79 -13.79 M-9.55 9.55 L-13.79 13.79" />
          </g>
          <g id="l3">
            <path d="M0 27 A27 27 0 0 1 54 27 M14 54 V27 A13 13 0 0 1 40 27 V54" />
          </g>
          <g id="l4">
            <path d="M18 0 V54 M36 0 V54 M0 18 H54 M0 36 H54" />
          </g>
          <g id="l5">
            <path d="M0 54 L18 10 H24 L27 16 L30 10 H36 L54 54" />
          </g>
          <g id="l6">
            <path d="M0 14 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0 M0 27 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0 M0 40 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0" />
          </g>
          <g id="l7">
            <path d="M27 4 L30.5 19 H23.5 Z" />
            <circle cx="27" cy="27" r="4.5" />
            <rect
              x="8"
              y="-3.5"
              width="25"
              height="7"
              rx="3.5"
              transform="translate(27 27) rotate(135)"
            />
            <rect
              x="8"
              y="-3.5"
              width="25"
              height="7"
              rx="3.5"
              transform="translate(27 27) rotate(45)"
            />
          </g>
          <g id="l8" transform="translate(27 27)">
            <circle r="6.5" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(45)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(90)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(135)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(180)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(225)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(270)" />
            <ellipse cy="-16.5" rx="4.5" ry="6.5" transform="rotate(315)" />
          </g>
          <g id="l9">
            <circle cx="10" cy="10" r="6.5" />
            <circle cx="27" cy="10" r="6.5" />
            <circle cx="44" cy="10" r="6.5" />
            <circle cx="10" cy="27" r="6.5" />
            <circle cx="27" cy="27" r="6.5" />
            <circle cx="44" cy="27" r="6.5" />
            <circle cx="10" cy="44" r="6.5" />
            <circle cx="27" cy="44" r="6.5" />
            <circle cx="44" cy="44" r="6.5" />
          </g>
          <g id="l10">
            <path d="M27 0 A27 27 0 0 1 0 27 M27 0 A27 27 0 0 0 54 27 M27 54 A27 27 0 0 0 0 27 M27 54 A27 27 0 0 1 54 27" />
          </g>
          <g id="l11">
            <path d="M0 54 L27 0 L54 54 M18 18 H36 M9 36 H45" />
          </g>
          <g id="l12">
            <path d="M0 18 L13.5 8 L27 18 L40.5 8 L54 18 M0 32 L13.5 22 L27 32 L40.5 22 L54 32 M0 46 L13.5 36 L27 46 L40.5 36 L54 46" />
          </g>
          <g id="l13" transform="translate(27 27) rotate(-45)">
            <path d="M-24 -6 H24 A6 6 0 0 1 24 6 H-24 A6 6 0 0 1 -24 -6 Z" />
            <rect x="-17" y="-1.25" width="34" height="2.5" rx="1.25" />
            <circle cx="-23" cy="0" r="1.6" />
            <circle cx="23" cy="0" r="1.6" />
          </g>
          <g
            id="l-tname"
            fontFamily="Manrope, sans-serif"
            fontWeight="700"
            fontSize="13"
            letterSpacing="1.2"
            textAnchor="middle"
          >
            <text x="54.6" y="24">
              BETTER TAAL
            </text>
            <text x="54.6" y="41">
              BATANGAS
            </text>
          </g>
          <g
            id="l-tyear"
            fontFamily="Manrope, sans-serif"
            fontWeight="700"
            fontSize="18"
            letterSpacing="1"
            textAnchor="middle"
          >
            <text x="27.5" y="33.5">
              1572
            </text>
          </g>
        </defs>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <rect x="6" y="6" width="162" height="162" />
          <path d="M60 6 V168 M114 6 V168 M6 60 H168 M6 114 H168" />
          <use href="#l1" transform="translate(6 6)" />
          <use href="#l2" transform="translate(60 6)" />
          <use href="#l3" transform="translate(114 6)" />
          <use href="#l6" transform="translate(6 60)" />
          <use href="#l7" transform="translate(114 60)" />
          <use href="#l5" transform="translate(6 114)" />
          <use href="#l9" transform="translate(60 114)" />
          <use href="#l8" transform="translate(114 114)" />
        </g>
        <g fill="currentColor">
          <use href="#l-tyear" transform="translate(60 60)" />
        </g>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="6 6 162 162"
      role="img"
      aria-label={title}
      {...props}
    >
      <defs>
        <g id="s1">
          <path fill="#fefae0" d="M0 54 C0 24 24 0 54 0 Z" />
          <path fill="#dda15e" d="M54 0 C54 30 30 54 0 54 Z" />
        </g>
        <g id="s2" transform="translate(27 27)">
          <circle r="27" fill="#283618" />
          <circle r="12" fill="#fefae0" />
          <g fill="#fefae0">
            <path d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(45)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(90)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(135)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(180)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(225)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(270)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
            <path transform="rotate(315)" d="M-2.5 -24 L2.5 -24 L0 -16 Z" />
          </g>
        </g>
        <g id="s3">
          <path
            fill="#fefae0"
            fillRule="evenodd"
            d="M0 54 V27 A27 27 0 0 1 54 27 V54 Z M14 54 V27 A13 13 0 0 1 40 27 V54 Z"
          />
        </g>
        <g id="s4">
          <path
            fill="#fefae0"
            d="M0 0 H17 V17 H0 Z M18.5 0 H35.5 V17 H18.5 Z M37 0 H54 V17 H37 Z M0 18.5 H17 V35.5 H0 Z M18.5 18.5 H35.5 V35.5 H18.5 Z M37 18.5 H54 V35.5 H37 Z M0 37 H17 V54 H0 Z M18.5 37 H35.5 V54 H18.5 Z M37 37 H54 V54 H37 Z"
          />
        </g>
        <g id="s5">
          <path
            fill="#283618"
            d="M0 54 L18 10 H24 L27 16 L30 10 H36 L54 54 Z"
          />
        </g>
        <g id="s6" fill="#fefae0">
          <path d="M0 11 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0 V16 q-6.75 5 -13.5 0 t-13.5 0 t-13.5 0 t-13.5 0 Z" />
          <path d="M0 24 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0 V29 q-6.75 5 -13.5 0 t-13.5 0 t-13.5 0 t-13.5 0 Z" />
          <path d="M0 37 q6.75 -5 13.5 0 t13.5 0 t13.5 0 t13.5 0 V42 q-6.75 5 -13.5 0 t-13.5 0 t-13.5 0 t-13.5 0 Z" />
        </g>
        <g id="s7">
          <g fill="#fefae0">
            <path d="M27 0 L31 23 H23 Z" />
            <rect
              x="0"
              y="-3.5"
              width="36"
              height="7"
              rx="3.5"
              transform="translate(27 27) rotate(138.4)"
            />
            <rect
              x="0"
              y="-3.5"
              width="36"
              height="7"
              rx="3.5"
              transform="translate(27 27) rotate(41.6)"
            />
          </g>
          <circle cx="27" cy="27" r="5" fill="#bc6c25" />
          <circle cx="27" cy="27" r="2" fill="#fefae0" />
        </g>
        <g id="s8" transform="translate(27 27)">
          <g fill="#fefae0">
            <ellipse cy="-19" rx="5" ry="8" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(45)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(90)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(135)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(180)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(225)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(270)" />
            <ellipse cy="-19" rx="5" ry="8" transform="rotate(315)" />
          </g>
          <circle r="9" fill="#dda15e" />
        </g>
        <g id="s9" fill="#fefae0">
          <circle cx="9" cy="9" r="8.5" />
          <circle cx="27" cy="9" r="8.5" />
          <circle cx="45" cy="9" r="8.5" />
          <circle cx="9" cy="27" r="8.5" />
          <circle cx="27" cy="27" r="8.5" />
          <circle cx="45" cy="27" r="8.5" />
          <circle cx="9" cy="45" r="8.5" />
          <circle cx="27" cy="45" r="8.5" />
          <circle cx="45" cy="45" r="8.5" />
        </g>
        <g id="s10">
          <path fill="#283618" d="M27 0 A27 27 0 0 1 0 27 L0 0 Z" />
          <path fill="#fefae0" d="M27 0 A27 27 0 0 0 54 27 L54 0 Z" />
          <path fill="#fefae0" d="M27 54 A27 27 0 0 0 0 27 L0 54 Z" />
          <path fill="#283618" d="M27 54 A27 27 0 0 1 54 27 L54 54 Z" />
        </g>
        <g id="s11" fill="#fefae0">
          <path d="M27 0 L18.5 17 H35.5 Z" />
          <path d="M17.5 19 H36.5 L44.5 35 H9.5 Z" />
          <path d="M8.5 37 H45.5 L54 54 H0 Z" />
        </g>
        <g id="s12" fill="#fefae0">
          <path d="M0 18 L13.5 8 L27 18 L40.5 8 L54 18 V23 L40.5 13 L27 23 L13.5 13 L0 23 Z" />
          <path d="M0 32 L13.5 22 L27 32 L40.5 22 L54 32 V37 L40.5 27 L27 37 L13.5 27 L0 37 Z" />
          <path d="M0 46 L13.5 36 L27 46 L40.5 36 L54 46 V51 L40.5 41 L27 51 L13.5 41 L0 51 Z" />
        </g>
        <g id="s13" transform="translate(27 27) rotate(-45)">
          <path
            fill="#fefae0"
            fillRule="evenodd"
            d="M-28 -6.5 H28 A6.5 6.5 0 0 1 28 6.5 H-28 A6.5 6.5 0 0 1 -28 -6.5 Z M-20 -1.4 H20 V1.4 H-20 Z M-27 -1.8 A1.8 1.8 0 1 0 -26.99 -1.8 Z M27 -1.8 A1.8 1.8 0 1 0 27.01 -1.8 Z"
          />
        </g>
        <g
          id="s-tname"
          fontFamily="Manrope, sans-serif"
          fontWeight="700"
          fontSize="13"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          <text x="54.6" y="24">
            BETTER TAAL
          </text>
          <text x="54.6" y="41">
            BATANGAS
          </text>
        </g>
        <g
          id="s-tyear"
          fontFamily="Manrope, sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="1"
          textAnchor="middle"
        >
          <text x="27.5" y="33.5">
            1572
          </text>
        </g>
      </defs>
      <rect x="6" y="6" width="54" height="54" fill="#283618" />
      <rect x="60" y="6" width="54" height="54" fill="#dda15e" />
      <rect x="114" y="6" width="54" height="54" fill="#606c38" />
      <rect x="6" y="60" width="54" height="54" fill="#bc6c25" />
      <rect x="60" y="60" width="54" height="54" fill="#606c38" />
      <rect x="114" y="60" width="54" height="54" fill="#283618" />
      <rect x="6" y="114" width="54" height="54" fill="#dda15e" />
      <rect x="60" y="114" width="54" height="54" fill="#283618" />
      <rect x="114" y="114" width="54" height="54" fill="#bc6c25" />
      <use href="#s1" transform="translate(6 6)" />
      <use href="#s2" transform="translate(60 6)" />
      <use href="#s3" transform="translate(114 6)" />
      <use href="#s6" transform="translate(6 60)" />
      <use href="#s7" transform="translate(114 60)" />
      <use href="#s5" transform="translate(6 114)" />
      <use href="#s9" transform="translate(60 114)" />
      <use href="#s8" transform="translate(114 114)" />
      <g fill="#fefae0">
        <use href="#s-tyear" transform="translate(60 60)" />
      </g>
    </svg>
  );
};

export default Logo;
