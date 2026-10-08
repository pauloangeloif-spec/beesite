'use client'

import React, { useState, useEffect } from 'react'
import { Shelter, Visit } from '@/types/beecasa'
import { loadShelters, loadVisits, addVisit, deleteVisit, resetDemoData } from '@/lib/storage'
import { Navbar } from '@/components/Navbar'
import { DashboardOverview } from '@/components/DashboardOverview'
import { ShelterList } from '@/components/ShelterList'
import { VisitForm } from '@/components/VisitForm'
import { VisitList } from '@/components/VisitList'
import { BeeCasaAbout } from '@/components/BeeCasaAbout'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'shelters' | 'new-visit' | 'visits' | 'about'>('overview')
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [userRole, setUserRole] = useState('Meliponicultor')
  const [isClientLoaded, setIsClientLoaded] = useState(false)

  // Carrega os dados persistidos no navegador
  useEffect(() => {
    setShelters(loadShelters())
    setVisits(loadVisits())
    setIsClientLoaded(true)
  }, [])

  const handleVisitCreated = (visitData: Omit<Visit, 'id' | 'createdAt'>) => {
    const created = addVisit(visitData)
    // Atualiza estados locais
    setVisits(loadVisits())
    setShelters(loadShelters())
    // Redireciona para a aba de consulta de visitas
    setActiveTab('visits')
  }

  const handleDeleteVisit = (id: string) => {
    deleteVisit(id)
    setVisits(loadVisits())
    setShelters(loadShelters())
  }

  const handleResetDemoData = () => {
    if (confirm('Deseja restaurar os dados originais fictícios de demonstração?')) {
      resetDemoData()
      setShelters(loadShelters())
      setVisits(loadVisits())
    }
  }

  const handleSelectShelterForVisit = (shelterId: string) => {
    setActiveTab('new-visit')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffcf7] text-[#07182b]">
      {/* Barra de Navegação Superior */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Conteúdo Principal com Container Max-Width */}
      <main className="flex-1 mx-auto w-full max-w-[1536px] px-4 sm:px-8 py-8">
        {!isClientLoaded ? (
          <div className="flex h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#c77d00]">
              <span className="w-5 h-5 border-2 border-[#f6a400] border-t-transparent rounded-full animate-spin"></span>
              Carregando dados das colmeias BeeCasa...
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <DashboardOverview
                shelters={shelters}
                visits={visits}
                onNewVisit={() => setActiveTab('new-visit')}
                onViewVisits={() => setActiveTab('visits')}
                onViewShelters={() => setActiveTab('shelters')}
              />
            )}

            {activeTab === 'shelters' && (
              <ShelterList
                shelters={shelters}
                onSelectShelterForVisit={handleSelectShelterForVisit}
              />
            )}

            {activeTab === 'new-visit' && (
              <VisitForm
                shelters={shelters}
                onVisitCreated={handleVisitCreated}
                onCancel={() => setActiveTab('overview')}
                currentVisitorName={
                  userRole === 'Meliponicultor'
                    ? 'Paulo Ângelo'
                    : userRole === 'Produtor Rural'
                    ? 'Maria do Socorro'
                    : 'Dra. Beatriz Mendes'
                }
                currentVisitorRole={userRole}
              />
            )}

            {activeTab === 'visits' && (
              <VisitList
                visits={visits}
                shelters={shelters}
                onDeleteVisit={handleDeleteVisit}
                onNewVisit={() => setActiveTab('new-visit')}
                onResetData={handleResetDemoData}
              />
            )}

            {activeTab === 'about' && <BeeCasaAbout />}
          </>
        )}

        {/* Rodapé Bioinspirado */}
        <Footer onNavigate={(tab) => setActiveTab(tab)} />
      </main>
    </div>
  )
}
