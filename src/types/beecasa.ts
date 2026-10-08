export type ColonyHealth = 'excelente' | 'boa' | 'regular' | 'critica'
export type QueenStatus = 'presente_postura_ativa' | 'presente_pouca_postura' | 'nao_avistada' | 'realeza_emergindo'
export type FoodReserves = 'abundante' | 'suficiente' | 'critico'
export type VisitType = 'inspecao' | 'alimentacao' | 'colheita' | 'divisao' | 'sensores'

export interface Shelter {
  id: string
  name: string
  code: string
  species: string
  speciesCommon: string
  location: string
  installedDate: string
  status: 'forte' | 'estavel' | 'atencao'
  temperature: number
  humidity: number
  batteryLevel: number
  lastVisitDate?: string
  targetAudience: 'Meliponicultor' | 'Produtor Rural' | 'Instituição / Projeto'
  notes: string
}

export interface Visit {
  id: string
  shelterId: string
  shelterName: string
  date: string
  time: string
  visitorName: string
  visitorRole: string
  visitType: VisitType
  colonyHealth: ColonyHealth
  queenStatus: QueenStatus
  foodReserves: FoodReserves
  pestDetected: boolean
  pestDetails?: string
  temperatureObserved?: number
  honeyHarvestedKg?: number
  notes: string
  createdAt: string
}
