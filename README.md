# Praxis Management Software

Eine moderne Praxisverwaltungssoftware für Ärzte und medizinisches Personal, entwickelt mit Next.js 14, TypeScript, Tailwind CSS und Supabase.

## 🚀 Features

### Marketing Website
- **Landing Page** - Professionelle Präsentation der Software
- **About Page** - Informationen über das Unternehmen und Team
- **Contact Page** - Kontaktformular und Kontaktdaten
- **Login Page** - Sichere Anmeldung mit Supabase

### Web Application (Dashboard)
- **Dashboard** - Übersicht über Praxisstatistiken und aktuelle Termine
- **Patienten (Karteikarte)** - Vollständige Patientenverwaltung
- **Kalender** - Terminplanung und -verwaltung
- **Wartezimmer** - Überwachung des Praxisablaufs
- **Tagesprotokoll** - Dokumentation von Behandlungen
- **Stammdaten** - Verwaltung grundlegender Praxisdaten
- **Bestandverwaltung** - Medikamente und Materialien
- **Laborbuch** - Laborergebnisse und Untersuchungen
- **Nachrichten** - Interne und externe Kommunikation
- **Finanzen** - Praxisfinanzen und Abrechnungen

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 14 mit App Router
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Language**: TypeScript
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)

## 📋 Voraussetzungen

- Node.js 18+ 
- npm oder yarn
- Supabase Account

## 🚀 Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd praxis-management
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**
   
   Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Supabase Setup**
   
   - Erstellen Sie ein neues Supabase Projekt
   - Führen Sie die folgenden SQL-Befehle in der Supabase SQL Editor aus:

   ```sql
   -- Patienten Tabelle
   CREATE TABLE patients (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     first_name VARCHAR NOT NULL,
     last_name VARCHAR NOT NULL,
     date_of_birth DATE NOT NULL,
     email VARCHAR NOT NULL,
     phone VARCHAR,
     address TEXT,
     insurance_number VARCHAR,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Termine Tabelle
   CREATE TABLE appointments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
     title VARCHAR NOT NULL,
     description TEXT,
     start_time TIMESTAMP WITH TIME ZONE NOT NULL,
     end_time TIMESTAMP WITH TIME ZONE NOT NULL,
     status VARCHAR DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'cancelled', 'completed')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- RLS (Row Level Security) aktivieren
   ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
   ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

   -- Policies für authentifizierte Benutzer
   CREATE POLICY "Users can view own patients" ON patients
     FOR SELECT USING (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can insert own patients" ON patients
     FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can update own patients" ON patients
     FOR UPDATE USING (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can delete own patients" ON patients
     FOR DELETE USING (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can view own appointments" ON appointments
     FOR SELECT USING (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can insert own appointments" ON appointments
     FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can update own appointments" ON appointments
     FOR UPDATE USING (auth.uid() IS NOT NULL);

   CREATE POLICY "Users can delete own appointments" ON appointments
     FOR DELETE USING (auth.uid() IS NOT NULL);
   ```

5. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

6. **Browser öffnen**
   
   Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 🔐 Demo-Anmeldedaten

Für Testzwecke können Sie folgende Anmeldedaten verwenden:
- **E-Mail**: admin@praxis.de
- **Passwort**: password123

## 📁 Projektstruktur

```
praxis-management/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard-Seiten
│   │   │   ├── patients/       # Patientenverwaltung
│   │   │   ├── calendar/       # Kalender
│   │   │   ├── waiting-room/   # Wartezimmer
│   │   │   ├── journal/        # Tagesprotokoll
│   │   │   ├── masterdata/     # Stammdaten
│   │   │   ├── inventory/      # Bestandverwaltung
│   │   │   ├── lab-book/       # Laborbuch
│   │   │   ├── messages/       # Nachrichten
│   │   │   ├── finances/       # Finanzen
│   │   │   ├── layout.tsx      # Dashboard Layout
│   │   │   └── page.tsx        # Dashboard Home
│   │   ├── about/              # About Page
│   │   ├── contact/            # Contact Page
│   │   ├── login/              # Login Page
│   │   ├── globals.css         # Global Styles
│   │   ├── layout.tsx          # Root Layout
│   │   └── page.tsx            # Landing Page
│   ├── components/             # React Components
│   │   ├── Navbar.tsx          # Navigation Bar
│   │   ├── Sidebar.tsx         # Dashboard Sidebar
│   │   ├── PatientCard.tsx     # Patient Card Component
│   │   └── Calendar.tsx        # Calendar Component
│   └── lib/                    # Utility Functions
│       ├── auth.ts             # Authentication Functions
│       ├── db.ts               # Database Functions
│       └── supabase.ts         # Supabase Client
├── public/                     # Static Assets
├── middleware.ts               # Next.js Middleware
└── package.json
```

## 🎨 Design-System

Die Anwendung verwendet Tailwind CSS mit einem konsistenten Design-System:

- **Farben**: Blau als Primärfarbe (#2563eb)
- **Schriftarten**: Geist Sans (System Font)
- **Komponenten**: Moderne, responsive UI-Komponenten
- **Mobile-First**: Vollständig responsive Design

## 🔒 Sicherheit

- **Authentication**: Supabase Auth mit JWT-Tokens
- **Authorization**: Row Level Security (RLS) in der Datenbank
- **Middleware**: Automatische Route-Protection für Dashboard
- **Environment Variables**: Sichere Konfiguration

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Vercel Account erstellen**
2. **GitHub Repository verbinden**
3. **Environment Variables setzen**
4. **Deploy**

### Andere Plattformen

Die Anwendung kann auf jeder Node.js-kompatiblen Plattform deployed werden:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📝 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 📞 Support

Bei Fragen oder Problemen:
- Erstellen Sie ein Issue im GitHub Repository
- Kontaktieren Sie das Entwicklungsteam

## 🔄 Updates

Regelmäßige Updates und Verbesserungen werden über GitHub Releases bereitgestellt.

---

**Entwickelt mit ❤️ für die medizinische Praxis**
