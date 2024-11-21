import * as z from 'zod'

export const formSchema = z.object({
  prompt: z.string().min(1, 'Image Prompt is required'),
  amount: z.string().min(1, 'Amount is required'),
  resolution: z.string().min(1, 'Resolution is required'),
})

export const amountOptions = [
  {
    label: '1',
    value: '1 Photo',
  },
  {
    label: '2',
    value: '2 Photos',
  },
  {
    label: '3',
    value: '3 Photos',
  },
  {
    label: '4',
    value: '4 Photos',
  },
  {
    label: '5',
    value: '5 Photos',
  },
]

export const resolutionOptions = [
  {
    label: '256x256',
    value: '256x256',
  },
  {
    label: '512x512',
    value: '512x512',
  },
  {
    label: '1024x1024',
    value: '1024x1024',
  },
]
