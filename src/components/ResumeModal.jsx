const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Function to handle download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1Ui3qs54M5grRtzQpa6vCScuogV2B7rIQ';
    link.setAttribute('download', 'Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '16px',
      boxSizing: 'border-box',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
    }} onClick={onClose}>
      
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          color: '#666',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s',
        }} onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
           onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
          ×
        </button>
        
        {/* Header */}
        <div style={{
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '15px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#2c3e50',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600'
          }}>
            My Resume
          </h2>
        </div>
        
        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center'
        }}>
          
          {/* Resume Icon */}
          <div style={{
            width: '100px',
            height: '130px',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            transition: 'transform 0.2s, border-color 0.2s',
          }} onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.borderColor = '#4285f4';
          }} onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.borderColor = '#ccc';
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📄</div>
            <div style={{ fontSize: '12px', textAlign: 'center', color: '#666' }}>
              Resume.pdf
            </div>
          </div>
          
          {/* Description */}
          <p style={{ 
            margin: 0, 
            color: '#666', 
            textAlign: 'center',
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            lineHeight: '1.5'
          }}>
            Click below to view or download my resume
          </p>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            width: '100%'
          }}>
            <a 
              href="https://drive.google.com/file/d/1Ui3qs54M5grRtzQpa6vCScuogV2B7rIQ/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                padding: '12px 24px',
                backgroundColor: '#4285f4',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                display: 'inline-block',
                textAlign: 'center',
                flex: '1',
                minWidth: '140px',
                transition: 'background-color 0.2s, transform 0.2s',
                boxShadow: '0 2px 5px rgba(66, 133, 244, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3367d6';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#4285f4';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              View Resume
            </a>
            
            <button 
              onClick={handleDownload}
              style={{
                padding: '12px 24px',
                backgroundColor: '#34a853',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                flex: '1',
                minWidth: '140px',
                transition: 'background-color 0.2s, transform 0.2s',
                boxShadow: '0 2px 5px rgba(52, 168, 83, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2e8b47';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#34a853';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ 
          marginTop: '24px', 
          fontSize: '14px', 
          color: '#777', 
          textAlign: 'center',
          lineHeight: '1.5',
          paddingTop: '15px',
          borderTop: '1px solid #eee'
        }}>
          <p>This resume showcases my skills, experience, and projects.</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;