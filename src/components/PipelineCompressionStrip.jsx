import Section from './primitives/Section'
import PipelineFunnel from './mockups/PipelineFunnel'

export default function PipelineCompressionStrip() {
  return (
    <Section
      id="funnel"
      bg="white"
      eyebrow="The funnel is broken. Here's the fix."
      title={<>From the open web to ten hires you'd <span className="text-gradient">actually talk to</span>.</>}
      lede="Keyword filters throw out strong candidates. 30-minute phone screens cost a week. One autonomous pass takes a role from tens of thousands of applicants to a shortlist you can walk into an interview with."
      align="center"
    >
      <PipelineFunnel />
    </Section>
  )
}
