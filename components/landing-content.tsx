'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Hector Garcia',
    image: 'A',
    title: 'Software Engineer',
    description: 'This is the best platform I have ever used.',
  },
  {
    name: 'Sophia Martinez',
    image: 'B',
    title: 'UI/UX Designer',
    description: 'A game-changer for my workflow. Highly recommended!',
  },
  {
    name: 'Daniel Chen',
    image: 'C',
    title: 'Full-Stack Developer',
    description: 'Incredible features and seamless experience.',
  },
  {
    name: 'Emily Carter',
    image: 'D',
    title: 'Product Manager',
    description: 'Boosted our team’s productivity like never before!',
  },
]

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl text-white font-extrabold mb-10'>Testimonials</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {testimonials.map(testimonial => (
          <Card key={testimonial.name} className='bg-[#192339] border-none text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div>
                  <p className='text-lg'>{testimonial.name}</p>
                  <p className='text-zinc-400 text-sm'>{testimonial.title}</p>
                </div>
              </CardTitle>

              <CardContent className='pt-4 px-0'>{testimonial.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LandingContent
