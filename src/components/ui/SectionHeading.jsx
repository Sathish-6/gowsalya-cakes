import { StaggerParent, StaggerItem } from '../decor/Reveal';

/**
 * Consistent section header: eyebrow pill, display title, supporting copy and
 * an optional decorative script word.
 */
export function SectionHeading({
  eyebrow = '',
  title = '',
  highlight = '',
  script = '',
  description = '',
  align = 'center',
  className = '',
  children,
}) {
  const centered = align === 'center';

  return (
    <StaggerParent className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow ? (
        <StaggerItem>
          <span className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-berry-500" aria-hidden="true" />
            {eyebrow}
          </span>
        </StaggerItem>
      ) : null}

      <StaggerItem>
        <h2 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-choco-800 sm:text-4xl lg:text-5xl">
          {title}
          {highlight ? (
            <>
              {' '}
              <span className="text-berry-gradient">{highlight}</span>
            </>
          ) : null}
        </h2>
      </StaggerItem>

      {script ? (
        <StaggerItem>
          <p
            className={`mt-1 font-script text-3xl text-berry-500/80 sm:text-4xl ${centered ? '' : ''}`}
            aria-hidden="true"
          >
            {script}
          </p>
        </StaggerItem>
      ) : null}

      {description ? (
        <StaggerItem>
          <p className="mt-4 text-base leading-relaxed text-choco-500 sm:text-lg">{description}</p>
        </StaggerItem>
      ) : null}

      {children ? (
        <StaggerItem>
          <div className={`mt-7 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{children}</div>
        </StaggerItem>
      ) : null}
    </StaggerParent>
  );
}

export default SectionHeading;
