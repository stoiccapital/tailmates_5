export default function SolutionsPage() {
  const solutions = [
    {
      title: 'Kunden & Patienten',
      description: 'Verwalte alle Stammdaten, Historien und Kommunikationsdaten deiner Kunden und Patienten an einem Ort.'
    },
    {
      title: 'Registrierkasse',
      description: 'Integrierte Kassenlösung mit gesetzeskonformer Belegerstellung und täglichem Kassenabschluss.'
    },
    {
      title: 'Bestellungen',
      description: 'Behalte den Überblick über alle offenen und abgeschlossenen Bestellungen für deine Praxis.'
    },
    {
      title: 'Aktuelle Preise',
      description: 'Verwalte und aktualisiere deine Preislisten zentral – für Behandlungen, Produkte und Leistungen.'
    },
    {
      title: 'Dokumente',
      description: 'Sichere und verwalte alle wichtigen Praxisunterlagen digital und jederzeit abrufbar.'
    },
    {
      title: 'Termine',
      description: 'Intelligente Terminverwaltung mit Kalenderansicht, Erinnerungen und Onlinebuchung.'
    },
    {
      title: 'Rechnungen',
      description: 'Erstelle professionelle Rechnungen mit wenigen Klicks – automatisch und rechtskonform.'
    },
    {
      title: 'Lieferscheine',
      description: 'Generiere Lieferscheine direkt aus dem System – übersichtlich und nachvollziehbar.'
    },
    {
      title: 'Inventuren',
      description: 'Plane und dokumentiere regelmäßige Inventuren effizient und rechtssicher.'
    },
    {
      title: 'Vorlagen',
      description: 'Nutze praxisgerechte Text- und Behandlungs­vorlagen für eine schnellere Dokumentation.'
    },
    {
      title: 'Behandlungen',
      description: 'Erstelle und dokumentiere alle Behandlungen strukturiert mit Verlauf und Ergebnissen.'
    },
    {
      title: 'Mahnungen',
      description: 'Automatisierter Mahnprozess für ausstehende Zahlungen – inkl. Eskalationsstufen.'
    },
    {
      title: 'Lager',
      description: 'Behalte deinen Lagerbestand im Blick – mit Benachrichtigung bei Mindestmengen.'
    },
    {
      title: 'Labor & Röntgen',
      description: 'Integriere Labor- und Röntgenberichte direkt in den Patientenakten.'
    },
    {
      title: 'Smartphone-App',
      description: 'Mobiler Zugriff auf alle wichtigen Funktionen – jederzeit und überall.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unsere Lösungen
          </h1>
          <p className="text-xl text-gray-600">
            Alles was Sie für Ihre Praxis benötigen
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {solution.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 