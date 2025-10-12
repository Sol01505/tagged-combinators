import plugin from 'tailwindcss/plugin.js';

// using empty values here so the compiler plays nice and generates the styles without values
const EMPTY_VALUES = { values: { DEFAULT: '' } };
const sanitizeModifier = (mod: string | null) => mod?.trim() || '';
const variantCombinatorPairs = {
  '*': '>',
  '**': ' ',
} as const;

export default plugin(({ matchVariant }) => {
  for (const [variant, combinator] of Object.entries(variantCombinatorPairs)) {
    matchVariant(
      variant,
      (_, { modifier }) => {
        modifier = sanitizeModifier(modifier);
        return `& ${combinator} ${modifier || '*'}`;
      },
      EMPTY_VALUES
    );
  }
});
