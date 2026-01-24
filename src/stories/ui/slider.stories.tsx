import { Slider } from "@/shared/ui"
import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
}

export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
    className: "w-[300px]",
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState([50])
    return (
      <div className='w-[300px] space-y-4'>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <div className='text-sm text-center'>Value: {value[0]}</div>
      </div>
    )
  },
}
