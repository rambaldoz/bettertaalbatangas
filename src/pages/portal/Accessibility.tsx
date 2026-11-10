import InfoPage, { In } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED } from '../../data/portal';

export default function Accessibility() {
  return (
    <InfoPage
      title="Accessibility Statement"
      subtitle="Government information should be usable by everyone in Taal, including seniors and people with disabilities."
      updated={POLICIES_UPDATED}
      sections={[
        {
          id: 'commitment',
          title: 'Our Commitment',
          content: (
            <p>
              We aim for BetterTaalBatangas.org to meet the Web Content
              Accessibility Guidelines (WCAG) 2.1 at Level AA. We check pages as
              we build them and fix problems as we find them.
            </p>
          ),
        },
        {
          id: 'features',
          title: 'What We Do',
          content: (
            <ul>
              <li>
                <strong>Readable text:</strong> body text is at least 14 pixels,
                and text and background colors meet WCAG AA contrast.
              </li>
              <li>
                <strong>Plain language:</strong> steps, requirements and fees
                are written simply and laid out one item per line.
              </li>
              <li>
                <strong>Keyboard friendly:</strong> menus, links and buttons can
                be used without a mouse, with a visible focus outline.
              </li>
              <li>
                <strong>Screen reader support:</strong> pages use proper
                headings, labels and text alternatives for icons and images.
              </li>
              <li>
                <strong>Any screen size:</strong> every page works on phones,
                tablets and computers, and with browser zoom.
              </li>
              <li>
                <strong>Two languages:</strong> menus and many labels are
                available in Filipino.
              </li>
              <li>
                <strong>Light pages:</strong> no autoplaying media and no heavy
                downloads, so pages load on slow connections.
              </li>
            </ul>
          ),
        },
        {
          id: 'limitations',
          title: 'Known Limitations',
          content: (
            <ul>
              <li>
                Some documents we link to, such as the Citizen&rsquo;s Charter,
                are scanned PDFs published by the municipality and may not work
                with screen readers.
              </li>
              <li>
                The Filipino translation is not complete yet. Some pages are in
                English only.
              </li>
              <li>
                Content from other services, such as weather and exchange rates,
                depends on those providers.
              </li>
            </ul>
          ),
        },
        {
          id: 'alternative',
          title: 'Alternative Access',
          content: (
            <p>
              If you cannot use part of this site, the same information is
              available from the office concerned at the Taal Municipal Hall.
              Office emails are listed in the{' '}
              <In to="/government/offices">Government Directory</In>.
            </p>
          ),
        },
        {
          id: 'feedback',
          title: 'Feedback',
          content: (
            <p>
              If something is hard to read or use, please tell us through the{' '}
              <In to="/contact">Contact Us</In> page. Include the page and what
              went wrong, and we will work on a fix.
            </p>
          ),
        },
      ]}
    />
  );
}
