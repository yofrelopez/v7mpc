/**
 * OpenGraph Image Templates
 * Reusable components and styles for consistent OG image generation
 */

export const OGConfig = {
  size: {
    width: 1200,
    height: 630,
  },
  runtime: 'edge' as const,
  contentType: 'image/jpeg' as const,
};

export const brandColors = {
  slate: {
    dark: '#1e293b',
    medium: '#334155',
    light: '#475569',
  },
  blue: 'rgba(59, 130, 246, 0.9)',
  emerald: 'rgba(16, 185, 129, 0.9)',
  amber: 'rgba(245, 158, 11, 0.9)',
  purple: 'rgba(168, 85, 247, 0.9)',
};

interface BaseOGLayoutProps {
  title: string;
  subtitle?: string;
  badges?: string[];
  brandName?: string;
}

/**
 * Base OG Image Layout
 * Professional gradient background with V7MPC branding
 */
export function BaseOGLayout({ 
  title, 
  subtitle, 
  badges = [],
  brandName = 'V7MPC'
}: BaseOGLayoutProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: brandColors.slate.dark,
        background: `linear-gradient(135deg, ${brandColors.slate.dark} 0%, ${brandColors.slate.medium} 50%, ${brandColors.slate.light} 100%)`,
        color: 'white',
        position: 'relative',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
        }}
      />
      
      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Brand Name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#f1f5f9',
            letterSpacing: '0.05em',
          }}
        >
          {brandName}
        </div>
        
        {/* Page Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: subtitle ? 30 : 40,
            lineHeight: 1.2,
            maxWidth: '900px',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </div>
        
        {/* Subtitle (optional) */}
        {subtitle && (
          <div
            style={{
              fontSize: 32,
              fontWeight: '500',
              marginBottom: 40,
              lineHeight: 1.3,
              maxWidth: '800px',
              color: '#cbd5e1',
            }}
          >
            {subtitle}
          </div>
        )}
        
        {/* Badges (optional) */}
        {badges.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '900px',
            }}
          >
            {badges.map((badge, index) => {
              const colors = [brandColors.blue, brandColors.emerald, brandColors.amber, brandColors.purple];
              const bgColor = colors[index % colors.length];
              
              return (
                <div
                  key={badge}
                  style={{
                    backgroundColor: bgColor,
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: 20,
                    color: '#ffffff',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {badge}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '3px solid rgba(59, 130, 246, 0.3)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '2px solid rgba(168, 85, 247, 0.3)',
        }}
      />
    </div>
  );
}
