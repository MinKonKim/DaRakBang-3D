import { Label } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Label',
  },
}

export const WithHtmlFor: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <input type='checkbox' id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  ),
}
