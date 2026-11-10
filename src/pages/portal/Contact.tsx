import { ArrowUpRight } from 'lucide-react';
import InfoPage, { Ext, In } from '../../components/layout/InfoPage';
import { MAYOR_OFFICE_EMAIL } from '../../data/offices';
import { CONTACT_EMAIL, REPO_URL, REPORT_FORM_URL } from '../../data/portal';

export default function Contact() {
  return (
    <InfoPage
      title="Contact Us"
      subtitle="Reach the volunteers behind BetterTaalBatangas.org, or find the right office for official concerns."
      sections={[
        {
          id: 'report',
          title: 'Report an Issue',
          content: (
            <>
              <p>
                Found something wrong or out of date? Tell us through our short
                report form: which page has the problem and what the correct
                information is, with a source if you have one.
              </p>
              {REPORT_FORM_URL ? (
                <p>
                  <a
                    href={REPORT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!no-underline inline-flex items-center gap-2 rounded-lg bg-accent-700 px-5 py-3 font-bold !text-white hover:bg-accent-800"
                  >
                    Open the report form
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                </p>
              ) : (
                <p className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <strong>The report form is coming soon.</strong> Please check
                  back shortly.
                </p>
              )}
              <p>
                Please do not include sensitive personal information such as ID
                numbers. We only need your contact details if you would like a
                reply.
              </p>
            </>
          ),
        },
        ...(CONTACT_EMAIL
          ? [
              {
                id: 'email',
                title: 'Email',
                content: (
                  <p>
                    You can also write to us at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We
                    are volunteers, so replies may take a few days.
                  </p>
                ),
              },
            ]
          : []),
        {
          id: 'official',
          title: 'Official Municipal Concerns',
          content: (
            <>
              <p>
                <strong>
                  We are not the Municipality of Taal and cannot process
                  applications, payments, complaints or requests for documents.
                </strong>{' '}
                For these, please contact the municipal government directly:
              </p>
              <ul>
                <li>
                  Visit the Taal Municipal Hall, Taal, Batangas, during office
                  hours.
                </li>
                <li>
                  Email the Office of the Mayor at{' '}
                  <a href={`mailto:${MAYOR_OFFICE_EMAIL}`}>
                    {MAYOR_OFFICE_EMAIL}
                  </a>
                  .
                </li>
                <li>
                  Find the email of a specific office in the{' '}
                  <In to="/government/offices">Government Directory</In>.
                </li>
                <li>
                  For emergencies, see the <In to="/taal/hotlines">Hotlines</In>{' '}
                  page.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'contribute',
          title: 'Volunteer With Us',
          content: (
            <p>
              Want to help keep this site accurate and useful? The project is
              open source on <Ext href={REPO_URL}>GitHub</Ext>. You can suggest
              changes, fix content, translate pages to Filipino or help with
              design and code.
            </p>
          ),
        },
      ]}
    />
  );
}
