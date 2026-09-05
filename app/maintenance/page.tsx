"use client"

import { useEffect, useState } from "react"
import { Wrench, Mail, ArrowRight } from "lucide-react"

export default function MaintenancePage() {
  const [dots, setDots] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."))
    }, 600)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <html lang="id">
      <head>
        <title>Oniforge — Sedang Dalam Perbaikan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={styles.container}>
          {/* Animated background blobs */}
          <div style={styles.blob1} />
          <div style={styles.blob2} />
          <div style={styles.blob3} />

          {/* Content */}
          <div style={styles.content}>
            {/* Animated icon */}
            <div style={styles.iconWrapper}>
              <div style={styles.iconRing}>
                <Wrench size={40} color="#fff" style={styles.wrenchIcon} />
              </div>
              <div style={styles.pulseRing} />
            </div>

            {/* Main heading */}
            <h1 style={styles.heading}>
              Sedang Dalam Perbaikan
            </h1>

            {/* Subtext */}
            <p style={styles.subtext}>
              Kami sedang melakukan peningkatan dan perbaikan sistem untuk pengalaman belanja yang lebih baik.
              Mohon bersabar, kami akan segera kembali!
            </p>

            {/* Status indicator */}
            <div style={styles.statusBar}>
              <div style={styles.statusDot} />
              <span style={styles.statusText}>
                Maintenance sedang berlangsung{dots}
              </span>
            </div>

            {/* Info cards */}
            <div style={styles.cardGrid}>
              <div style={styles.card}>
                <Mail size={22} color="#60a5fa" />
                <div>
                  <p style={styles.cardTitle}>Hubungi Kami</p>
                  <p style={styles.cardDesc}>oniforge.official@gmail.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/6285855050504?text=Halo%20Admin%20Oniforge!%20%F0%9F%91%8B%20Saya%20ingin%20bertanya%20tentang%20produk."
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaButton}
            >
              <span>Chat WhatsApp Admin</span>
              <ArrowRight size={18} />
            </a>

            {/* Footer */}
            <p style={styles.footer}>
              © {new Date().getFullYear()} Oniforge — Terima kasih atas kesabaran Anda 🙏
            </p>
          </div>

          <style>{`
            @keyframes float1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
            }
            @keyframes float2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(-40px, 30px) scale(1.05); }
              66% { transform: translate(25px, -40px) scale(0.95); }
            }
            @keyframes float3 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(20px, 30px) scale(1.08); }
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.5; }
              50% { transform: scale(1.5); opacity: 0; }
            }
            @keyframes statusPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
            a:hover {
              filter: brightness(1.15) !important;
              transform: translateY(-2px) !important;
            }
          `}</style>
        </div>
      </body>
    </html>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  blob1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
    top: "-10%",
    left: "-5%",
    animation: "float1 8s ease-in-out infinite",
  },
  blob2: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
    bottom: "-8%",
    right: "-5%",
    animation: "float2 10s ease-in-out infinite",
  },
  blob3: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
    top: "40%",
    right: "20%",
    animation: "float3 12s ease-in-out infinite",
  },
  content: {
    position: "relative",
    zIndex: 10,
    textAlign: "center" as const,
    maxWidth: 560,
    width: "100%",
  },
  iconWrapper: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  iconRing: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(99,102,241,0.4)",
  },
  wrenchIcon: {
    animation: "spin 4s linear infinite",
  },
  pulseRing: {
    position: "absolute" as const,
    width: 80,
    height: 80,
    borderRadius: "50%",
    border: "2px solid rgba(99,102,241,0.5)",
    animation: "pulse 2s ease-in-out infinite",
  },
  heading: {
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 16px",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  subtext: {
    fontSize: "clamp(14px, 2.5vw, 17px)",
    color: "rgba(203,213,225,0.85)",
    lineHeight: 1.7,
    margin: "0 0 28px",
  },
  statusBar: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: "10px 20px",
    marginBottom: 32,
    backdropFilter: "blur(10px)",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#facc15",
    boxShadow: "0 0 8px rgba(250,204,21,0.6)",
    animation: "statusPulse 1.5s ease-in-out infinite",
  },
  statusText: {
    fontSize: 14,
    color: "#e2e8f0",
    fontWeight: 500,
  },
  cardGrid: {
    display: "flex",
    gap: 12,
    marginBottom: 28,
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "14px 18px",
    backdropFilter: "blur(8px)",
    flex: "1 1 200px",
    maxWidth: 260,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#e2e8f0",
    margin: 0,
  },
  cardDesc: {
    fontSize: 12,
    color: "rgba(148,163,184,0.9)",
    margin: "2px 0 0",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    padding: "14px 28px",
    borderRadius: 12,
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(34,197,94,0.3)",
    transition: "all 0.2s ease",
    marginBottom: 32,
  },
  footer: {
    fontSize: 13,
    color: "rgba(148,163,184,0.6)",
    margin: 0,
  },
}
