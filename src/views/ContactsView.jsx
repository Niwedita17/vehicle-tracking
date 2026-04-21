import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowLeft } from 'lucide-react';

const ContactsView = () => {
  return (
    <div className="view-container" style={{ padding: '2rem' }}>
      <div className="view-header" style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <div>
          <a href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--text-muted)', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </a>
          <h1 className="view-title" style={{ fontSize: '2.8rem', fontWeight: '800', margin: 0 }}>
            Contact Us & About
          </h1>
          <p className="view-subtitle" style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Get in touch with the FleetOps team</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Contact Card */}
        <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem' }}>Support & Queries</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <Phone size={20} />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Phone</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>+91 98765 43210</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <Mail size={20} />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Email</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>support@fleetops.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <MapPin size={20} />
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Address</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>123, Tech Park, Sector 62, Noida, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Card */}
        <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.5rem' }}>About FleetOps</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            FleetOps is a state-of-the-art fleet management platform designed to help businesses track compliance, maintenance, and driver efficiency in real-time.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Our mission is to provide enterprise-grade tools to fleet managers, ensuring safety, reducing downtime, and optimizing costs.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.9rem', cursor: 'pointer' }}>
            <Globe size={16} />
            <span>Visit our website</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactsView;
