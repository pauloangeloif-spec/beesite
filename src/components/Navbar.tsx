'use client'

import React from 'react'
import Image from 'next/image'
import { PlusCircle, ClipboardList, Home, Bug, Info, Database } from 'lucide-react'

interface NavbarProps {
  activeTab: 'overview' | 'shelters' | 'new-visit' | 'visits' | 'about'
  setActiveTab: (tab: 'overview' | 'shelters' | 'new-visit' | 'visits' | 'about') => void
  userRole: string
  setUserRole: (role: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#07182b]/10 bg-[#fffcf7]/95 backdrop-blur-md">
      {/* Top Banner de Identificação do Usuário */}
      <div className="bg-[#06192c] text-white/90 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Protótipo Funcional <strong>BeeCasa</strong> — Armazenamento Local Ativo (100% Gratuito)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60 hidden sm:inline">Perfil atual:</span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-[#0b2844] text-[#ffb000] font-semibold text-xs rounded px-2 py-0.5 border border-white/20 focus:outline-none focus:border-[#f6a400]"
          >
            <option value="Meliponicultor">Meliponicultor (Criador de ASF)</option>
            <option value="Produtor Rural">Produtor Rural (Polinização)</option>
            <option value="Instituição / Projeto">Instituição / Projeto Socioambiental</option>
          </select>
        </div>
      </div>

      <div className="mx-auto flex min-h-[82px] max-w-[1536px] items-center justify-between gap-4 px-4 sm:px-8">
        {/* Logo BeeCasa */}
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative h-14 w-44 sm:w-56 overflow-hidden">
            <Image
              src="/brand/logo-full.webp"
              alt="BeeCasa — Pequenos abrigos, grandes futuros"
              fill
              className="object-contain object-left transition group-hover:scale-[1.02]"
              priority
              onError={(e) => {
                // Fallback para PNG horizontal se necessário
                const target = e.target as HTMLImageElement
                target.src = '/brand/beecasa-logo-horizontal.png'
              }}
            />
          </div>
        </button>

        {/* Navegação Desktop */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#fff1d8] text-[#c77d00]'
                : 'text-[#07182b] hover:bg-black/5 hover:text-[#d98900]'
            }`}
          >
            <Home className="w-4 h-4 text-[#f6a400]" />
            Visão Geral
          </button>

          <button
            onClick={() => setActiveTab('shelters')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'shelters'
                ? 'bg-[#fff1d8] text-[#c77d00]'
                : 'text-[#07182b] hover:bg-black/5 hover:text-[#d98900]'
            }`}
          >
            <Bug className="w-4 h-4 text-[#f6a400]" />
            Colmeias & Abrigos
          </button>

          <button
            onClick={() => setActiveTab('visits')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'visits'
                ? 'bg-[#fff1d8] text-[#c77d00]'
                : 'text-[#07182b] hover:bg-black/5 hover:text-[#d98900]'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-[#f6a400]" />
            Consultar Visitas
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-[#fff1d8] text-[#c77d00]'
                : 'text-[#07182b] hover:bg-black/5 hover:text-[#d98900]'
            }`}
          >
            <Info className="w-4 h-4 text-[#f6a400]" />
            A BeeCasa
          </button>
        </nav>

        {/* Botão de Destaque: Registrar Visita */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('new-visit')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f6a400] px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-bold text-[#07182b] shadow-[0_8px_20px_rgba(246,164,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffb61b] active:translate-y-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Registrar Visita</span>
          </button>
        </div>
      </div>

      {/* Navegação Mobile em abas na parte inferior do header */}
      <div className="flex lg:hidden overflow-x-auto border-t border-[#07182b]/10 bg-[#fffcf7] px-2 py-2 gap-1 text-xs font-bold no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
            activeTab === 'overview' ? 'bg-[#fff1d8] text-[#c77d00]' : 'text-[#07182b]'
          }`}
        >
          <Home className="w-3.5 h-3.5" /> Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('shelters')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
            activeTab === 'shelters' ? 'bg-[#fff1d8] text-[#c77d00]' : 'text-[#07182b]'
          }`}
        >
          <Bug className="w-3.5 h-3.5" /> Colmeias
        </button>
        <button
          onClick={() => setActiveTab('visits')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
            activeTab === 'visits' ? 'bg-[#fff1d8] text-[#c77d00]' : 'text-[#07182b]'
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" /> Visitas
        </button>
        <button
          onClick={() => setActiveTab('new-visit')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
            activeTab === 'new-visit' ? 'bg-[#f6a400] text-[#07182b]' : 'text-[#07182b]'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" /> + Nova Visita
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-3 py-2 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
            activeTab === 'about' ? 'bg-[#fff1d8] text-[#c77d00]' : 'text-[#07182b]'
          }`}
        >
          <Info className="w-3.5 h-3.5" /> A BeeCasa
        </button>
      </div>
    </header>
  )
}
