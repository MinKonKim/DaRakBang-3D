import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui"
import type { Meta, StoryObj } from "@storybook/nextjs"

const meta = {
  title: "UI/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = Omit<StoryObj<typeof meta>, "args"> & { args?: never }

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup direction='horizontal' className='min-h-[200px] max-w-md rounded-lg border'>
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction='vertical' className='min-h-[400px] max-w-md rounded-lg border'>
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Bottom Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup direction='horizontal' className='min-h-[200px] max-w-md rounded-lg border'>
      <ResizablePanel defaultSize={33}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={34}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Panel 2</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={33}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Panel 3</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
