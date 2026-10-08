'use client'

import React, { useState } from 'react'
import { Shelter, Visit, VisitType, ColonyHealth } from '@/types/beecasa'
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Trash2, 
  PlusCircle, 
  RotateCcw, 
  Download,
  AlertCircle,
  CheckCircle2,
  Bug,
  Thermometer,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react'

interface VisitListProps {
  visits: Visit[]
  shelters: Shelter[]
  onDeleteVisit: (id: string) => void
  onNewVisit: () => void
  onResetData: () => void
}

export const VisitList: React.FC<VisitListProps> = ({
  visits,
  shelters,
  onDeleteVisit,
  onNewVisit,
  onResetData,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShelterFilter, setSelectedShelterFilter] = useState('ALL')
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL')
  const [selectedHealthFilter, setSelectedHealthFilter] = useState('ALL')

  // Filtros combinados
  const filteredVisits = visits.filter((v) => {
    const matchesSearch =
      v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.shelterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesShelter =
      selectedShelterFilter === 'ALL' || v.shelterId === selectedShelterFilter

    const matchesType =
      selectedTypeFilter === 'ALL' || v.visitType === selectedTypeFilter

    const matchesHealth =
      selectedHealthFilter === 'ALL' || v.colonyHealth === selectedHealthFilter

    return matchesSearch && matchesShelter && matchesType && matchesHealth
  })

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredVisits, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `beecasa_visitas_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="space-y-6">
      {/* Barra de Título e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#dccfbd] shadow-sm">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182b]">
            Consulta de Visitas aos Abrigos
          </h2>
          <p className="text-sm text-[#526174] mt-1">
            Histórico completo de inspeções, manejos e intervenções nas colônias
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNewVisit}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f6a400] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#07182b] shadow-sm transition hover:bg-[#ffb61b] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Nova Visita</span>
          </button>

          <button
            onClick={handleExportJson}
            title="Exportar dados filtrados em formato JSON"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#dccfbd] bg-white px-3.5 py-2.5 text-xs font-bold text-[#526174] hover:bg-gray-50 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#f6a400]" />
            <span>Exportar Dados</span>
          </button>

          <button
            onClick={onResetData}
            title="Restaurar dados fictícios de demonstração"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#dccfbd] bg-white px-3 py-2.5 text-xs font-bold text-[#7e8b9b] hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restaurar Demo</span>
          </button>
        </div>
      </div>

      {/* Caixa de Busca e Filtros */}
      <div className="bg-white p-5 rounded-2xl border border-[#dccfbd] shadow-sm space-y-4">
        <div className="grid gap-3 sm:grid-cols-4">
          {/* Busca por texto */}
          <div className="sm:col-span-1 relative">
            <Search className="w-4 h-4 text-[#7e8b9b] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por meliponicultor, abrigo ou nota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] pl-10 pr-3 py-2 text-xs sm:text-sm text-[#07182b] focus:border-[#f6a400] focus:outline-none"
            />
          </div>

          {/* Filtro por Colmeia */}
          <div>
            <select
              value={selectedShelterFilter}
              onChange={(e) => setSelectedShelterFilter(e.target.value)}
              className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-3 py-2 text-xs sm:text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
            >
              <option value="ALL">Todas as Colmeias ({shelters.length})</option>
              {shelters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Tipo de Visita */}
          <div>
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-3 py-2 text-xs sm:text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
            >
              <option value="ALL">Todos os Tipos de Manejo</option>
              <option value="inspecao">Inspeção de Rotina</option>
              <option value="alimentacao">Alimentação Artificial</option>
              <option value="colheita">Colheita de Mel</option>
              <option value="divisao">Divisão de Enxame</option>
              <option value="sensores">Checagem de Sensores</option>
            </select>
          </div>

          {/* Filtro por Saúde */}
          <div>
            <select
              value={selectedHealthFilter}
              onChange={(e) => setSelectedHealthFilter(e.target.value)}
              className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-3 py-2 text-xs sm:text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
            >
              <option value="ALL">Qualquer Estado de Saúde</option>
              <option value="excelente">Excelente</option>
              <option value="boa">Boa</option>
              <option value="regular">Regular</option>
              <option value="critica">Crítica / Atenção</option>
            </select>
          </div>
        </div>

        {/* Resumo da busca */}
        <div className="flex items-center justify-between text-xs text-[#526174] pt-1 border-t border-[#dccfbd]/40">
          <span>
            Exibindo <strong>{filteredVisits.length}</strong> de <strong>{visits.length}</strong> registros encontrados
          </span>
          {(searchTerm || selectedShelterFilter !== 'ALL' || selectedTypeFilter !== 'ALL' || selectedHealthFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedShelterFilter('ALL')
                setSelectedTypeFilter('ALL')
                setSelectedHealthFilter('ALL')
              }}
              className="text-[#c77d00] hover:underline font-bold cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>
      </div>

      {/* Lista de Registros */}
      {filteredVisits.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#dccfbd] shadow-sm space-y-4">
          <div className="grid size-16 mx-auto place-items-center bg-[#fff3df] rounded-full text-[#c77d00]">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#07182b]">Nenhum registro encontrado</h3>
            <p className="text-sm text-[#526174] mt-1 max-w-md mx-auto">
              Não encontramos nenhuma visita correspondente aos filtros atuais. Tente limpar os filtros ou registrar uma nova visita.
            </p>
          </div>
          <button
            onClick={onNewVisit}
            className="inline-flex items-center gap-2 rounded-xl bg-[#f6a400] px-5 py-2.5 text-sm font-bold text-[#07182b] transition hover:bg-[#ffb61b] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Registrar Primeira Visita
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVisits.map((visit) => {
            const healthColor =
              visit.colonyHealth === 'excelente' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' :
              visit.colonyHealth === 'boa' ? 'border-blue-300 bg-blue-50 text-blue-900' :
              visit.colonyHealth === 'regular' ? 'border-amber-300 bg-amber-50 text-amber-900' :
              'border-rose-300 bg-rose-50 text-rose-900'

            const typeLabel =
              visit.visitType === 'inspecao' ? 'Inspeção de Rotina' :
              visit.visitType === 'alimentacao' ? 'Manejo de Alimentação' :
              visit.visitType === 'colheita' ? 'Colheita de Mel' :
              visit.visitType === 'divisao' ? 'Divisão de Colônia' : 'Manutenção de Sensores'

            return (
              <div
                key={visit.id}
                className="bg-white rounded-2xl border border-[#dccfbd] p-5 sm:p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                {/* Linha superior: ID, Data, Abrigo e Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dccfbd]/50 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#06192c] text-[#ffb000]">
                      {visit.id}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${healthColor}`}>
                      Saúde: {visit.colonyHealth.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#fff3df] text-[#c77d00] border border-[#f6a400]/30">
                      {typeLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#7e8b9b]">
                    <span className="flex items-center gap-1 font-semibold text-[#07182b]">
                      <Calendar className="w-3.5 h-3.5 text-[#f6a400]" /> {visit.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#526174]" /> {visit.time}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja remover o registro ${visit.id}?`)) {
                          onDeleteVisit(visit.id)
                        }
                      }}
                      title="Excluir este registro"
                      className="p-1 rounded text-[#7e8b9b] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Conteúdo Central */}
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Coluna 1: Colmeia e Meliponicultor */}
                  <div className="space-y-1">
                    <p className="text-xs uppercase font-bold text-[#7e8b9b]">Colmeia / Abrigo</p>
                    <h4 className="text-base font-bold text-[#07182b]">{visit.shelterName}</h4>
                    <p className="text-xs text-[#526174] flex items-center gap-1 pt-1">
                      <User className="w-3.5 h-3.5 text-[#f6a400]" /> {visit.visitorName} ({visit.visitorRole})
                    </p>
                  </div>

                  {/* Coluna 2: Indicadores Biológicos */}
                  <div className="space-y-1.5 text-xs text-[#26384a]">
                    <p className="text-xs uppercase font-bold text-[#7e8b9b]">Estado Biológico</p>
                    <div className="flex items-center gap-1.5">
                      <span>👑 Rainha:</span>
                      <strong className="text-[#07182b]">
                        {visit.queenStatus === 'presente_postura_ativa' ? 'Presente (Postura Ativa)' :
                         visit.queenStatus === 'presente_pouca_postura' ? 'Presente (Pouca Postura)' :
                         visit.queenStatus === 'realeza_emergindo' ? 'Realeza Emergindo' : 'Não avistada'}
                      </strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🍯 Reservas:</span>
                      <strong className="text-[#07182b] capitalize">{visit.foodReserves}</strong>
                    </div>
                    {visit.pestDetected && (
                      <div className="text-rose-700 font-bold flex items-center gap-1">
                        <span>🚨 Pragas:</span>
                        <span>{visit.pestDetails || 'Detectada intervenção'}</span>
                      </div>
                    )}
                  </div>

                  {/* Coluna 3: Dados de Campo / Observações */}
                  <div className="space-y-1">
                    <p className="text-xs uppercase font-bold text-[#7e8b9b]">Notas de Campo</p>
                    <p className="text-xs text-[#26384a] leading-relaxed bg-[#fffcf7] p-2.5 rounded-xl border border-[#dccfbd]/60 italic">
                      "{visit.notes}"
                    </p>
                    {visit.honeyHarvestedKg && (
                      <p className="text-xs font-bold text-amber-800 pt-0.5">
                        🍯 Mel colhido: {visit.honeyHarvestedKg} kg
                      </p>
                    )}
                    {visit.temperatureObserved && (
                      <p className="text-[11px] text-[#526174]">
                        🌡️ Temp. Interna: {visit.temperatureObserved} °C
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
