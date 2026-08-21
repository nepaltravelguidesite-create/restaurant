import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Loader2, AlertCircle, Calendar, Clock, Users } from 'lucide-react';
import { supabase, NewReservation } from '@/lib/supabase';

const timeSlots = [
  '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '17:30', '18:00', '18:30', '19:00',
  '19:30', '20:00', '20:30',
];

const occasions = ['Casual dining', 'Birthday', 'Anniversary', 'Business', 'Family gathering', 'Other'];

export default function ReservationForm() {
  const [form, setForm] = useState<NewReservation>({
    name: '', email: '', phone: '', party_size: 2,
    reservation_date: '', reservation_time: '18:00', occasion: 'Casual dining', notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const update = (field: keyof NewReservation, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('reservations').insert([form]);
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong on our end. Please try again or call us.');
      return;
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="reservation-success" ref={successRef}>
        <div className="success-icon"><Check size={36} strokeWidth={2.5} /></div>
        <h3>Reservation received</h3>
        <p>
          Dhanyabad, {form.name.split(' ')[0]}. We've received your request for{' '}
          <strong>{form.party_size} {form.party_size === 1 ? 'guest' : 'guests'}</strong> on{' '}
          <strong>{new Date(form.reservation_date + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>{' '}
          at <strong>{form.reservation_time}</strong>.
        </p>
        <p className="success-note">We'll confirm your booking at {form.email} shortly. Namaste.</p>
        <button className="btn btn-primary" onClick={() => {
          setStatus('idle');
          setForm({ name: '', email: '', phone: '', party_size: 2, reservation_date: '', reservation_time: '18:00', occasion: 'Casual dining', notes: '' });
        }}>Make another reservation <ArrowUpRight size={14} /></button>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className="form-error"><AlertCircle size={16} /> {errorMsg}</div>
      )}
      <div className="form-row">
        <label>
          <span>Full name</span>
          <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
        </label>
        <label>
          <span>Email address</span>
          <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Phone number</span>
          <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+977 ..." />
        </label>
        <label>
          <span><Users size={13} /> Party size</span>
          <select value={form.party_size} onChange={(e) => update('party_size', parseInt(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          <span><Calendar size={13} /> Date</span>
          <input type="date" required min={new Date().toISOString().split('T')[0]} value={form.reservation_date} onChange={(e) => update('reservation_date', e.target.value)} />
        </label>
        <label>
          <span><Clock size={13} /> Time</span>
          <select value={form.reservation_time} onChange={(e) => update('reservation_time', e.target.value)}>
            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label className="full-width">
        <span>Occasion</span>
        <select value={form.occasion} onChange={(e) => update('occasion', e.target.value)}>
          {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
      <label className="full-width">
        <span>Special requests</span>
        <textarea rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Dietary needs, seating preferences, allergies..." />
      </label>
      <button className="btn btn-primary btn-full" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (<><Loader2 size={16} className="spin" /> Sending request...</>) : (<>Request reservation <ArrowUpRight size={16} /></>)}
      </button>
    </form>
  );
}
