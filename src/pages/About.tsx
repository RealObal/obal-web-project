import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import MediaImage from '../components/MediaImage';
import LegalLinks from '../components/LegalLinks';
import { Seo } from '../lib/seo';
import { breadcrumbSchema, personSchema, profilePageSchema } from '../lib/seoData';

const education = [
  { institution: 'Project Management Professional (PMP)', qualification: 'PMP certification', date: 'May 2026', status: 'Completed' },
  { institution: 'Power BI', qualification: 'Power BI certification', date: 'December 2025', status: 'Completed' },
  { institution: 'Gulu University', qualification: 'Postgraduate Diploma in Monitoring & Evaluation (PGDME)', date: '2025', status: 'Graduated' },
  { institution: 'Gulu University', qualification: 'Bachelor of Arts in Education (B.A. Ed) — Geography & Economics', date: '2023', status: 'Graduated' },
  { institution: 'Atlas High School Gayaza', qualification: 'Uganda Advanced Certificate of Education (A level)', date: '2019', status: 'Completed' },
  { institution: "St. Joseph’s College Layibi", qualification: 'Uganda Certificate of Education (O level)', date: '2017', status: 'Completed' },
  { institution: 'Lakwatomer Primary School', qualification: 'Primary Leaving Examination (PLE)', status: 'Completed' },
];

export default function About() {
  return <><SiteHeader/><main id="main" className="container about-page">
    <Seo title="About Ronald Obal | Biography & Education" description="Meet Ronald Obal, a researcher and MEAL practitioner in Uganda. Explore his background, education, PMP and Power BI certifications, and approach to community learning." path="/about" type="profile" jsonLd={[personSchema, {...profilePageSchema, '@id': 'https://www.ronaldobal.com/about#profilepage', url: 'https://www.ronaldobal.com/about', name: 'About Ronald Obal'}, breadcrumbSchema([{name:'Ronald Obal',path:'/'},{name:'About',path:'/about'}])]}/>
    <header className="about-title"><span className="eyebrow">ABOUT</span><h1>Ronald <em>Obal</em></h1><p>Research · Monitoring · Evaluation · Accountability · Learning</p></header>
    <section className="about-biography" aria-labelledby="biography-title">
      <div className="about-prose"><h2 id="biography-title">About Ronald Obal</h2>
        <p>Ronald Obal is a researcher, Monitoring, Evaluation, Accountability and Learning (MEAL) professional, and community development practitioner based in Uganda. His work connects data, community experience, and programme learning to support better decisions across education, child protection, youth development, and public health.</p>
        <p>He graduated from Gulu University with a Bachelor of Arts in Education in Geography and Economics in 2023 and a Postgraduate Diploma in Monitoring &amp; Evaluation in 2025. He completed his Power BI certification in December 2025 and his Project Management Professional (PMP) certification in May 2026.</p>
        <p>His experience at Laminopabo Child and Youth Development Center includes monitoring and evaluation, education access, caregiver engagement, child protection, and community programme support. He brings practical experience in digital data collection, analysis, reporting, and building systems that help programmes learn from their results.</p>
      </div>
      <figure className="about-portrait"><MediaImage src="/field-photo-20.jpeg" alt="Ronald Obal facilitating a training session" fetchPriority="high"/><figcaption>Ronald Obal facilitating training</figcaption></figure>
    </section>
    <section className="about-practice" aria-labelledby="practice-title">
      <MediaImage src="/field-photo-07.jpeg" alt="Facilitating a workshop using visual learning materials" loading="lazy"/>
      <div className="about-prose"><h2 id="practice-title">From evidence to practice</h2><p>Ronald’s interests span programme learning, community development, education, and public health research. His work includes research on community-based MEAL systems in post-conflict Northern Uganda, domestic adoption, and evidence that can inform programme improvement.</p><p>He uses tools including Power BI, Excel, SPSS, and KoboToolbox to organise information, explore patterns, and communicate findings. He is a member of the Uganda Evaluation Association and EvalForward.</p><p className="about-links"><a href="https://linkedin.com/in/ronaldobal" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.researchgate.net/profile/Ronald-Obal" target="_blank" rel="noopener noreferrer">ResearchGate ↗</a><Link to="/publications">Publications →</Link></p></div>
    </section>
    <aside className="about-mission"><span className="eyebrow">MY APPROACH</span><p>Connecting evidence with community experience to support accountable programmes, continuous learning, and better outcomes for people.</p></aside>
    <section className="about-education" aria-labelledby="education-title"><h2 id="education-title">Education</h2><ol>{education.map((item, index)=><li key={item.qualification} style={{gridRow: index + 1}}><h3>{item.institution}</h3><p>{item.qualification}</p>{item.date&&<p className="education-date">{item.date}</p>}<span className="education-status">{item.status}</span></li>)}</ol></section>
    <section className="about-beliefs" aria-labelledby="beliefs-title"><MediaImage src="/field-photo-22.jpeg" alt="A small-group community dialogue" loading="lazy"/><div className="about-prose"><h2 id="beliefs-title">What I Believe!</h2><p>I believe that useful evidence begins with curiosity: asking better questions, listening carefully, and being willing to test our assumptions.</p><p>I believe that dignity matters in every stage of research and evaluation. People’s experiences deserve respect, and the information they share should be used responsibly.</p><p>I believe that collaboration and continuous learning help turn findings into practical improvements. When communities are part of the conversation, programmes can respond more thoughtfully to the realities of people’s lives.</p></div></section>
    <div className="about-connect"><h2>Let’s connect</h2><p>For research collaboration, monitoring and evaluation, or programme learning.</p><a className="button primary" href="mailto:ronaldobal20@gmail.com">Send an email ↗</a></div>
  </main><footer className="container footer"><Link to="/">Ronald Obal · Research &amp; M&amp;E</Link><Link to="/publications">Explore publications →</Link><LegalLinks/></footer></>;
}

