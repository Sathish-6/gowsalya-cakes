import { useEffect, useRef, useState } from 'react';

/**
 * Lazy, blur-up image with graceful failure handling.
 *
 * - Only requests the network once the element is near the viewport.
 * - Shows the `.shimmer` placeholder while decoding.
 * - Falls back to a branded gradient block if the network fails, so a broken
 *   image never leaves an empty hole in the layout.
 */
export default function LazyImage({
  src,
  srcSet,
  alt = '',
  className = '',
  imgClassName = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  width,
  height,
  eager = false,
  priority = false,
  onLoad,
}) {
  const [state, setState] = useState('idle'); // idle | loading | loaded | error
  const holderRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (state !== 'idle') return undefined;
    if (eager || priority) {
      setState('loading');
      return undefined;
    }
    const node = holderRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setState('loading');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('loading');
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [state, eager, priority]);

  const failed = state === 'error';

  return (
    <span
      ref={holderRef}
      className={`relative block overflow-hidden ${failed ? 'pink-mesh' : 'shimmer'} ${className}`}
    >
      {state !== 'idle' && !failed ? (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={eager || priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={(event) => {
            setState('loaded');
            onLoad?.(event);
          }}
          onError={() => setState('error')}
          className={`h-full w-full object-cover transition-[opacity,transform,filter] duration-700 ease-out ${
            state === 'loaded' ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-sm'
          } ${imgClassName}`}
        />
      ) : null}

      {failed ? (
        <span className="absolute inset-0 grid place-items-center text-center">
          <span className="font-display text-sm font-semibold text-berry-700/80">Gowsalya</span>
        </span>
      ) : null}
    </span>
  );
}
