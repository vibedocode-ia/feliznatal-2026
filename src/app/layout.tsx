import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feliz Natal 2026 — Vídeo Personalizado do Papai Noel',
  description: 'Surpreenda quem você ama com uma mensagem mágica e hiperpersonalizada do Papai Noel gerada com inteligência artificial.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-christmas-night text-slate-100 snow-overlay flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
