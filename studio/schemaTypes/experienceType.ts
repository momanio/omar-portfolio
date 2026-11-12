import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Entry type',
      type: 'string',
      options: {
        list: [
          {title: 'Work', value: 'work'},
          {title: 'Education', value: 'education'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'name',
      title: 'Organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'StartDate',
      title: 'Start date',
      type: 'date',
      hidden: ({document}) => typeof document?.startDate === 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      description: 'Start date used by existing entries saved with this field name.',
      hidden: ({document}) => typeof document?.startDate !== 'string',
    }),
    defineField({
      name: 'company',
      title: 'Legacy company name',
      type: 'string',
      description: 'Retained for existing content. The portfolio displays Organization.',
      readOnly: true,
      hidden: ({document}) => !document?.company,
    }),

    defineField({
      name: 'isCurrent',
      title: 'Currently working here?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'EndDate',
      title: 'End date',
      type: 'date',
      hidden: ({document}) => document?.isCurrent === true,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isCurrent === true) return true

          if (!value) {
            return 'End date is required unless this is your current job'
          }

          const startDate = context.document?.startDate ?? context.document?.StartDate
          if (value && typeof startDate === 'string' && value < startDate) {
            return 'End date must be on or after the start date'
          }

          return true
        }),
    }),

    defineField({
      name: 'icon',
      title: 'Organization logo',
      type: 'image',
      fields: [{name: 'alt', title: 'Alternative text', type: 'string'}],
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'techTags',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'link',
      title: 'Organization or course URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
})
