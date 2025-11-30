import { Input, Label } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>Email</Label>
      <Input type='email' id='email' placeholder='Email' />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const File: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>Picture</Label>
      <Input id='picture' type='file' />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className='grid w-full max-w-sm gap-4'>
      <div className='grid gap-1.5'>
        <Label htmlFor='text'>Text</Label>
        <Input type='text' id='text' placeholder='Text input' />
      </div>
      <div className='grid gap-1.5'>
        <Label htmlFor='email-type'>Email</Label>
        <Input type='email' id='email-type' placeholder='Email input' />
      </div>
      <div className='grid gap-1.5'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' id='password' placeholder='Password input' />
      </div>
      <div className='grid gap-1.5'>
        <Label htmlFor='number'>Number</Label>
        <Input type='number' id='number' placeholder='Number input' />
      </div>
    </div>
  ),
}
