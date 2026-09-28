import useCountUp from '../../hooks/useCountUp';

/**
 * Animated statistic with a count-up that fires on scroll into view.
 * Falls back to the final value when reduced motion is requested.
 */
export default function Counter({ value, suffix = '', prefix = '', label, decimals = 0, duration = 1700 }) {
  const { ref, value: current } = useCountUp(value, { duration, decimals });
  const display = decimals > 0 ? current.toFixed(decimals) : Math.round(current);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center sm:items-start">
      <span className="font-display text-3xl font-bold text-berry-700 sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="text-sm text-choco-500 sm:text-base">{label}</span>
    </div>
  );
}
