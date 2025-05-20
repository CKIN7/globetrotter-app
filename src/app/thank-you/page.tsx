import Link from 'next/link';
import React from 'react';

interface ThankYouPageProps {
  customerEmail: string;
  bookingReference?: string;
  contactNumber: string;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({
  customerEmail,
  bookingReference,
  contactNumber,
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thank You for Your Booking!</h1>
      <p style={styles.paragraph}>
        Your booking has been successfully received and confirmed. We&apos;re
        excited to have you!
      </p>

      <div style={styles.section}>
        <h2 style={styles.subHeading}>What&apos;s Next?</h2>
        <p style={styles.paragraph}>
          You&apos;ll receive a confirmation email shortly at{' '}
          <strong style={styles.highlight}>{customerEmail}</strong> with all the
          details of your booking.
          {bookingReference && (
            <>
              {' '}
              Your booking reference number is{' '}
              <strong style={styles.highlight}>{bookingReference}</strong>.
            </>
          )}
          Please keep this email for your records.
        </p>
        <p style={styles.paragraph}>
          In the meantime, if you have any questions or need to make changes to
          your booking, don&apos;t hesitate to contact us directly at{' '}
          <strong style={styles.highlight}>{contactNumber}</strong> or reply to
          your confirmation email.
        </p>
      </div>

      <p style={styles.closing}>We look forward to seeing you!</p>
      <Link
        href="/"
        legacyBehavior>
        <a className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Back to home
        </a>
      </Link>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '50px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  heading: {
    fontSize: '2.8em',
    color: '#28a745',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '1.8em',
    color: '#0056b3',
    marginTop: '30px',
    marginBottom: '15px',
  },
  paragraph: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  highlight: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  section: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  closing: {
    fontSize: '1.2em',
    marginTop: '40px',
    fontWeight: '600',
    color: '#555',
  },
};

export default ThankYouPage;
