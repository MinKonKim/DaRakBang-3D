import { ScrollArea } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className='h-[200px] w-[350px] rounded-md border p-4'>
      <div className='space-y-4'>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className='text-sm'>
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const WithTags: Story = {
  render: () => {
    const tags = Array.from({ length: 50 }).map((_, i) => `Tag ${i + 1}`)
    return (
      <ScrollArea className='h-72 w-48 rounded-md border'>
        <div className='p-4'>
          <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
          {tags.map((tag) => (
            <div key={tag} className='text-sm'>
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  },
}
