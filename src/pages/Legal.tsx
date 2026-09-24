import { isSupabaseConfigured } from '../lib/supabase';
import SiteHeader from '../components/SiteHeader';
import LegalLinks from '../components/LegalLinks';
import { Seo } from '../lib/seo';

export default function Legal({kind}: {kind: 'privacy' | 'terms'}) {
  const privacy = kind === 'privacy';
  const title = privacy ? 'Privacy & cookies' : 'Terms of use';
  return <><SiteHeader/><main id="main" className="container collection-page legal-page">
    <Seo title={`${title} | Ronald Obal`} description={privacy ? 'How enquiries and website information are handled, and how to contact Ronald Obal about privacy.' : 'Conditions for using Ronald Obal’s portfolio, research links, and website content.'} path={`/${kind}`}/>
    <h1>{title}</h1><p>Effective 24 September 2026.</p>
    {privacy ? <>
      <h2>Who to contact</h2><p>Ronald Obal is responsible for enquiries submitted through this portfolio. Contact <a href="mailto:ronaldobal20@gmail.com">ronaldobal20@gmail.com</a> about your personal information or this notice.</p>
      <h2>Information you provide</h2><p>An enquiry may include your name, email address, optional phone number, and message. It is used to respond to your request and related follow-up, not to subscribe you to marketing. Please do not submit sensitive health information, child-protection case details, or information identifying survivors of violence.</p>
      <h2>Your choice and consent</h2><p>Where the online form is enabled, it asks for permission to use your details to respond. You can withdraw that permission by email; withdrawal does not affect processing already carried out. You may also contact Ronald directly by email instead of using the form.</p>
      <h2>Service providers and security</h2><p>The site is designed for hosting on Vercel, with public articles and images provided through Sanity. If enabled, enquiry storage uses Supabase. These services may process connection information such as IP addresses and operate outside Uganda. {isSupabaseConfigured ? 'Online enquiries are stored with restricted access for responding to your request.' : 'The online form is currently unavailable; you can contact Ronald by email.'} The form uses a short-lived, pseudonymous network identifier for abuse prevention; it does not store the raw IP address in enquiry records.</p>
      <h2>Retention</h2><p>Enquiries are retained for 90 days after submission and then deleted. Online records are checked for expiry by a daily deletion job. Pseudonymous abuse-prevention identifiers are removed after two days. Contact Ronald if you wish to request earlier deletion or have questions about email correspondence.</p>
      <h2>Your rights</h2><p>You may request access, correction, or deletion of your information, or raise concerns about its use. Requests may require proportionate identity verification. You may also contact Uganda’s <a href="https://pdpo.go.ug/" target="_blank" rel="noopener noreferrer">Personal Data Protection Office</a>.</p>
      <h2>Cookies and storage</h2><p>This version of the site does not include advertising trackers or optional analytics cookies. Public fonts are hosted with the site. Hosting and security services may process technical logs. If optional tracking is introduced, this notice and the consent controls must be updated before that tracking runs.</p>
      <h2>Photos and external links</h2><p>Contact Ronald if you have a concern about a photograph or would like to request its removal. External research and social-media links are governed by the destination service’s privacy practices.</p>
    </> : <>
      <h2>Purpose of this website</h2><p>This portfolio presents professional interests, experience, research, and publications. Material is provided for general information, not individual medical, legal, safeguarding, or other professional advice.</p>
      <h2>Research and attribution</h2><p>Publication links lead to the authoritative publisher or repository. Check the source for corrections, current versions, and licence terms. Preprints, protocols, and planned projects are labelled separately from published research.</p>
      <h2>Permitted use</h2><p>You may read and link to public pages. Reuse of text, photographs, or publications must respect the applicable copyright and licence. Do not assume that public availability grants permission to republish photographs of people.</p>
      <h2>Enquiries and services</h2><p>Sending an enquiry does not create a service agreement. Any professional engagement requires separately agreed scope and terms. Do not submit unlawful material or confidential information about other people without appropriate authority.</p>
      <h2>External resources and corrections</h2><p>External sites are operated independently. If you identify an error or an accessibility problem, contact <a href="mailto:ronaldobal20@gmail.com">ronaldobal20@gmail.com</a>. Nothing in these terms excludes rights or responsibilities that cannot lawfully be excluded.</p>
    </>}
  </main><footer className="container footer"><LegalLinks/></footer></>;
}
