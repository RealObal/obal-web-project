import { ShieldCheck, HeartHandshake, BarChart3, TrendingUp, Users, FlaskConical, Globe, FileText } from 'lucide-react';

const interests = [
  { title: 'Child Protection', icon: ShieldCheck, priority: true },
  { title: 'Gender-Based Violence (GBV)', icon: HeartHandshake, priority: true },
  { title: 'MEAL Systems', icon: BarChart3 },
  { title: 'Impact Evaluation', icon: TrendingUp },
  { title: 'Capacity Building', icon: Users },
  { title: 'Implementation Research', icon: FlaskConical },
  { title: 'Community Development', icon: Globe },
  { title: 'Evidence Synthesis', icon: FileText },
];

export default function ProfessionalInterests() {
  return <section id="professional-interests" className="professional-interests container" aria-labelledby="interests-title">
    <div className="interests-heading">
      <span className="eyebrow">AREAS OF FOCUS</span>
      <h2 id="interests-title">Professional <em>Interests</em></h2>
      <p>Child protection and gender-based violence are central to my professional interests, alongside evidence, learning, and community development.</p>
    </div>
    <ul className="interests-grid">{interests.map(({title, icon: Icon, priority}) =>
      <li className={`interest-card${priority ? ' interest-priority' : ''}`} key={title}>
        <Icon size={34} strokeWidth={1.6} aria-hidden="true"/>
        <h3>{title}</h3>
        {priority && <span className="interest-label">Priority focus</span>}
      </li>
    )}</ul>
  </section>;
}

