/**
 * Plop generator for new examples.
 * Usage: pnpm new-example
 *
 * Mirrors vercel/examples plopfile: single canonical template under
 * plop-templates/example, copied into the chosen category folder, with
 * placeholder substitution across all files.
 */

const transformName = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const filesToAlwaysCopyOver = [
  'README.md',
  'tsconfig.json',
  '.eslintrc.json',
  '.gitignore',
  'package.json',
  'pnpm-lock.yaml',
  'app/layout.tsx',
  'app/page.tsx',
  'postcss.config.js',
  'tailwind.config.js',
  'public/favicon.ico',
  'turbo.json',
  'vercel.json',
  'next-env.d.ts',
]

export default function (plop) {
  plop.setHelper('slug', transformName)

  plop.setGenerator('example', {
    description: 'New example in repo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Example name (human-readable, e.g. "My Cool App"):',
        validate: (v) => (v && v.trim().length > 0 ? true : 'Name is required'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'One-line description:',
        validate: (v) => (v && v.trim().length > 0 ? true : 'Description is required'),
      },
      {
        type: 'list',
        name: 'category',
        message: 'Category folder:',
        choices: [
          { name: 'solutions/ (full reference implementations)', value: 'solutions' },
          { name: 'starter/ (minimal templates)', value: 'starter' },
        ],
      },
    ],
    actions: (data) => {
      const slug = transformName(data.name)
      const path = `${data.category}/${slug}`
      data.slug = slug
      data.path = path
      data.dateAdded = new Date().toISOString().slice(0, 10)

      const actions = [
        {
          type: 'addMany',
          destination: path,
          base: 'plop-templates/example',
          templateFiles: 'plop-templates/example/**/*',
          globOptions: { dot: true },
          force: true,
        },
      ]

      for (const file of filesToAlwaysCopyOver) {
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP TITLE HERE --/g,
          template: data.name,
        })
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP SLUG HERE --/g,
          template: slug,
        })
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP DESCRIPTION HERE --/g,
          template: data.description,
        })
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP CATEGORY HERE --/g,
          template: data.category,
        })
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP PATH HERE --/g,
          template: path,
        })
        actions.push({
          type: 'modify',
          path: `${path}/${file}`,
          pattern: /-- PLOP EXAMPLE NAME HERE --/g,
          template: slug,
        })
      }

      return actions
    },
  })
}
