import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { X_URL, LINKEDIN_URL } from '../lib/seoData';

interface AuthorBioProps {
  authorName?: string;
  variant?: 'default' | 'compact';
}

export function AuthorBio({ authorName = 'Ronald Obal', variant = 'default' }: AuthorBioProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-[#C9A227]/10 to-transparent rounded-lg p-4 border border-[#C9A227]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#C9A227] text-[#0A2A43] flex items-center justify-center font-bold text-lg flex-shrink-0">
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#0A2A43] text-sm">
              <Link to="/about" className="hover:text-[#C9A227] transition-colors">
                {authorName}
              </Link>
            </p>
            <p className="text-xs text-gray-500">MEAL Manager & MEARL Specialist</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Gradient header */}
      <div className="h-24 bg-gradient-to-r from-[#0A2A43] to-[#0A2A43]/80" />

      {/* Content */}
      <div className="px-6 sm:px-8 py-8">
        {/* Author card */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Avatar */}
          <Link
            to="/about"
            className="flex-shrink-0 -mt-16 group"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A227] to-[#C9A227]/80 text-[#0A2A43] flex items-center justify-center font-bold text-3xl shadow-lg group-hover:shadow-xl transition-shadow">
              R
            </div>
          </Link>

          {/* Info */}
          <div className="flex-1 pt-4">
            <h3 className="text-xl font-bold text-[#0A2A43] mb-1">
              <Link to="/about" className="hover:text-[#C9A227] transition-colors">
                {authorName}
              </Link>
            </h3>
            <p className="text-[#C9A227] font-semibold text-sm mb-3">MEAL Manager & MEARL Specialist</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Ronald Obal is a Monitoring, Evaluation, Accountability, Research and Learning professional focused on evidence systems for social impact programs in Uganda. With experience across mental health, child protection, education, and community development sectors.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0A2A43] hover:bg-[#C9A227] hover:text-[#0A2A43] rounded-lg transition-colors"
              >
                Follow on X <ExternalLink size={12} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0A2A43] hover:bg-[#C9A227] hover:text-[#0A2A43] rounded-lg transition-colors"
              >
                Connect on LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Internal navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/about"
            className="flex flex-col p-4 rounded-lg bg-[#f7f5f0] hover:bg-[#C9A227]/10 transition-colors border border-gray-100 hover:border-[#C9A227]/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-1">Learn More</span>
            <span className="font-semibold text-[#0A2A43] text-sm">About Ronald</span>
          </Link>
          <Link
            to="/services"
            className="flex flex-col p-4 rounded-lg bg-[#f7f5f0] hover:bg-[#C9A227]/10 transition-colors border border-gray-100 hover:border-[#C9A227]/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-1">Services</span>
            <span className="font-semibold text-[#0A2A43] text-sm">MEAL Consulting</span>
          </Link>
          <Link
            to="/portfolio"
            className="flex flex-col p-4 rounded-lg bg-[#f7f5f0] hover:bg-[#C9A227]/10 transition-colors border border-gray-100 hover:border-[#C9A227]/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-1">Portfolio</span>
            <span className="font-semibold text-[#0A2A43] text-sm">Experience & Work</span>
          </Link>
          <Link
            to="/contact"
            className="flex flex-col p-4 rounded-lg bg-[#f7f5f0] hover:bg-[#C9A227]/10 transition-colors border border-gray-100 hover:border-[#C9A227]/30"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-1">Get in Touch</span>
            <span className="font-semibold text-[#0A2A43] text-sm">Contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
