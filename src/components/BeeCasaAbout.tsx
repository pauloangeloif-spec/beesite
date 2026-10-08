'use client'

import React from 'react'
import Image from 'next/image'
import { 
  Bug, 
  BrainCircuit, 
  Heart, 
  Rocket, 
  Wifi, 
  Activity, 
  ShieldCheck, 
  Boxes, 
  Database,
  Lock,
  Leaf,
  CheckCircle2
} from 'lucide-react'

export const BeeCasaAbout: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Seção Principal de Apresentação */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dccfbd] shadow-sm">
        <div className="grid lg:grid-cols-[60%_40%] gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#c77d00] bg-[#fff3df] px-3 py-1 rounded-full border border-[#f6a400]/30">
              Sobre a BeeCasa
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-[#07182b] leading-[1.05]">
              Tecnologia que dá casa <br />
              <strong className="font-extrabold text-[#f6a400]">a quem sustenta a vida.</strong>
            </h2>
            <p className="text-base text-[#26384a] leading-relaxed max-w-xl">
              A BeeCasa nasceu na Caatinga para cuidar de abelhas nativas sem ferrão (ASF), gerar bem-estar às colônias e fortalecer meliponicultores, produtores rurais e pesquisadores com dados inteligentes de manejo.
            </p>
          </div>

          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#06192c] p-6 text-white flex flex-col justify-between">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase text-[#ffb000]">Nossa Missão</span>
              <p className="text-lg font-semibold mt-2 leading-relaxed">
                "Unir tecnologia, natureza e conhecimento para promover a conservação das abelhas nativas e o desenvolvimento socioambiental sustentável."
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs text-white/70">
              <Leaf className="w-4 h-4 text-[#f6a400]" />
              <span>Bioma Caatinga & Polinizadores Nativos</span>
            </div>
            {/* Hexágono decorativo */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 border-8 border-[#f6a400]/20 hex-badge"></div>
          </div>
        </div>

        {/* 4 Pilares da BeeCasa */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10 pt-10 border-t border-[#dccfbd]/60">
          <div className="space-y-3">
            <div className="grid size-12 place-items-center bg-[#fff3df] border border-[#f6a400] text-[#07182b] hex-badge">
              <Bug className="w-6 h-6 text-[#c77d00]" />
            </div>
            <h3 className="text-lg font-bold text-[#07182b]">Bioinspiração</h3>
            <p className="text-xs text-[#526174] leading-relaxed">
              Design estrutural baseado no comportamento térmico e biológico das abelhas nativas brasileiras.
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid size-12 place-items-center bg-[#fff3df] border border-[#f6a400] text-[#07182b] hex-badge">
              <BrainCircuit className="w-6 h-6 text-[#c77d00]" />
            </div>
            <h3 className="text-lg font-bold text-[#07182b]">Inteligência</h3>
            <p className="text-xs text-[#526174] leading-relaxed">
              Sensores de temperatura, umidade e telemetria solar que transformam dados de campo em orientações de manejo.
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid size-12 place-items-center bg-[#fff3df] border border-[#f6a400] text-[#07182b] hex-badge">
              <Heart className="w-6 h-6 text-[#c77d00]" />
            </div>
            <h3 className="text-lg font-bold text-[#07182b]">Cuidado</h3>
            <p className="text-xs text-[#526174] leading-relaxed">
              Ambientes mais adequados para a proteção do ninho contra variações climáticas extremas e pragas.
            </p>
          </div>

          <div className="space-y-3">
            <div className="grid size-12 place-items-center bg-[#fff3df] border border-[#f6a400] text-[#07182b] hex-badge">
              <Rocket className="w-6 h-6 text-[#c77d00]" />
            </div>
            <h3 className="text-lg font-bold text-[#07182b]">Impacto Real</h3>
            <p className="text-xs text-[#526174] leading-relaxed">
              Mais polinização em culturas agrícolas, conservação da biodiversidade e fortalecimento da economia familiar.
            </p>
          </div>
        </div>
      </section>

      {/* Como os Dados São Armazenados (Requisito do Usuário) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dccfbd] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center bg-[#06192c] text-[#ffb000] rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#07182b]">
              Como os Dados São Armazenados Neste Protótipo
            </h3>
            <p className="text-sm text-[#526174]">
              Transparência técnica, segurança e funcionamento 100% gratuito sem serviços pagos
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-5 rounded-2xl bg-[#fffcf7] border border-[#dccfbd] space-y-2">
            <span className="text-xs font-bold text-[#c77d00] bg-[#fff3df] px-2.5 py-0.5 rounded-full">
              Camada 1: LocalStorage (Ativo)
            </span>
            <h4 className="text-sm font-bold text-[#07182b]">Persistência Local no Navegador</h4>
            <p className="text-xs text-[#526174] leading-relaxed">
              Todos os registros de visitas e abrigos adicionados ficam salvos diretamente no seu navegador. Você pode recarregar a página, fechar o navegador e voltar que os dados continuam disponíveis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffcf7] border border-[#dccfbd] space-y-2">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Sem Serviços Pagos
            </span>
            <h4 className="text-sm font-bold text-[#07182b]">Zero Custo & Sem Bloqueios</h4>
            <p className="text-xs text-[#526174] leading-relaxed">
              O protótipo não faz chamadas a serviços externos pagos, garantindo que você possa demonstrar e testar imediatamente sem cobranças, chaves de API expiradas ou dependência de internet.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffcf7] border border-[#dccfbd] space-y-2">
            <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full">
              Camada 2: Supabase (Opcional)
            </span>
            <h4 className="text-sm font-bold text-[#07182b]">Pronto para Sincronização em Nuvem</h4>
            <p className="text-xs text-[#526174] leading-relaxed">
              O cliente oficial em <code className="text-[11px] font-mono text-[#07182b]">src/lib/supabaseClient.ts</code> já está configurado com suas chaves. Quando quiser levar para produção, basta habilitar a sincronização.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
