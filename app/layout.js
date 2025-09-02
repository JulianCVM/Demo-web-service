import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sistema de Citas Médicas',
  description: 'Sistema avanzado de gestión de citas médicas con Next.js',
  keywords: 'citas médicas, hospital, doctor, paciente, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
