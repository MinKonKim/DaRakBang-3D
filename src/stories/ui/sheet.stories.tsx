import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open Sheet (Right)</Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <p className='text-sm'>Sheet content goes here</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open Sheet (Left)</Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Navigate through the application</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open Sheet (Top)</Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>You have new notifications</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Open Sheet (Bottom)</Button>
      </SheetTrigger>
      <SheetContent side='bottom'>
        <SheetHeader>
          <SheetTitle>Actions</SheetTitle>
          <SheetDescription>Choose an action to perform</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
