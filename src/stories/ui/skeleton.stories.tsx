import { Skeleton } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[100px] h-[20px]',
  },
}

export const Card: Story = {
  render: () => (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className='space-y-2'>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-4 w-[200px]' />
      <Skeleton className='h-4 w-[230px]' />
      <Skeleton className='h-4 w-[180px]' />
    </div>
  ),
}
