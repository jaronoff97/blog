import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
  { ignores: ['.next/**', '.contentlayer/**', 'out/**', 'public/**', 'node_modules/**'] },
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      'prettier/prettier': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
