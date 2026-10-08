'use client'

import React from 'react'
import Image from 'next/image'

interface FooterProps {
  onNavigate: (tab: 'overview' | 'shelters' | 'new-visit' | 'visits' | 'about') => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 rounded-3xl bg-[#06192c] text-white shadow-[0_18px_42px_rgba(4,23,41,0.18)] overflow-hidden">
      <div className="grid gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* Coluna 1: Logo & Missão */}
        <div className="space-y-4">
          <div className="relative h-14 w-44">
            <Image
              src="/brand/beecasa-logo-on-dark.png"
              alt="BeeCasa — Pequenos abrigos, grandes futuros"
              fill
              className="object-contain object-left"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/brand/logo-full.webp'
              }}
            />
          </div>
          <p className="text-sm text-white/75 leading-relaxed max-w-sm">
            Tecnologia, natureza e propósito para criar o futuro de vida que poliniza e alimenta o nosso planeta.
          </p>
          <p className="text-xs text-[#ffb000] font-semibold">
            Desenvolvido para Meliponicultores, Produtores e Instituições.
          </p>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-white">Navegação no Protótipo</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <button
                onClick={() => onNavigate('overview')}
                className="hover:text-[#f6a400] transition cursor-pointer text-left"
              >
                Visão Geral das Colmeias
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shelters')}
                className="hover:text-[#f6a400] transition cursor-pointer text-left"
              >
                Abrigos Monitorados
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('new-visit')}
                className="hover:text-[#f6a400] transition cursor-pointer text-left"
              >
                Registrar Visita de Manejo
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('visits')}
                className="hover:text-[#f6a400] transition cursor-pointer text-left"
              >
                Consultar Registros
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#f6a400] transition cursor-pointer text-left"
              >
                Sobre a BeeCasa
              </button>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Bioma Caatinga & Abelhas Nativas */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-white">Abelhas Nativas da Caatinga</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Monitorando e preservando espécies vitais:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Jandaíra', 'Uruçu-Nordestina', 'Tiúba', 'Mandaçaia', 'Jataí'].map((bee) => (
              <span
                key={bee}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/10"
              >
                {bee}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 px-6 py-4 text-center text-xs text-white/60">
        © 2026 BeeCasa. Protótipo funcional para meliponicultura sustentável. Todos os direitos reservados.
      </div>
    </footer>
  )
}
