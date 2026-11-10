import InfoPage, { Ext, In } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED, REPO_URL } from '../../data/portal';

export default function Terms() {
  return (
    <InfoPage
      title="Terms of Use"
      subtitle="The rules for using BetterTaalBatangas.org, a volunteer-run civic portal."
      updated={POLICIES_UPDATED}
      sections={[
        {
          id: 'introduction',
          title: 'Introduction',
          content: (
            <p>
              BetterTaalBatangas.org (&ldquo;the portal&rdquo;,
              &ldquo;we&rdquo;) is a free, community-run website that explains
              the services and offices of the Municipality of Taal, Batangas.
              These terms apply to everyone who uses it.
            </p>
          ),
        },
        {
          id: 'acceptance',
          title: 'Acceptance of Terms',
          content: (
            <p>
              By using the portal, you agree to these terms. If you do not
              agree, please do not use the portal.
            </p>
          ),
        },
        {
          id: 'not-official',
          title: 'Not an Official Government Website',
          content: (
            <p>
              The portal is run by independent volunteers. It is not owned,
              operated or endorsed by the Municipality of Taal, the Province of
              Batangas or any government agency. Nothing on the portal is an
              official government statement, notice or decision.
            </p>
          ),
        },
        {
          id: 'content',
          title: 'Content and License',
          content: (
            <>
              <p>
                Content we write is dedicated to the public domain unless
                otherwise stated. You may copy, share and reuse it freely.
              </p>
              <p>
                Some content, such as photos and quoted material, belongs to
                others and is credited where it appears. Those works remain
                under their owners&rsquo; terms. The source code is available on{' '}
                <Ext href={REPO_URL}>GitHub</Ext> under its stated license.
              </p>
            </>
          ),
        },
        {
          id: 'as-is',
          title: '"As Is" Disclaimer',
          content: (
            <p>
              We work to keep the portal accurate, but it is provided &ldquo;as
              is&rdquo;, without warranties of any kind. Fees, requirements,
              schedules and officials can change without notice. Always confirm
              important details with the office concerned before acting on them.
            </p>
          ),
        },
        {
          id: 'liability',
          title: 'Limitation of Liability',
          content: (
            <p>
              To the extent allowed by law, the volunteers behind the portal are
              not liable for any loss or damage arising from your use of, or
              reliance on, the portal or the sites it links to.
            </p>
          ),
        },
        {
          id: 'responsibilities',
          title: 'Your Responsibilities',
          content: (
            <ul>
              <li>Use the portal lawfully and in good faith.</li>
              <li>
                Do not try to disrupt, overload or gain unauthorized access to
                the portal.
              </li>
              <li>
                Do not present the portal&rsquo;s content as an official
                government statement.
              </li>
              <li>
                When reporting errors, share accurate information and do not
                post anyone&rsquo;s personal data.
              </li>
            </ul>
          ),
        },
        {
          id: 'no-advice',
          title: 'No Professional Advice',
          content: (
            <p>
              The portal gives general information only. It is not legal,
              financial, medical or other professional advice. For advice on
              your situation, consult a qualified professional or the office
              concerned.
            </p>
          ),
        },
        {
          id: 'links',
          title: 'External Links',
          content: (
            <p>
              The portal links to government websites, data sources and other
              sites we do not control. We are not responsible for their content,
              availability or privacy practices.
            </p>
          ),
        },
        {
          id: 'availability',
          title: 'Availability',
          content: (
            <p>
              As a volunteer project, the portal may be changed, paused or
              discontinued at any time without notice.
            </p>
          ),
        },
        {
          id: 'changes',
          title: 'Changes to These Terms',
          content: (
            <p>
              We may update these terms. The date at the bottom of this page
              shows the latest version. Continuing to use the portal means you
              accept the updated terms.
            </p>
          ),
        },
        {
          id: 'law',
          title: 'Governing Law',
          content: (
            <p>These terms are governed by the laws of the Philippines.</p>
          ),
        },
        {
          id: 'contact',
          title: 'Contact',
          content: (
            <p>
              Questions about these terms? See the{' '}
              <In to="/contact">Contact Us</In> page.
            </p>
          ),
        },
      ]}
    />
  );
}
