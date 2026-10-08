import { Shelter, Visit } from '@/types/beecasa'
import { INITIAL_SHELTERS, INITIAL_VISITS } from './mockData'

const STORAGE_KEYS = {
  SHELTERS: 'beecasa_shelters_v1',
  VISITS: 'beecasa_visits_v1',
}

export function loadShelters(): Shelter[] {
  if (typeof window === 'undefined') return INITIAL_SHELTERS
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHELTERS)
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(INITIAL_SHELTERS))
      return INITIAL_SHELTERS
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error('Erro ao ler abrigos do localStorage:', err)
    return INITIAL_SHELTERS
  }
}

export function saveShelters(shelters: Shelter[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(shelters))
  } catch (err) {
    console.error('Erro ao salvar abrigos no localStorage:', err)
  }
}

export function loadVisits(): Visit[] {
  if (typeof window === 'undefined') return INITIAL_VISITS
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VISITS)
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(INITIAL_VISITS))
      return INITIAL_VISITS
    }
    const parsed: Visit[] = JSON.parse(raw)
    // Ordena do mais recente para o mais antigo
    return parsed.sort((a, b) => new Date(`${b.date}T${b.time || '00:00'}`).getTime() - new Date(`${a.date}T${a.time || '00:00'}`).getTime())
  } catch (err) {
    console.error('Erro ao ler visitas do localStorage:', err)
    return INITIAL_VISITS
  }
}

export function saveVisits(visits: Visit[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(visits))
  } catch (err) {
    console.error('Erro ao salvar visitas no localStorage:', err)
  }
}

export function addVisit(visitData: Omit<Visit, 'id' | 'createdAt'>): Visit {
  const current = loadVisits()
  const newVisit: Visit = {
    ...visitData,
    id: `VIS-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  }

  const updated = [newVisit, ...current]
  saveVisits(updated)

  // Atualiza última visita no abrigo correspondente
  const shelters = loadShelters()
  const shelterIndex = shelters.findIndex((s) => s.id === newVisit.shelterId)
  if (shelterIndex >= 0) {
    shelters[shelterIndex].lastVisitDate = newVisit.date
    // Se a saúde for crítica ou regular, atualiza o status do abrigo
    if (newVisit.colonyHealth === 'critica') {
      shelters[shelterIndex].status = 'atencao'
    } else if (newVisit.colonyHealth === 'excelente') {
      shelters[shelterIndex].status = 'forte'
    }
    saveShelters(shelters)
  }

  return newVisit
}

export function deleteVisit(visitId: string): boolean {
  const current = loadVisits()
  const filtered = current.filter((v) => v.id !== visitId)
  saveVisits(filtered)
  return true
}

export function resetDemoData() {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SHELTERS, JSON.stringify(INITIAL_SHELTERS))
  localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(INITIAL_VISITS))
}
