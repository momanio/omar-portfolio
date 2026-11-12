import {defineField, defineType} from 'sanity'

export const projectsType = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project thumbnail',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
    }),
    defineField({
      name: 'fullPageScreenshot',
      title: 'Full-page screenshot',
      type: 'image',
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'Short project description. The website falls back to Body when empty.',
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) => rule.integer().min(1900).max(2200),
    }),
    defineField({
      name: 'role',
      type: 'string',
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'description',
      title: 'Legacy description',
      type: 'text',
      description: 'Retained for existing content. Use Summary or Body for new projects.',
      hidden: ({document}) => !document?.description,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'projectUrl',
      title: 'Live project URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'repoUrl',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'accentColor',
      type: 'string',
      description: 'Optional six-digit hex color, for example #E8A04E.',
      validation: (rule) => rule.regex(/^#[\da-f]{6}$/i, {name: 'hex color'}),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to sort by featured status and date.',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
