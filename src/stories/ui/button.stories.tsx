import { Button } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Mail, Plus } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail />
        Login with Email
      </>
    ),
  },
}

export const IconButton: Story = {
  args: {
    size: 'icon',
    children: <Plus />,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Button size='sm'>Small</Button>
      <Button size='default'>Default</Button>
      <Button size='lg'>Large</Button>
      <Button size='xl'>Extra Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <Button variant='default'>Default</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='outline'>Outline</Button>
      </div>
      <div className='flex gap-2'>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}
