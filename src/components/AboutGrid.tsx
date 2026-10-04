import type { CSSProperties } from 'react'
import { MapPin, SealCheck } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the portrait on the
 * right. Sized to the panel.
 *
 * The left column is a ladder: one display statement, one line of context,
 * then the four things you do - each carrying the marks of the tools it is
 * built with and a line of the skills it covers.
 */

const CANVA = { src: '/icons/canva.svg', name: 'Canva' }
const CAPCUT = { src: '/icons/Capcut.svg', name: 'CapCut' }
const META = { src: '/icons/meta.svg', name: 'Meta' }
const BUFFER = { src: '/icons/buffer.png', name: 'Buffer' }
const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const MAKE = { src: '/icons/make.svg', name: 'Make' }
const ZOHO = { src: '/icons/zoho.svg', name: 'Zoho' }
const CHATGPT = { src: '/icons/openai.png', name: 'ChatGPT' }
const CLAUDE = { src: '/icons/claude.svg', name: 'Claude' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const NOTION = { src: '/icons/notion.svg', name: 'Notion' }
const SLACK = { src: '/icons/slack.svg', name: 'Slack' }

type Capability = {
  index: string
  title: string
  skills: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Social Media & Content',
    skills: 'Content creation • Social media management • Graphic design • Video editing',
    marks: [CANVA, CAPCUT, META, BUFFER],
  },
  {
    index: '02',
    title: 'Funnels & Lead Generation',
    skills: 'Funnel design • Landing pages • Lead capture • Lead nurturing',
    marks: [GHL, CANVA, META],
  },
  {
    index: '03',
    title: 'CRM & Automation',
    skills: 'GoHighLevel • CRM management • Workflow automation • AI-assisted systems',
    marks: [GHL, MAKE, ZOHO, CHATGPT, CLAUDE],
  },
  {
    index: '04',
    title: 'Websites & Digital Support',
    skills: 'Website support • Google Sites • WordPress • Digital marketing support',
    marks: [GWS, NOTION, SLACK],
  },
]

const CERTIFICATIONS = [
  {
    name: 'Klaviyo Practitioner',
    url: 'https://credential.klaviyo.com/bb767744-87b9-46c3-98ad-08c2262082ef#acc.PFH7pb4i',
  },
  {
    name: 'Amazon Ads Foundations',
    url: 'https://advertising.amazon.com/academy/certificates/64b28f86-b26e-41e7-b4e7-af488b521427',
  },
  {
    name: 'Google Ads Search Certification',
    url: 'https://skillshop.credential.net/7bd20f18-6dbe-4c69-b71e-040a81460d60#acc.zjSXcvrH',
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          I help businesses turn ideas into content, leads into organized systems, and
          repetitive work into smarter workflows.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I’m a multi-skilled digital marketing and automation professional
            <span>
              {' '}
              focused on helping businesses build a stronger online presence and more
              efficient systems.
            </span>
          </p>

          <p className="agrid__note">
            I enjoy turning scattered ideas and manual processes into practical systems that
            are easier to manage, repeat, and scale.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-copy">
                  <span className="agrid__cap-title">{c.title}</span>
                  <span className="agrid__cap-skills">{c.skills}</span>
                </span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <SealCheck size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Certifications &amp; Training</span>
                <span className="agrid__chips">
                  {CERTIFICATIONS.map((c) => (
                    <span key={c} className="agrid__chip">
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">GMT+8 • Philippines</span>
                <span className="agrid__cell-meta">Working with</span>
              </span>
            </span>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src="/about.png"
            alt={`Portrait of ${profile.name}`}
            loading="eager"
            decoding="async"
            width={394}
            height={419}
          />
        </div>
      </div>
    </section>
  )
}
