import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface BookConsultationPageProps {
  onNavigate: (view: string) => void;
}

export const BookConsultationPage: React.FC<BookConsultationPageProps> = ({ onNavigate }) => {
  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    organization: '',
    serviceCategory: 'Architectural & Engineering Coordination (RA 9266)',
    format: 'Virtual Technical Video Conference',
    date: '2025-06-20',
    time: '10:00 AM (PST)',
    notes: '',
  });

  const [bookingResult, setBookingResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.clientName || !bookingData.clientEmail) return;

    setLoading(true);
    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      setBookingResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
            <Calendar className="w-4 h-4" />
            <span>Direct Technical Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
            Book a Technical Consultation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Schedule a dedicated session with our project engineering desk for project appraisals, site evaluation, and commercial structuring.
          </p>
        </div>

        <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {bookingResult ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#237A3B]/20 border-2 border-[#237A3B] flex items-center justify-center text-[#237A3B] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-bold text-white">Consultation Reserved</h2>
              <div className="bg-[#051322] border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="text-[#C6922D] font-bold">{bookingResult.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white truncate max-w-[200px]">{bookingData.serviceCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheduled:</span>
                  <span className="text-white">{bookingData.date} @ {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Format:</span>
                  <span className="text-emerald-400">{bookingData.format}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Calendar invitation and meeting credentials have been dispatched to {bookingData.clientEmail}.
              </p>
              <button
                onClick={() => setBookingResult(null)}
                className="px-5 py-2.5 bg-[#C6922D] text-[#071A2F] font-bold text-xs uppercase rounded-lg"
              >
                Schedule Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.clientName}
                    onChange={(e) => setBookingData({ ...bookingData, clientName: e.target.value })}
                    placeholder="Engr. / Arch. / Mr. / Ms."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={bookingData.organization}
                    onChange={(e) => setBookingData({ ...bookingData, organization: e.target.value })}
                    placeholder="Development Corp."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.clientEmail}
                    onChange={(e) => setBookingData({ ...bookingData, clientEmail: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.clientPhone}
                    onChange={(e) => setBookingData({ ...bookingData, clientPhone: e.target.value })}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Advisory Category
                </label>
                <select
                  value={bookingData.serviceCategory}
                  onChange={(e) => setBookingData({ ...bookingData, serviceCategory: e.target.value })}
                  className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Architectural & Engineering Coordination (RA 9266)">Architectural & Engineering Coordination (RA 9266)</option>
                  <option value="Civil Construction & Structural Framing">Civil Construction & Structural Framing</option>
                  <option value="Green & Renewable Energy Systems (RA 9513)">Green & Renewable Energy Systems (RA 9513)</option>
                  <option value="Agro-Industrial Cold Chain & Farm Planning">Agro-Industrial Cold Chain & Farm Planning</option>
                  <option value="Smart Infrastructure & BIM Integration">Smart Infrastructure & BIM Integration</option>
                  <option value="General Project Intake & Procurement">General Project Intake & Procurement</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Consultation Format
                  </label>
                  <select
                    value={bookingData.format}
                    onChange={(e) => setBookingData({ ...bookingData, format: e.target.value })}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Virtual Technical Video Conference">Virtual Video Conference</option>
                    <option value="In-Person at Angeles City HQ">In-Person at Angeles City HQ</option>
                    <option value="Prospective Site Visit">Prospective Site Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="09:00 AM (PST)">09:00 AM (PST)</option>
                    <option value="10:30 AM (PST)">10:30 AM (PST)</option>
                    <option value="02:00 PM (PST)">02:00 PM (PST)</option>
                    <option value="03:30 PM (PST)">03:30 PM (PST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Notes or Discussion Agenda
                </label>
                <textarea
                  rows={3}
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Outline your location, land area, or preliminary questions..."
                  className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-50 text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                {loading ? 'Reserving...' : 'Confirm Technical Consultation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
