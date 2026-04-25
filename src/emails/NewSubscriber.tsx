import React from 'react';

const styles = {
    body: {
        backgroundColor: '#faf5ff', // Purple-50
        fontFamily: '"Outfit", "Inter", sans-serif',
        margin: 0,
        padding: 0,
        width: '100%',
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        border: '1px solid #f3e8ff', // Purple-100
        borderRadius: '16px',
        marginTop: '40px',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    header: {
        position: 'relative' as const,
        height: '160px',
        backgroundImage: 'linear-gradient(135deg, #a855f7, #ec4899)', // Purple to Pink
        padding: '0',
        textAlign: 'center' as const,
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '4px solid #ffffff',
        position: 'absolute' as const,
        bottom: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#f3e8ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
    },
    content: {
        padding: '60px 40px 40px',
        textAlign: 'center' as const,
    },
    heading: {
        fontSize: '28px',
        lineHeight: '34px',
        color: '#1f2937',
        margin: '0 0 12px',
        fontWeight: 800,
    },
    subheading: {
        fontSize: '18px',
        color: '#9333ea', // Purple-600
        fontWeight: 600,
        marginBottom: '24px',
    },
    text: {
        fontSize: '16px',
        lineHeight: '26px',
        color: '#4b5563',
        margin: '0 0 32px',
    },
    statGrid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '32px',
    },
    statBox: {
        backgroundColor: '#fdf4ff', // Fuchsia-50
        padding: '16px',
        borderRadius: '12px',
        minWidth: '100px',
    },
    statValue: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#db2777', // Pink-600
        display: 'block',
    },
    statLabel: {
        fontSize: '12px',
        color: '#be185d', // Pink-700
        textTransform: 'uppercase' as const,
        fontWeight: 600,
    },
    button: {
        display: 'inline-block',
        backgroundImage: 'linear-gradient(to right, #a855f7, #ec4899)',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '16px 40px',
        fontSize: '16px',
        fontWeight: 700,
        borderRadius: '9999px',
        boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
    },
    footer: {
        padding: '30px',
        textAlign: 'center' as const,
        fontSize: '12px',
        color: '#9ca3af',
        borderTop: '1px solid #f3f4f6',
    }
};

export const NewSubscriberEmail = () => {
    return (
        <div style={styles.body as any}>
            <table role="presentation" cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
                <tr>
                    <td align="center">
                        <div style={styles.container}>
                            {/* Header with Gradient & Avatar */}
                            <div style={styles.header}>
                                <div style={styles.avatar}>🎉</div>
                            </div>

                            {/* Content */}
                            <div style={styles.content}>
                                <h1 style={styles.heading}>You have a new fan!</h1>
                                <p style={styles.subheading}>Verified Subscriber</p>
                                <p style={styles.text}>
                                    <strong>AlexDoe</strong> just subscribed to your exclusive content tier "Spotlight Access".
                                    Your content is resonating with more people every day!
                                </p>

                                <div style={styles.statGrid}>
                                    <div style={styles.statBox}>
                                        <span style={styles.statValue}>$15.00</span>
                                        <span style={styles.statLabel}>Revenue</span>
                                    </div>
                                    <div style={styles.statBox}>
                                        <span style={styles.statValue}>124</span>
                                        <span style={styles.statLabel}>Total Fans</span>
                                    </div>
                                </div>

                                <a href="#" style={styles.button}>Send Welcome Message</a>
                            </div>

                            {/* Footer */}
                            <div style={styles.footer}>
                                <p style={{ margin: 0 }}>
                                    Manage your creator profile on <a href="#" style={{ color: '#ec4899', fontWeight: 600, textDecoration: 'none' }}>TCCG.work</a>
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};
