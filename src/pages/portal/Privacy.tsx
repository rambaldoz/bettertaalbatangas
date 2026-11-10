import InfoPage, { Ext, In } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED } from '../../data/portal';

export default function Privacy() {
  return (
    <InfoPage
      title="Privacy Policy"
      subtitle="We collect as little as possible. Here is exactly what happens when you use BetterTaalBatangas.org."
      updated={POLICIES_UPDATED}
      sections={[
        {
          id: 'introduction',
          title: 'Introduction',
          content: (
            <p>
              BetterTaalBatangas.org is a volunteer-run information portal. We
              respect your privacy and follow the principles of the Data Privacy
              Act of 2012 (Republic Act No. 10173): collect only what is needed,
              use it only for a clear purpose and keep it safe.
            </p>
          ),
        },
        {
          id: 'approach',
          title: 'Our Approach',
          content: (
            <ul>
              <li>No accounts, sign-ups or log-ins.</li>
              <li>No forms that collect personal information.</li>
              <li>No analytics, advertising or tracking cookies.</li>
              <li>We never sell or rent information about our visitors.</li>
            </ul>
          ),
        },
        {
          id: 'collected',
          title: 'Information That Is Processed',
          content: (
            <>
              <p>
                <strong>On your device.</strong> If you change the language,
                your choice is saved in your browser&rsquo;s local storage so
                the site remembers it. It never leaves your device, and you can
                clear it in your browser settings.
              </p>
              <p>
                <strong>By our hosting provider.</strong> Like any website, the
                server that delivers our pages may record basic technical data,
                such as your IP address, browser type and the pages requested,
                for security and to keep the site running.
              </p>
              <p>
                <strong>By services that supply content.</strong> To show fonts,
                weather and exchange rates, your browser loads data from Google
                Fonts, Open-Meteo and the BetterGov.ph API. These services
                receive your IP address as part of the request and handle it
                under their own privacy policies.
              </p>
            </>
          ),
        },
        {
          id: 'contact-us',
          title: 'When You Contact Us',
          content: (
            <p>
              If you use our report form, your answers are collected through
              Google Forms and handled under Google&rsquo;s privacy policy. Only
              the volunteers who maintain the portal can see them. We use what
              you send only to correct and improve the portal. If you email us,
              we use your message and address only to reply and to improve the
              portal, and we do not share them. Please do not send sensitive
              personal information.
            </p>
          ),
        },
        {
          id: 'cookies',
          title: 'Cookies',
          content: (
            <p>
              We do not set cookies. The only thing we store is the language
              preference described above.
            </p>
          ),
        },
        {
          id: 'security',
          title: 'Data Security',
          content: (
            <p>
              The portal is a static website served over HTTPS. Because we do
              not keep a database of visitor information, there is very little
              personal data to protect or to lose.
            </p>
          ),
        },
        {
          id: 'rights',
          title: 'Your Rights',
          content: (
            <>
              <p>
                Under the Data Privacy Act, you have the right to be informed,
                to access, to correct and to erase your personal data, and to
                object to its processing. To exercise these rights for any
                message you sent us, see the <In to="/contact">Contact Us</In>{' '}
                page.
              </p>
              <p>
                You may also file a complaint with the{' '}
                <Ext href="https://privacy.gov.ph">
                  National Privacy Commission
                </Ext>
                .
              </p>
            </>
          ),
        },
        {
          id: 'children',
          title: "Children's Privacy",
          content: (
            <p>
              The portal is for the general public and does not knowingly
              collect information from children.
            </p>
          ),
        },
        {
          id: 'third-party',
          title: 'Third-Party Links',
          content: (
            <p>
              We link to government and other websites. Their privacy practices
              are their own, so please review their policies.
            </p>
          ),
        },
        {
          id: 'changes',
          title: 'Changes to This Policy',
          content: (
            <p>
              If our practices change, for example if we ever add analytics, we
              will update this page first. The date below shows the latest
              version.
            </p>
          ),
        },
      ]}
    />
  );
}
