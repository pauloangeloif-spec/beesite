'use client'

import React from 'react'
import Image from 'next/image'
import { Shelter } from '@/types/beecasa'
import { 
  Bug, 
  Thermometer, 
  Droplets, 
  BatteryMedium, 
  MapPin, 
  Calendar, 
  PlusCircle, 
  ShieldCheck, 
  AlertTriangle,
  Info
} from 'lucide-react'

interface ShelterListProps {
  shelters: Shelter[]
  onSelectShelterForVisit: (shelterId: string) => void
}

export const ShelterList: React.FC<ShelterListProps> = ({
  shelters,
  onSelectShelterForVisit,
}) => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white p-6 rounded-3xl border border-[#dccfbd] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182b]">
            Colmeias e Abrigos BeeCasa
          </h2>
          <p className="text-sm text-[#526174] mt-1">
            Módulos bioinspirados para criação, manejo e monitoramento de abelhas nativas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#c77d00] bg-[#fff3df] px-3.5 py-2 rounded-xl border border-[#f6a400]/30">
            {shelters.length} Abrigos Ativos
          </span>
        </div>
      </div>

      {/* Grid de Colmeias */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shelters.map((shelter) => {
          const statusBadge =
            shelter.status === 'forte'
              ? { label: 'Colônia Forte', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' }
              : shelter.status === 'estavel'
              ? { label: 'Estável', bg: 'bg-blue-100 text-blue-900 border-blue-300' }
              : { label: 'Necessita Atenção', bg: 'bg-amber-100 text-amber-900 border-amber-300' }

          return (
            <div
              key={shelter.id}
              className="bg-white rounded-3xl border border-[#dccfbd] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Topo do Card com Imagem / Mockup */}
                <div className="relative h-44 bg-[#06192c] overflow-hidden p-5 flex flex-col justify-between text-white">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white">
                      {shelter.code}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold leading-tight text-white">{shelter.name}</h3>
                    <p className="text-xs text-[#ffb000] italic mt-0.5">
                      {shelter.speciesCommon} — <em>{shelter.species}</em>
                    </p>
                  </div>

                  {/* Fundo com textura hexagonal */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 border-4 border-[#f6a400]/20 hex-badge"></div>
                </div>

                {/* Corpo do Card */}
                <div className="p-5 space-y-4">
                  {/* Localização e Perfil */}
                  <div className="space-y-1 text-xs text-[#526174]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f6a400] shrink-0" />
                      <span className="line-clamp-1">{shelter.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <Info className="w-3.5 h-3.5 text-[#7e8b9b] shrink-0" />
                      <span>Destinado a: <strong>{shelter.targetAudience}</strong></span>
                    </div>
                  </div>

                  {/* Telemetria de Sensores */}
                  <div className="grid grid-cols-3 gap-2 bg-[#fffcf7] p-3 rounded-2xl border border-[#dccfbd]/60 text-center">
                    <div>
                      <span className="flex items-center justify-center text-[11px] text-[#7e8b9b] gap-1">
                        <Thermometer className="w-3 h-3 text-[#f6a400]" /> Temp.
                      </span>
                      <p className="text-sm font-bold text-[#07182b] mt-0.5">{shelter.temperature}°C</p>
                    </div>

                    <div>
                      <span className="flex items-center justify-center text-[11px] text-[#7e8b9b] gap-1">
                        <Droplets className="w-3 h-3 text-sky-500" /> Umid.
                      </span>
                      <p className="text-sm font-bold text-[#07182b] mt-0.5">{shelter.humidity}%</p>
                    </div>

                    <div>
                      <span className="flex items-center justify-center text-[11px] text-[#7e8b9b] gap-1">
                        <BatteryMedium className="w-3 h-3 text-emerald-500" /> Bateria
                      </span>
                      <p className="text-sm font-bold text-[#07182b] mt-0.5">{shelter.batteryLevel}%</p>
                    </div>
                  </div>

                  {/* Descrição e notas */}
                  <p className="text-xs text-[#26384a] leading-relaxed line-clamp-2">
                    {shelter.notes}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#7e8b9b] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#f6a400]" />
                      Última visita: <strong>{shelter.lastVisitDate || 'Não informada'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão Inferior de Ação */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectShelterForVisit(shelter.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#fff3df] hover:bg-[#f6a400] text-[#07182b] text-xs font-bold transition flex items-center justify-center gap-2 border border-[#f6a400]/40 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#c77d00]" />
                  <span>Registrar Visita Nesta Colmeia</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
