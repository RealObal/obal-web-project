import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Obal Web CMS',
  projectId: 'khbx2r3z',
  dataset: 'blog',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'post',
        title: 'Post',
        type: 'document',
        fields: [
          {name: 'title', title: 'Title', type: 'string'},
          {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}},
          {name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}]},
          {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {hotspot: true},
            fields: [
              {name: 'alt', title: 'Alt text', type: 'string'},
              {name: 'caption', title: 'Caption', type: 'string'}
            ]
          },
          {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}]
          },
          {name: 'publishedAt', title: 'Published at', type: 'datetime'},
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
              {type: 'block'},
              {
                type: 'image',
                options: {hotspot: true},
                fields: [
                  {name: 'alt', title: 'Alt text', type: 'string'},
                  {name: 'caption', title: 'Caption', type: 'string'},
                  {name: 'attribution', title: 'Photo credit', type: 'string'}
                ]
              },
              {
                type: 'object',
                name: 'callout',
                title: 'Callout',
                fields: [
                  {
                    name: 'label',
                    type: 'string',
                    title: 'Label',
                    description: 'e.g. Field insight, Key takeaway',
                  },
                  {
                    name: 'body',
                    type: 'text',
                    title: 'Body text',
                  },
                ],
                preview: {
                  select: { title: 'label', subtitle: 'body' },
                },
              }
            ]
          }
        ]
      },
      {
        name: 'author',
        title: 'Author',
        type: 'document',
        fields: [
          {name: 'name', title: 'Name', type: 'string'}
        ]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'document',
        fields: [
          {name: 'title', title: 'Title', type: 'string'}
        ]
      }
    ]
  }
})