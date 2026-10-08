import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BeeCasa — Gestão de Colmeias e Abrigos de Abelhas Nativas',
  description: 'Tecnologia e natureza para monitorar, proteger e gerenciar colônias de abelhas nativas da Caatinga.',
  icons: {
    icon: '/brand/beecasa-logo-horizontal.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#fffcf7] text-[#07182b] antialiased selection:bg-[#f6a400]/30 selection:text-[#07182b]">
        {children}
      </body>
    </html>
  )
}
