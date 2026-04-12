import React, { useState } from 'react';
import { Phone, Lock, Truck, ArrowRight, RefreshCw } from 'lucide-react';

const AuthView = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    // Simulate sending OTP
    setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      alert('Please enter complete OTP');
      return;
    }
    
    // Mock verification
    if (enteredOtp === '123456') {
      if (isLogin) {
        onLoginSuccess({
          name: 'Fleet Manager',
          company: 'Logistics Corp',
          phone: phone
        });
      } else {
        alert('You are registered successfully! Please login to continue.');
        setIsLogin(true);
        resetFlow();
      }
    } else {
      alert('Invalid OTP. Try 123456');
    }
  };

  const resetFlow = () => {
    setStep(1);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="auth-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
      fontFamily: 'var(--font-family)',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background blobs */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'var(--accent-primary)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        top: '-50px',
        left: '-50px',
        opacity: 0.3
      }}></div>
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'var(--status-danger)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        bottom: '-50px',
        right: '-50px',
        opacity: 0.2
      }}></div>

      <div className="auth-card" style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            background: 'rgba(79, 70, 229, 0.2)',
            borderRadius: '12px',
            marginBottom: '16px',
            color: 'var(--accent-primary)'
          }}>
            <Truck size={32} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            FleetOps Portal
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
            {isLogin ? 'Welcome back! Please login to continue.' : 'Create an account to manage your fleet.'}
          </p>
        </div>

        <div className="auth-tabs" style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={() => { setIsLogin(true); resetFlow(); }}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: isLogin ? '2px solid var(--accent-primary)' : 'none',
              color: isLogin ? '#ffffff' : 'rgba(255,255,255,0.6)',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); resetFlow(); }}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: !isLogin ? '2px solid var(--accent-primary)' : 'none',
              color: !isLogin ? '#ffffff' : 'rgba(255,255,255,0.6)',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleGetOtp}>
            {!isLogin && (
              <>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    required={!isLogin}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Company Name</label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter company name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit mobile number"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 36px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Get OTP <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="form-group" style={{ marginBottom: '24px', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '16px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                Enter 6-Digit OTP sent to {phone}
              </label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {otp.map((data, index) => {
                  return (
                    <input
                      className="otp-field"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={e => handleOtpChange(e.target, index)}
                      onFocus={e => e.target.select()}
                      style={{
                        width: '40px',
                        height: '45px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <button 
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              Verify & {isLogin ? 'Login' : 'Register'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button 
                type="button"
                onClick={resetFlow}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={14} /> Change Phone Number
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthView;
