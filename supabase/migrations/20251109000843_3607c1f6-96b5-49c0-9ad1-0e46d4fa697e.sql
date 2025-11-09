-- ATECH CUSTOM - Tables pour système de réservation avec agent vocal

-- Table de configuration business
CREATE TABLE business_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT DEFAULT 'ATECH CUSTOM',
  business_type TEXT DEFAULT 'salon',
  services JSONB DEFAULT '[]'::jsonb,
  business_hours JSONB DEFAULT '{}'::jsonb,
  google_calendar_id TEXT,
  google_calendar_refresh_token TEXT,
  booking_buffer_minutes INT DEFAULT 15,
  owner_notification_email TEXT DEFAULT 'contact@atech-custom.fr',
  retell_phone_number TEXT,
  retell_agent_id TEXT,
  ai_instructions TEXT DEFAULT 'Réceptionniste aimable.',
  confirmation_template TEXT DEFAULT 'Bonjour {name}! RDV {service} le {date} à {time}.',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE business_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_business_config" ON business_config FOR ALL USING (true) WITH CHECK (true);

-- Insérer configuration par défaut
INSERT INTO business_config (business_name, business_type, services, business_hours, ai_instructions) VALUES (
  'ATECH CUSTOM Salon',
  'salon',
  '[{"name":"Coupe","duration":60,"price":50},{"name":"Coloration","duration":120,"price":100},{"name":"Coiffage","duration":45,"price":35}]'::jsonb,
  '{"lundi":{"open":"09:00","close":"18:00"},"mardi":{"open":"09:00","close":"18:00"},"mercredi":{"open":"09:00","close":"18:00"},"jeudi":{"open":"09:00","close":"18:00"},"vendredi":{"open":"09:00","close":"18:00"},"samedi":{"open":"10:00","close":"16:00"},"dimanche":{"open":null,"close":null}}'::jsonb,
  'Vous êtes réceptionniste ATECH CUSTOM Salon. Services: Coupe 60min 50€, Coloration 120min 100€, Coiffage 45min 35€. Workflow: 1) Accueil chaleureux 2) Identifier service 3) Demander date 4) Vérifier calendrier 5) Proposer créneaux 6) Collecter nom 7) Collecter email 8) Confirmer 9) Créer RDV. Règles: Toujours vérifier calendrier avant proposer horaires. Obtenir nom ET email obligatoire. Reformuler avant valider.'
);

-- Table des logs d'appels
CREATE TABLE call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_phone TEXT,
  customer_name TEXT,
  customer_email TEXT,
  retell_call_id TEXT UNIQUE,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT,
  outcome TEXT DEFAULT 'en-cours' CHECK (outcome IN ('en-cours','réservé','non-réservé','manqué')),
  transcript JSONB DEFAULT '[]'::jsonb,
  appointment_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_call_logs" ON call_logs FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX idx_call_logs_email ON call_logs(customer_email);
CREATE INDEX idx_call_logs_retell ON call_logs(retell_call_id);
CREATE INDEX idx_call_logs_outcome ON call_logs(outcome);

-- Table des rendez-vous
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_log_id UUID REFERENCES call_logs(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  price DECIMAL(10,2),
  status TEXT DEFAULT 'confirmé' CHECK (status IN ('confirmé','en-attente','annulé','terminé')),
  google_calendar_event_id TEXT,
  confirmation_sent BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_appointments" ON appointments FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_email ON appointments(customer_email);

-- Enable realtime pour les updates en temps réel
ALTER PUBLICATION supabase_realtime ADD TABLE appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE call_logs;