import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  Gear,
  AddressBook,
  Globe,
  AppWindow,
  SealCheck,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'

/**
 * Home's showcase:
 * Each card links to its full portfolio page.
 * Projects uses a looping reel of real project thumbnails.
 */

/* =========================================================
   PROJECT THUMBNAILS
   Files are located in: public/home/
   ========================================================= */

const PROJECT_SHOTS = [
  '/home/project-video.jpg',
  '/home/project-lumea.jpg',
  '/home/project-aurora.jpg',
  '/home/project-bridgeline.jpg',
  '/home/project-glow.jpg',
]

/* =========================================================
   SERVICES
   ========================================================= */

const OFFERS = [
  {
    Icon: FunnelSimple,
    title: 'Funnel Design',
    note: 'Conversion-focused funnels and landing pages.',
  },
  {
    Icon: Gear,
    title: 'Workflow Automation',
    note: 'Automations that reduce repetitive manual work.',
  },
  {
    Icon: AddressBook,
    title: 'CRM',
    note: 'Lead management, pipelines, and follow-up systems.',
  },
  {
    Icon: Globe,
    title: 'Website Design',
    note: 'Modern websites built around the customer journey.',
  },
  {
    Icon: AppWindow,
    title: 'Video & Content',
    note: 'AI video, longform, animated video, and graphics.',
  },
] as const

/* =========================================================
   TESTIMONIAL PLACEHOLDERS
   ========================================================= */

const CLIENTS = [
  {
    name: 'Client Name 1',
    role: 'PLACEHOLDER - your role for them',
    work: 'Tag · Tag · Tag',
    logo: '/placeholders/logo.svg',
  },
  {
    name: 'Client Name 2',
    role: 'PLACEHOLDER - your role for them',
    work: 'Tag · Tag · Tag',
    logo: '/placeholders/logo.svg',
  },
  {
    name: 'Client Name 3',
    role: 'PLACEHOLDER - your role for them',
    work: 'Tag · Tag · Tag',
  },
]

/* =========================================================
   ABOUT PHOTOS
   ========================================================= */

const PHOTOS = [
  '/home/about-1.jpg',
  '/home/about-2.jpg',
  '/home/about-3.jpg',
]

/* =========================================================
   AI BUILDS
   ========================================================= */

const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]

const AI_BUILDS = leaves(aiStack)

/* =========================================================
   CARD HEADER
   ========================================================= */

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>

        <h3 className="bento__title">{title}</h3>
      </span>

      <p className="bento__desc">{desc}</p>

      <ArrowUpRight
        size={15}
        weight="bold"
        aria-hidden="true"
        className="bento__arrow"
      />
    </header>
  )
}

/* =========================================================
   HOME BENTO
   ========================================================= */

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)

  const toolRows = [
    AI_BUILDS.slice(0, half),
    AI_BUILDS.slice(half),
  ]

  return (
    <nav className="bento" aria-label="Explore the portfolio">

      {/* =====================================================
          PROJECTS
          ===================================================== */}

      <Link
        to="/projects"
        className="bento__card bento__card--projects"
      >
        <CardHead
          Icon={FolderOpen}
          title="Projects"
          desc="Selected work across funnels, websites, workflow automation, CRM, video, and content."
        />

        <div
          className="bento__media bento__reel"
          aria-hidden="true"
        >
          <div className="bento__reel-track">

            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((src, i) => (
              <span
                key={`${src}-${i}`}
                className="bento__shot"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ))}

          </div>
        </div>
      </Link>

      {/* =====================================================
          ABOUT
          ===================================================== */}

      <Link
        to="/about"
        className="bento__card bento__card--about"
      >
        <CardHead
          Icon={User}
          title="About"
          desc="Content, funnels, and automation."
        />

        <div
          className="bento__media bento__fan"
          aria-hidden="true"
        >
          {PHOTOS.map((src, i) => (
            <span
              key={src}
              className="bento__photo"
              style={{ ['--i' as string]: i }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          ))}
        </div>
      </Link>

      {/* =====================================================
          AI BUILDS
          ===================================================== */}

      <Link
        to="/projects"
        className="bento__card bento__card--ai"
      >
        <CardHead
          Icon={Robot}
          title="AI Builds"
          desc="AI-powered tools, systems, and digital builds."
        />

        <div
          className="bento__media bento__chips"
          aria-hidden="true"
        >
          {toolRows.map((row, r) => (
            <div
              key={r}
              className="bento__chip-row"
              data-dir={r ? 'right' : 'left'}
            >
              <div className="bento__chip-track">

                {[...row, ...row].map((n, i) => (
                  <span
                    key={`${n.id}-${i}`}
                    className="bento__chip"
                    data-status={n.status}
                  >
                    <n.Icon
                      size={15}
                      weight="duotone"
                    />

                    {n.name}
                  </span>
                ))}

              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* =====================================================
          CREDENTIALS
          ===================================================== */}

      <Link
        to="/about"
        className="bento__card bento__card--creds"
      >
        <CardHead
          Icon={Medal}
          title="Credentials"
          desc="Certified in Klaviyo, Amazon Ads, and Google Ads."
        />

        <div
          className="bento__media bento__badge"
          aria-hidden="true"
        >
          <span className="bento__badge-ring">
            <img
              src="/home/klaviyo-badge.png"
              alt=""
              width={72}
              height={72}
            />
          </span>

          <span className="bento__badge-tag">
            <SealCheck
              size={14}
              weight="fill"
            />

            Klaviyo Practitioner
          </span>
        </div>
      </Link>

      {/* =====================================================
          SERVICES
          ===================================================== */}

      <Link
        to="/services"
        className="bento__card bento__card--services"
      >
        <CardHead
          Icon={Stack}
          title="Services"
          desc="Funnels, websites, automation, CRM, and digital content."
        />

        <ul
          className="bento__media bento__offers"
          role="list"
        >
          {OFFERS.map(
            ({ Icon, title, note }, i) => (
              <li
                key={title}
                className="bento__offer"
                style={
                  {
                    '--i': i,
                  } as React.CSSProperties
                }
              >
                <span className="bento__offer-tile">
                  <Icon
                    size={15}
                    weight="duotone"
                    aria-hidden="true"
                  />
                </span>

                <span className="bento__offer-text">
                  <span className="bento__offer-title">
                    {title}
                  </span>

                  <span className="bento__offer-note">
                    {note}
                  </span>
                </span>

                <span
                  className="bento__offer-num"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
              </li>
            ),
          )}
        </ul>
      </Link>

      {/* =====================================================
          TESTIMONIALS
          ===================================================== */}

      <Link
        to="/testimonials"
        className="bento__card bento__card--quotes"
      >
        <CardHead
          Icon={Quotes}
          title="Testimonials"
          desc="What clients say about the work."
        />

        <div
          className="bento__media bento__reviews"
          aria-hidden="true"
        >
          <div className="bento__reviews-track">

            {[...CLIENTS, ...CLIENTS].map(
              (c, i) => (
                <span
                  key={i}
                  className="bento__review"
                >
                  <span className="bento__review-top">

                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt=""
                        width={18}
                        height={18}
                      />
                    ) : (
                      <Quotes
                        size={14}
                        weight="fill"
                      />
                    )}

                    <b>{c.name}</b>

                  </span>

                  <span className="bento__review-role">
                    {c.role}
                  </span>

                  <span className="bento__review-work">
                    {c.work}
                  </span>
                </span>
              ),
            )}

          </div>
        </div>
      </Link>

    </nav>
  )
}
