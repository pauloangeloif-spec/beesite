'use client'

import React from 'react'
import Image from 'next/image'
import { Shelter, Visit } from '@/types/beecasa'
import { 
  Activity, 
  Boxes, 
  ShieldCheck, 
  Leaf, 
  PlusCircle, 
  ClipboardList, 
  Thermometer, 
  Droplets, 
  SunMedium, 
  Calendar, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react'

interface DashboardOverviewProps {
  shelters: Shelter[]
  visits: Visit[]
  onNewVisit: () => void
  onViewVisits: () => void
  onViewShelters: () => void
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  shelters,
  visits,
  onNewVisit,
  onViewVisits,
  onViewShelters,
}) => {
  const strongColonies = shelters.filter((s) => s.status === 'forte').length
  const avgTemp = (
    shelters.reduce((acc, s) => acc + s.temperature, 0) / (shelters.length || 1)
  ).toFixed(1)
  const avgHum = Math.round(
    shelters.reduce((acc, s) => acc + s.humidity, 0) / (shelters.length || 1)
  )

  const recentVisits = visits.slice(0, 3)

  return (
    <div className="space-y-10">
      {/* Hero Banner Inspirado no Design System da BeeCasa */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06192c] via-[#0b2844] to-[#06192c] text-white p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(6,25,44,0.25)]">
        {/* Detalhes de iluminação / hexágono de fundo */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#f6a400]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 bottom-4 opacity-15 hidden xl:block pointer-events-none">
          <div className="w-72 h-72 border-8 border-[#f6a400] hex-badge"></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f6a400]/20 px-3.5 py-1 text-xs font-bold text-[#f6a400] border border-[#f6a400]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Manejo Inteligente de Abelhas Nativas sem Ferrão</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            PEQUENOS ABRIGOS,{' '}
            <span className="block font-bold text-[#f6a400]">GRANDES FUTUROS.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
            Acompanhe a saúde das suas colmeias na Caatinga, registre visitas e manejos em campo de forma descomplicada e consulte o histórico a qualquer momento.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onNewVisit}
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#f6a400] px-6 py-3.5 text-sm sm:text-base font-bold text-[#07182b] shadow-[0_12px_28px_rgba(246,164,0,0.35)] transition hover:-translate-y-0.5 hover:bg-[#ffb61b] active:translate-y-0 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Registrar Visita ao Abrigo</span>
            </button>

            <button
              onClick={onViewVisits}
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition hover:bg-white/20 active:translate-y-0 cursor-pointer backdrop-blur-sm"
            >
              <ClipboardList className="w-5 h-5 text-[#f6a400]" />
              <span>Consultar Registros ({visits.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Métricas Bioinspiradas */}
      <section aria-label="Estatísticas Principais">
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Total de Colmeias */}
          <div className="rounded-2xl border border-[#dccfbd] bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="relative grid size-12 place-items-center bg-[#f6a400] hex-badge">
                <Boxes className="w-6 h-6 text-[#06192c]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7e8b9b] bg-[#fff3df] px-2.5 py-1 rounded-full text-[#c77d00]">
                Abrigos
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-[#07182b]">{shelters.length}</p>
              <p className="text-sm font-semibold text-[#526174] mt-1">Colmeias monitoradas</p>
              <p className="text-xs text-[#7e8b9b] mt-2">Jandaíra, Uruçu, Mandaçaia e Tiúba</p>
            </div>
          </div>

          {/* Card 2: Colônias Fortes */}
          <div className="rounded-2xl border border-[#dccfbd] bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="relative grid size-12 place-items-center bg-[#f6a400] hex-badge">
                <ShieldCheck className="w-6 h-6 text-[#06192c]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                {Math.round((strongColonies / (shelters.length || 1)) * 100)}% Saudáveis
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-[#07182b]">{strongColonies}</p>
              <p className="text-sm font-semibold text-[#526174] mt-1">Colônias fortes e ativas</p>
              <p className="text-xs text-[#7e8b9b] mt-2">Boa postura e postura em espiral</p>
            </div>
          </div>

          {/* Card 3: Visitas Realizadas */}
          <div className="rounded-2xl border border-[#dccfbd] bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="relative grid size-12 place-items-center bg-[#f6a400] hex-badge">
                <Activity className="w-6 h-6 text-[#06192c]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-[#06192c] text-[#ffb000] px-2.5 py-1 rounded-full">
                Manejos
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-extrabold text-[#07182b]">{visits.length}</p>
              <p className="text-sm font-semibold text-[#526174] mt-1">Visitas registradas</p>
              <p className="text-xs text-[#7e8b9b] mt-2">Histórico completo disponível</p>
            </div>
          </div>

          {/* Card 4: Telemetria Média */}
          <div className="rounded-2xl border border-[#dccfbd] bg-white p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="relative grid size-12 place-items-center bg-[#f6a400] hex-badge">
                <Leaf className="w-6 h-6 text-[#06192c]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-[#fff3df] text-[#c77d00] px-2.5 py-1 rounded-full">
                Sensores
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center text-sm font-bold text-[#07182b]">
                  <Thermometer className="w-4 h-4 text-[#f6a400] mr-1" /> {avgTemp}°C
                </span>
                <span className="flex items-center text-sm font-bold text-[#07182b]">
                  <Droplets className="w-4 h-4 text-sky-500 mr-1" /> {avgHum}%
                </span>
              </div>
              <p className="text-sm font-semibold text-[#526174] mt-2">Ambiente interno ideal</p>
              <p className="text-xs text-[#7e8b9b] mt-1">Isolamento térmico bioinspirado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção com Duas Colunas: Visitas Recentes & Acesso Rápido às Colmeias */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Coluna 1 & 2: Últimas Visitas Registradas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#07182b]">Visitas Registradas Recentemente</h2>
              <p className="text-sm text-[#526174]">Acompanhe as últimas inspeções e intervenções de manejo</p>
            </div>
            <button
              onClick={onViewVisits}
              className="text-xs sm:text-sm font-bold text-[#c77d00] hover:text-[#d98900] inline-flex items-center gap-1 transition"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentVisits.map((visit) => (
              <div
                key={visit.id}
                className="rounded-2xl border border-[#dccfbd] bg-white p-5 shadow-sm hover:border-[#f6a400] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#fff3df] text-[#c77d00]">
                      {visit.id}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      visit.colonyHealth === 'excelente' ? 'bg-emerald-100 text-emerald-800' :
                      visit.colonyHealth === 'boa' ? 'bg-blue-100 text-blue-800' :
                      visit.colonyHealth === 'regular' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {visit.colonyHealth === 'excelente' ? 'Saúde Excelente' :
                       visit.colonyHealth === 'boa' ? 'Saúde Boa' :
                       visit.colonyHealth === 'regular' ? 'Atenção / Regular' : 'Crítica'}
                    </span>
                    <span className="text-xs font-medium text-[#7e8b9b] capitalize">
                      {visit.visitType === 'inspecao' ? 'Inspeção de rotina' :
                       visit.visitType === 'alimentacao' ? 'Manejo alimentar' :
                       visit.visitType === 'colheita' ? 'Colheita de mel' :
                       visit.visitType === 'divisao' ? 'Divisão de colônia' : 'Manutenção'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#07182b]">{visit.shelterName}</h3>
                  <p className="text-xs text-[#526174] line-clamp-1 italic">"{visit.notes}"</p>

                  <div className="flex items-center gap-4 text-xs text-[#7e8b9b] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f6a400]" /> {visit.date} às {visit.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#526174]" /> {visit.visitorName}
                    </span>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <button
                    onClick={onViewVisits}
                    className="inline-flex items-center text-xs font-bold text-[#07182b] bg-[#fff3df] hover:bg-[#f6a400] hover:text-[#07182b] px-3 py-1.5 rounded-lg transition"
                  >
                    Consultar Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 3: Abrigos Monitorados & Guia de Uso */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#07182b]">Abrigos BeeCasa</h2>
              <p className="text-sm text-[#526174]">Tecnologia e conservação</p>
            </div>
            <button
              onClick={onViewShelters}
              className="text-xs sm:text-sm font-bold text-[#c77d00] hover:text-[#d98900] inline-flex items-center gap-1 transition"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-[#dccfbd] bg-white p-5 shadow-sm space-y-4">
            <div className="space-y-3">
              {shelters.slice(0, 3).map((shelter) => (
                <div key={shelter.id} className="p-3 rounded-xl bg-[#fffcf7] border border-[#dccfbd]/60">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#07182b]">{shelter.name}</p>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      shelter.status === 'forte' ? 'bg-emerald-500' :
                      shelter.status === 'estavel' ? 'bg-amber-400' : 'bg-rose-500'
                    }`}></span>
                  </div>
                  <p className="text-xs text-[#c77d00] font-medium">{shelter.speciesCommon}</p>
                  <p className="text-[11px] text-[#7e8b9b] mt-1">{shelter.location}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#dccfbd]/60">
              <button
                onClick={onNewVisit}
                className="w-full py-2.5 px-4 rounded-xl bg-[#06192c] hover:bg-[#0b2844] text-[#ffb000] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Registrar Visita para uma Colmeia
              </button>
            </div>
          </div>

          {/* Dica da Meliponicultura */}
          <div className="rounded-2xl bg-[#fff3df] border border-[#f6a400]/40 p-5 text-[#07182b]">
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center bg-[#f6a400] hex-badge">
                <SunMedium className="w-4 h-4 text-[#06192c]" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Dica de Manejo na Caatinga</h4>
                <p className="text-xs text-[#526174] mt-1 leading-relaxed">
                  Realize inspeções preferencialmente pela manhã (entre 07h e 10h), quando as campeiras iniciam o forrageamento e a temperatura é amena.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
