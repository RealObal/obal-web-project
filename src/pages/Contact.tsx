import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ContactForm as ContactFormType } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again or contact me directly via email.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Let's discuss how I can support your organization with MEAL systems, evaluations, or capacity building.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0A2A43] mb-6">Contact Information</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#C9A227]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2A43] mb-1">Email</h3>
                    <a href="mailto:ronaldobal20@gmail.com" className="text-gray-600 hover:text-[#C9A227] transition-colors">
                      ronaldobal20@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#C9A227]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2A43] mb-1">Phone</h3>
                    <a href="tel:+256776280494" className="text-gray-600 hover:text-[#C9A227] transition-colors">
                      +256 776 280 494
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#C9A227]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2A43] mb-1">Location</h3>
                    <p className="text-gray-600">Gulu & Kampala, Uganda</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="text-[#C9A227]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A2A43] mb-1">LinkedIn</h3>
                    <a href="https://linkedin.com/in/ronaldobal" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#C9A227] transition-colors">
                      linkedin.com/in/ronaldobal
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-[#0A2A43] mb-3">Languages</h3>
                <div className="flex space-x-4">
                  <span className="px-4 py-2 bg-white rounded-lg text-gray-700 font-medium">English</span>
                  <span className="px-4 py-2 bg-white rounded-lg text-gray-700 font-medium">Luo</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0A2A43] mb-6">Send a Message</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-green-800 font-semibold">Message sent successfully!</p>
                    <p className="text-green-700 text-sm">I'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#0A2A43] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#0A2A43] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#0A2A43] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                    placeholder="+256 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0A2A43] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent resize-none"
                    placeholder="Tell me about your MEAL needs or project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#0A2A43] to-[#0A2A43]/90 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Available for Consultancy & Collaboration</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Currently based in Gulu and Kampala, with flexibility for remote work and field assignments across Uganda and the region.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
