type LogoProps = {
  variant?: 'light' | 'dark';
  size?: number;
};

export default function Logo({ variant = 'dark', size = 44 }: LogoProps) {
  const main = variant === 'light' ? '#f5efe4' : '#3d2e1f';
  const accent = variant === 'light' ? '#d4a259' : '#b8392f';
  const ring = variant === 'light' ? 'rgba(245,239,228,.4)' : 'rgba(61,46,31,.25)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Giri logo"
    >
      {/* Outer decorative ring */}
      <circle cx="50" cy="50" r="48" stroke={ring} strokeWidth="1" />
      <circle cx="50" cy="50" r="44" stroke={main} strokeWidth="1.5" />

      {/* Mountain peaks — Himalaya silhouette */}
      <path
        d="M20 62 L35 40 L43 50 L50 34 L58 48 L66 38 L80 62 Z"
        fill={main}
        opacity="0.9"
      />
      {/* Snow cap highlight on tallest peak */}
      <path
        d="M46 38 L50 34 L54 38 L52 40 L50 37 L48 40 Z"
        fill={variant === 'light' ? '#fff' : '#f5efe4'}
      />

      {/* Sun / moon above peaks */}
      <circle cx="50" cy="26" r="5" fill={accent} />

      {/* Devanagari-inspired base line */}
      <path
        d="M28 70 Q50 74 72 70"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Small decorative dots */}
      <circle cx="30" cy="76" r="1.5" fill={accent} />
      <circle cx="50" cy="78" r="1.5" fill={accent} />
      <circle cx="70" cy="76" r="1.5" fill={accent} />
    </svg>
  );
}
