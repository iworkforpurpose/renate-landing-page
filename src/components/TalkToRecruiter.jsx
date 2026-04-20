import Section from './primitives/Section'
import ThreadedConversation from './mockups/ThreadedConversation'

export default function TalkToRecruiter() {
  return (
    <Section
      id="talk"
      bg="white"
      eyebrow="Always reachable"
      title={<>Not a dashboard to monitor. <span className="text-gradient">An agent to work with.</span></>}
      lede="Message Renate on WhatsApp — it responds, explains its reasoning, and acts. Adjust scoring mid-search, request a flag, approve an invite. Your recruiter is one message away."
      align="center"
      contentClassName="max-w-narrow"
    >
      <ThreadedConversation className="mx-auto" />
    </Section>
  )
}
