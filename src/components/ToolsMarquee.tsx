import { useMemo } from 'react'

/**
 * ToolsMarquee
 *
 * Horizontally scrolling strip of brand logos + labels for the tools you work with.
 * Icons live in public/icons/. A tool with no iconPath shows a simple letter badge
 * until its logo file is uploaded.
 * The strip lives on the cream shader page, NOT inside a dark section.
 *
 * Implementation notes:
 * - The tools list is duplicated in JSX (`doubled`) so the CSS keyframe can translate
 *   by exactly -50% and produce a seamless loop. The halfway point lands on the seam
 *   between the two copies, so the reset at 100% is invisible.
 * - Icons come in three flavors:
 *     1. Single-color simple-icons SVGs (.svg) are rendered as CSS masks tinted
 *        via a per-item `--brand-color` custom property.
 *     2. Multi-color brand marks (PNG, JPG or multi-color SVG) are rendered as
 *        raw `<img>` tags.
 *     3. No iconPath: a letter badge (temporary, until a logo is added).
 *   The renderer picks the mode by whether a `color` is set: color -> mask,
 *   no color -> img.
 * - Accessibility: the animated track is aria-hidden because its content is
 *   duplicated and moving. The real semantic list sits in an sr-only <ul> so
 *   screen readers get a clean, deduped enumeration of the tools.
 */

type Tool = {
  name: string
  /** Optional. Leave out until the logo file is in public/icons/. */
  iconPath?: string
  /** When set, the SVG silhouette is tinted via CSS mask. Omit for multi-color marks. */
  color?: string
}

export const tools: Tool[] = [
  { name: 'GoHighLevel',   iconPath: '/icons/gohighlevel.png' },
  { name: 'Make',          iconPath: '/icons/make.svg',        color: '#6D00CC' },
  { name: 'Canva',         iconPath: '/icons/canva.svg' },
  { name: 'CapCut',        iconPath: '/icons/Capcut.svg' },
  { name: 'Hootsuite',     iconPath: '/icons/Hootsuite.svg' },
  { name: 'Buffer',        iconPath: '/icons/buffer.png' },
  { name: 'Zoho',          iconPath: '/icons/zoho.svg',        color: '#E42527' },
  { name: 'Asana',         iconPath: '/icons/asana.svg',       color: '#F06A6A' },
  { name: 'Notion',        iconPath: '/icons/notion.svg',      color: '#000000' },
  { name: 'Slack',         iconPath: '/icons/slack.svg',       color: '#611F69' },
  { name: 'Zoom',          iconPath: '/icons/zoom.svg',        color: '#0B5CFF' },
  { name: 'Loom',          iconPath: '/icons/loom.svg' },
  { name: 'Gmail',         iconPath: '/icons/gmail.svg',       color: '#EA4335' },
  { name: 'Google Drive',  iconPath: '/icons/googledrive.svg', color: '#4285F4' },
  { name: 'NotebookLM',    iconPath: '/icons/notebooklm.svg',  color: '#1A73E8' },
  { name: 'ChatGPT',       iconPath: '/icons/openai.png' },
  { name: 'Claude',        iconPath: '/icons/claude.svg',      color: '#D97757' },
  { name: 'Veo 3',         iconPath: '/icons/veo3.jpg' },
  { name: 'Runway',        iconPath: '/icons/runwayai.jpg' },
  { name: 'Instagram',     iconPath: '/icons/instagram.svg',   color: '#E4405F' },
  { name: 'Facebook',      iconPath: '/icons/facebook.svg',    color: '#0866FF' },
  { name: 'Meta',          iconPath: '/icons/meta.svg' },
  { name: 'Kahoot',        iconPath: '/icons/kahoot.svg',      color: '#46178F' },
  { name: 'GitHub',        iconPath: '/icons/github.svg',      color: '#181717' },
  { name: 'Vercel',        iconPath: '/icons/vercel.svg',      color: '#000000' },
]

export default function ToolsMarquee() {
  // Duplicate the list so the -50% translate lands on a seamless seam.
  // useMemo keeps the doubled array reference-stable across renders.
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => {
          const useMask = !!tool.iconPath && tool.iconPath.endsWith('.svg') && !!tool.color
          return (
            <div key={`${tool.name}-${i}`} className="tools-marquee__item">
              {/* A plain box on desktop (display: contents); on phones it is
                  the rounded app-icon tile - a masked icon cannot carry its
                  own background, so the tile needs its own element. */}
              <span className="tools-marquee__tile">
                {!tool.iconPath ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--navy)',
                    }}
                  >
                    {tool.name.charAt(0)}
                  </span>
                ) : useMask ? (
                  <span
                    className="tools-marquee__icon"
                    style={{
                      ['--icon-url' as string]: `url('${tool.iconPath}')`,
                      ['--brand-color' as string]: tool.color ?? 'var(--navy)',
                    }}
                  />
                ) : (
                  <img
                    className="tools-marquee__img"
                    src={tool.iconPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={20}
                    height={20}
                  />
                )}
              </span>
              <span className="tools-marquee__label">{tool.name}</span>
            </div>
          )
        })}
      </div>

      {/* Real semantic list for screen readers, dedupes the visual loop. */}
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
