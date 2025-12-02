import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '../data'

export default function FAQSection() {
  return (
    <section id='faq' className='w-full py-20 md:py-32 bg-muted/20'>
      <div className='container px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12 flex flex-col items-center justify-center space-y-4 text-center'
        >
          <Badge
            className='rounded-md px-4 py-1.5 text-sm font-medium shadow-sm'
            variant='secondary'
          >
            FAQ
          </Badge>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            Frequently Asked Questions
          </h2>
          <p className='text-muted-foreground max-w-[800px] md:text-lg'>
            Find answers to common questions about ekiliSync and how it
            works.
          </p>
        </motion.div>

        <div className='mx-auto max-w-3xl'>
          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className='border-border/40 border-b py-2 transition-all duration-200 hover:bg-muted/30 rounded-lg px-2'
                >
                  <AccordionTrigger className='text-left font-medium hover:no-underline hover:text-primary transition-colors duration-200'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground leading-relaxed'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

