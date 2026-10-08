'use client'

import React, { useState } from 'react'
import { Shelter, Visit, VisitType, ColonyHealth, QueenStatus, FoodReserves } from '@/types/beecasa'
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Bug, 
  AlertTriangle, 
  Sparkles, 
  Save, 
  RotateCcw,
  ShieldCheck,
  Thermometer,
  Feather
} from 'lucide-react'

interface VisitFormProps {
  shelters: Shelter[]
  onVisitCreated: (visit: Visit) => void
  onCancel: () => void
  currentVisitorName?: string
  currentVisitorRole?: string
}

export const VisitForm: React.FC<VisitFormProps> = ({
  shelters,
  onVisitCreated,
  onCancel,
  currentVisitorName = 'Paulo Ângelo',
  currentVisitorRole = 'Meliponicultor Responsável',
}) => {
  const today = new Date().toISOString().split('T')[0]
  const nowTime = new Date().toTimeString().slice(0, 5)

  const [shelterId, setShelterId] = useState(shelters[0]?.id || '')
  const [date, setDate] = useState(today)
  const [time, setTime] = useState(nowTime)
  const [visitorName, setVisitorName] = useState(currentVisitorName)
  const [visitorRole, setVisitorRole] = useState(currentVisitorRole)
  const [visitType, setVisitType] = useState<VisitType>('inspecao')
  const [colonyHealth, setColonyHealth] = useState<ColonyHealth>('excelente')
  const [queenStatus, setQueenStatus] = useState<QueenStatus>('presente_postura_ativa')
  const [foodReserves, setFoodReserves] = useState<FoodReserves>('suficiente')
  const [pestDetected, setPestDetected] = useState<boolean>(false)
  const [pestDetails, setPestDetails] = useState<string>('')
  const [temperatureObserved, setTemperatureObserved] = useState<string>('28.5')
  const [honeyHarvestedKg, setHoneyHarvestedKg] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const selectedShelter = shelters.find((s) => s.id === shelterId)

  const handleSetCurrentTime = () => {
    const d = new Date()
    setDate(d.toISOString().split('T')[0])
    setTime(d.toTimeString().slice(0, 5))
  }

  const handleFillDemo = () => {
    setShelterId(shelters[0]?.id || '')
    setVisitorName('Paulo Ângelo')
    setVisitorRole('Meliponicultor')
    setVisitType('inspecao')
    setColonyHealth('excelente')
    setQueenStatus('presente_postura_ativa')
    setFoodReserves('abundante')
    setPestDetected(false)
    setTemperatureObserved('28.7')
    setNotes('Excelente atividade de campeiras pela manhã. Discos de cria maduros e novas lamelas de geoprópolis na câmara de cria.')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!shelterId) {
      setErrorMessage('Por favor, selecione a colmeia/abrigo visitado.')
      return
    }

    if (!visitorName.trim()) {
      setErrorMessage('Por favor, informe o nome do responsável pela visita.')
      return
    }

    if (!date) {
      setErrorMessage('Por favor, informe a data da visita.')
      return
    }

    const shelterName = selectedShelter ? selectedShelter.name : 'Colmeia'

    const newVisitPayload = {
      shelterId,
      shelterName,
      date,
      time: time || '09:00',
      visitorName: visitorName.trim(),
      visitorRole: visitorRole.trim() || 'Meliponicultor',
      visitType,
      colonyHealth,
      queenStatus,
      foodReserves,
      pestDetected,
      pestDetails: pestDetected ? pestDetails : undefined,
      temperatureObserved: temperatureObserved ? parseFloat(temperatureObserved) : undefined,
      honeyHarvestedKg: honeyHarvestedKg ? parseFloat(honeyHarvestedKg) : undefined,
      notes: notes.trim() || 'Visita de manejo registrada no protótipo BeeCasa.',
    }

    // Chama o callback pai que persiste no storage
    onVisitCreated(newVisitPayload as any)
    setSuccessMessage(`Visita ao abrigo "${shelterName}" registrada com sucesso!`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho do Formulário */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dccfbd] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dccfbd]/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="grid size-12 shrink-0 place-items-center bg-[#f6a400] hex-badge">
              <Bug className="w-6 h-6 text-[#06192c]" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07182b]">
                Registrar Visita ao Abrigo
              </h2>
              <p className="text-sm text-[#526174] mt-0.5">
                Preencha os dados da inspeção ou manejo da sua colmeia de abelhas nativas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFillDemo}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c77d00] bg-[#fff3df] hover:bg-[#ffe6bc] px-3.5 py-2 rounded-xl transition border border-[#f6a400]/40 cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" /> Preencher Exemplo Fictício
          </button>
        </div>

        {/* Alerta de Sucesso */}
        {successMessage && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-sm">{successMessage}</p>
              <p className="text-xs text-emerald-700 mt-1">
                Os dados foram salvos no armazenamento local e já podem ser consultados na lista de registros.
              </p>
            </div>
          </div>
        )}

        {/* Alerta de Erro */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-bold text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* BLOCO 1: SELEÇÃO DA COLMEIA E RESPONSÁVEL */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#07182b] flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-[#f6a400] text-[#07182b] text-xs font-black">
                1
              </span>
              Identificação do Abrigo e Responsável
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Seleção do Abrigo */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Colmeia / Abrigo Visitado *
                </label>
                <select
                  value={shelterId}
                  onChange={(e) => setShelterId(e.target.value)}
                  className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-4 py-3 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:ring-2 focus:ring-[#f6a400]/20 focus:outline-none"
                  required
                >
                  {shelters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — ({s.speciesCommon})
                    </option>
                  ))}
                </select>
                {selectedShelter && (
                  <p className="text-[11px] text-[#526174]">
                    📍 Local: <strong>{selectedShelter.location}</strong> | Espécie: <em>{selectedShelter.species}</em>
                  </p>
                )}
              </div>

              {/* Responsável */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Nome do Meliponicultor / Técnico *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7e8b9b] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Ex: Paulo Ângelo, Maria do Socorro..."
                    className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] pl-10 pr-4 py-3 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:ring-2 focus:ring-[#f6a400]/20 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Data e Hora */}
            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Data da Visita *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#7e8b9b] absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] pl-10 pr-3 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Horário
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#7e8b9b] absolute left-3.5 top-3.5" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] pl-10 pr-3 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSetCurrentTime}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#dccfbd] bg-[#fff3df] hover:bg-[#ffe4b5] text-xs font-bold text-[#c77d00] transition cursor-pointer"
                >
                  🕒 Definir Agora
                </button>
              </div>
            </div>
          </div>

          {/* BLOCO 2: TIPO DE VISITA E CONDIÇÕES */}
          <div className="space-y-4 border-t border-[#dccfbd]/60 pt-6">
            <h3 className="text-base font-bold text-[#07182b] flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-[#f6a400] text-[#07182b] text-xs font-black">
                2
              </span>
              Tipo de Manejo e Avaliação da Colônia
            </h3>

            {/* Tipo de Manejo */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                Tipo de Ação / Visita
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'inspecao', label: 'Inspeção de Rotina', desc: 'Checagem visual' },
                  { id: 'alimentacao', label: 'Alimentação', desc: 'Xarope / Pólen' },
                  { id: 'colheita', label: 'Colheita de Mel', desc: 'Extração segura' },
                  { id: 'divisao', label: 'Divisão', desc: 'Multiplicação' },
                  { id: 'sensores', label: 'Sensores IoT', desc: 'Telemetria BeeCasa' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVisitType(item.id as VisitType)}
                    className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                      visitType === item.id
                        ? 'border-[#f6a400] bg-[#fff3df] text-[#07182b] font-bold shadow-sm'
                        : 'border-[#dccfbd] bg-white text-[#526174] hover:bg-[#fffcf7]'
                    }`}
                  >
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] text-[#7e8b9b] mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Saúde da Colônia */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                Condição Geral da Colônia
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'excelente', label: 'Excelente', color: 'emerald', desc: 'Enxame forte e ativo' },
                  { id: 'boa', label: 'Boa', color: 'blue', desc: 'Desenvolvimento normal' },
                  { id: 'regular', label: 'Regular', color: 'amber', desc: 'Atenção / alimentar' },
                  { id: 'critica', label: 'Crítica', color: 'rose', desc: 'Sinais de perigo' },
                ].map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => setColonyHealth(status.id as ColonyHealth)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      colonyHealth === status.id
                        ? status.id === 'excelente' ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold' :
                          status.id === 'boa' ? 'border-blue-500 bg-blue-50 text-blue-950 font-bold' :
                          status.id === 'regular' ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold' :
                          'border-rose-500 bg-rose-50 text-rose-950 font-bold'
                        : 'border-[#dccfbd] bg-white text-[#526174] hover:bg-[#fffcf7]'
                    }`}
                  >
                    <p className="text-xs font-bold">{status.label}</p>
                    <p className="text-[10px] opacity-80 mt-0.5">{status.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Estado da Rainha e Reservas Alimentares */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Situação da Rainha & Cria
                </label>
                <select
                  value={queenStatus}
                  onChange={(e) => setQueenStatus(e.target.value as QueenStatus)}
                  className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-4 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                >
                  <option value="presente_postura_ativa">👑 Rainha presente com postura ativa (Discos vigorosos)</option>
                  <option value="presente_pouca_postura">⚠️ Rainha presente com pouca postura</option>
                  <option value="nao_avistada">🔍 Rainha não avistada (Inspeção não-invasiva)</option>
                  <option value="realeza_emergindo">🌱 Célula real / Realeza emergindo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                  Reservas de Alimento (Mel & Pólen)
                </label>
                <select
                  value={foodReserves}
                  onChange={(e) => setFoodReserves(e.target.value as FoodReserves)}
                  className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-4 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                >
                  <option value="abundante">🍯 Abundante (Potes de mel e pólen cheios)</option>
                  <option value="suficiente">✅ Suficiente (Manutenção estável)</option>
                  <option value="critico">🚨 Crítico (Necessita alimentação imediata)</option>
                </select>
              </div>
            </div>

            {/* Ocorrência de Pragas e Mel Colhido */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="p-4 rounded-xl border border-[#dccfbd] bg-[#fffcf7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#07182b]">
                    Presença de Pragas / Forídeos?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPestDetected(false)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        !pestDetected ? 'bg-emerald-600 text-white' : 'bg-white border text-gray-600'
                      }`}
                    >
                      Não
                    </button>
                    <button
                      type="button"
                      onClick={() => setPestDetected(true)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        pestDetected ? 'bg-rose-600 text-white' : 'bg-white border text-gray-600'
                      }`}
                    >
                      Sim
                    </button>
                  </div>
                </div>

                {pestDetected && (
                  <input
                    type="text"
                    value={pestDetails}
                    onChange={(e) => setPestDetails(e.target.value)}
                    placeholder="Descreva a praga e medida adotada (ex: forídeo, vinagre)..."
                    className="w-full rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs text-rose-900 focus:outline-none"
                  />
                )}
              </div>

              {visitType === 'colheita' ? (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                    Mel Colhido (Kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={honeyHarvestedKg}
                    onChange={(e) => setHoneyHarvestedKg(e.target.value)}
                    placeholder="Ex: 1.5 kg"
                    className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] px-4 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                    Temperatura Observada (°C)
                  </label>
                  <div className="relative">
                    <Thermometer className="w-4 h-4 text-[#f6a400] absolute left-3.5 top-3" />
                    <input
                      type="number"
                      step="0.1"
                      value={temperatureObserved}
                      onChange={(e) => setTemperatureObserved(e.target.value)}
                      placeholder="Ex: 28.5"
                      className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] pl-10 pr-4 py-2.5 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Observações Livres */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#07182b]">
                Observações de Campo & Recomendações
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Enxame calmo, própolis bem vedada na entrada, sem necessidade de alimentação artificial..."
                className="w-full rounded-xl border border-[#dccfbd] bg-[#fffcf7] p-3 text-sm text-[#07182b] font-medium focus:border-[#f6a400] focus:ring-2 focus:ring-[#f6a400]/20 focus:outline-none"
              />
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="border-t border-[#dccfbd]/60 pt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#dccfbd] bg-white text-sm font-bold text-[#526174] hover:bg-gray-50 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#f6a400] px-8 py-3.5 text-sm font-extrabold text-[#07182b] shadow-[0_10px_25px_rgba(246,164,0,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ffb61b] active:translate-y-0 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Registro de Visita</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
