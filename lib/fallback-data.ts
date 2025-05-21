// Dati di fallback per quando l'API WordPress non è disponibile

export const fallbackTrainers = [
  {
    id: 1,
    slug: "marco-rossi",
    title: {
      rendered: "Marco Rossi",
    },
    content: {
      rendered:
        "<p>Marco è un personal trainer certificato con oltre 10 anni di esperienza nel fitness e nel bodybuilding. Si specializza in allenamenti di forza e condizionamento.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Marco+Rossi",
    acf: {
      role: "Personal Trainer",
      specialties: "Allenamento di forza\nBodybuilding\nPerdita di peso\nCondizionamento",
      certifications: "Certificazione ISSA Personal Trainer\nSpecialista in nutrizione sportiva\nPrimo soccorso e RCP",
      schedule_monday: "9:00 - 18:00",
      schedule_wednesday: "9:00 - 18:00",
      schedule_friday: "9:00 - 18:00",
      instagram_url: "https://instagram.com",
      facebook_url: "https://facebook.com",
    },
  },
  {
    id: 2,
    slug: "laura-bianchi",
    title: {
      rendered: "Laura Bianchi",
    },
    content: {
      rendered:
        "<p>Laura è un'istruttrice di yoga e pilates con una passione per il benessere olistico. Il suo approccio combina movimento, respirazione e consapevolezza.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Laura+Bianchi",
    acf: {
      role: "Istruttrice di Yoga e Pilates",
      specialties: "Yoga Vinyasa\nPilates Reformer\nMeditazione\nYoga prenatale",
      certifications: "RYT 500 Yoga Alliance\nCertificazione Pilates Reformer\nFormazione in yoga terapeutico",
      schedule_tuesday: "10:00 - 19:00",
      schedule_thursday: "10:00 - 19:00",
      schedule_saturday: "9:00 - 14:00",
      instagram_url: "https://instagram.com",
    },
  },
  {
    id: 3,
    slug: "alessandro-verdi",
    title: {
      rendered: "Alessandro Verdi",
    },
    content: {
      rendered:
        "<p>Alessandro è specializzato in allenamento funzionale e riabilitazione. Aiuta i clienti a recuperare da infortuni e migliorare la loro mobilità e forza.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Alessandro+Verdi",
    acf: {
      role: "Specialista in Allenamento Funzionale",
      specialties: "Riabilitazione sportiva\nAllenamento funzionale\nMobilità articolare\nPrevenzione infortuni",
      certifications:
        "Laurea in Scienze Motorie\nCertificazione in Allenamento Funzionale\nSpecialista in riabilitazione sportiva",
      schedule_monday: "14:00 - 20:00",
      schedule_wednesday: "14:00 - 20:00",
      schedule_friday: "14:00 - 20:00",
      instagram_url: "https://instagram.com",
      facebook_url: "https://facebook.com",
    },
  },
]

export const fallbackCourses = [
  {
    id: 1,
    slug: "pilates-reformer",
    title: {
      rendered: "Pilates Reformer",
    },
    content: {
      rendered:
        "<p>Il Pilates Reformer è un allenamento completo che utilizza una macchina speciale per aggiungere resistenza agli esercizi di Pilates. Questo corso ti aiuterà a migliorare la forza, la flessibilità e la postura.</p><p>Durante le lezioni, lavorerai su tutti i gruppi muscolari con particolare attenzione al core. Gli esercizi sono adattabili a tutti i livelli di fitness e possono essere modificati per affrontare esigenze specifiche o limitazioni.</p>",
    },
    excerpt: {
      rendered:
        "<p>Un allenamento completo che utilizza il Reformer per migliorare forza, flessibilità e postura con particolare attenzione al core.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Pilates+Reformer",
    acf: {
      level: "Tutti i livelli",
      duration: "50 minuti",
      max_participants: 8,
      schedule: "Lunedì: 10:00, 17:00\nMercoledì: 10:00, 17:00\nVenerdì: 10:00, 17:00",
      benefits:
        "Migliora la postura\nRafforza il core\nAumenta la flessibilità\nRiduce il dolore alla schiena\nMigliora l'equilibrio",
      requirements: "Abbigliamento comodo\nCalzini antiscivolo\nAsciugamano personale",
      calories: "350-450",
    },
  },
  {
    id: 2,
    slug: "ems-training",
    title: {
      rendered: "EMS Training",
    },
    content: {
      rendered:
        "<p>L'EMS (Electrical Muscle Stimulation) Training è un metodo di allenamento innovativo che utilizza impulsi elettrici per intensificare la contrazione muscolare durante l'esercizio. Una sessione di 20 minuti equivale a circa 90 minuti di allenamento tradizionale.</p><p>Durante la sessione, indosserai una tuta speciale che invia impulsi elettrici ai tuoi muscoli mentre esegui esercizi semplici. Questo tipo di allenamento è particolarmente efficace per la tonificazione muscolare, la perdita di peso e il miglioramento della forza.</p>",
    },
    excerpt: {
      rendered:
        "<p>Un metodo di allenamento innovativo che utilizza impulsi elettrici per intensificare la contrazione muscolare, offrendo risultati in meno tempo.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=EMS+Training",
    acf: {
      level: "Tutti i livelli",
      duration: "20 minuti",
      max_participants: 2,
      schedule:
        "Martedì: 9:00-19:00 (su appuntamento)\nGiovedì: 9:00-19:00 (su appuntamento)\nSabato: 9:00-13:00 (su appuntamento)",
      benefits:
        "Allenamento efficiente (20 min = 90 min di palestra)\nTonificazione muscolare rapida\nMiglioramento della postura\nRiduzione del dolore alla schiena\nAumento della forza",
      requirements: "Abbigliamento intimo sportivo\nPortare acqua\nNon mangiare 2 ore prima",
      calories: "500-700",
    },
  },
  {
    id: 3,
    slug: "functional-training",
    title: {
      rendered: "Functional Training",
    },
    content: {
      rendered:
        "<p>Il Functional Training è un tipo di allenamento che prepara il corpo per le attività quotidiane. Gli esercizi simulano movimenti comuni che potresti fare a casa, al lavoro o nello sport, aiutandoti a migliorare l'equilibrio, la coordinazione e la forza.</p><p>Le lezioni includono una varietà di esercizi utilizzando il peso corporeo, kettlebell, palle mediche, TRX e altri attrezzi. Questo tipo di allenamento è eccellente per migliorare la tua forma fisica generale e prevenire infortuni.</p>",
    },
    excerpt: {
      rendered:
        "<p>Un allenamento che prepara il corpo per le attività quotidiane, migliorando equilibrio, coordinazione e forza attraverso movimenti funzionali.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Functional+Training",
    acf: {
      level: "Tutti i livelli",
      duration: "45 minuti",
      max_participants: 12,
      schedule: "Lunedì: 18:30\nMercoledì: 18:30\nVenerdì: 18:30",
      benefits:
        "Migliora la forza funzionale\nAumenta la mobilità\nMigliora la coordinazione\nRafforza il core\nPreviene gli infortuni",
      requirements: "Scarpe da ginnastica\nAbbigliamento comodo\nAsciugamano\nBottiglia d'acqua",
      calories: "400-600",
    },
  },
]

export const fallbackBlogPosts = [
  {
    id: 1,
    slug: "benefici-pilates-reformer",
    title: {
      rendered: "I 5 principali benefici del Pilates Reformer",
    },
    content: {
      rendered:
        "<p>Il Pilates Reformer è una forma di esercizio che utilizza una macchina speciale per aggiungere resistenza agli esercizi di Pilates tradizionali. Ecco i 5 principali benefici di questa pratica:</p><h3>1. Migliora la postura</h3><p>Il Pilates Reformer lavora sui muscoli profondi che supportano la colonna vertebrale, aiutando a correggere squilibri muscolari e migliorare l'allineamento del corpo.</p><h3>2. Aumenta la forza del core</h3><p>Gli esercizi di Pilates Reformer si concentrano sul rafforzamento dei muscoli addominali, lombari e pelvici, creando un core forte che è fondamentale per tutte le attività quotidiane.</p><h3>3. Migliora la flessibilità</h3><p>Il Reformer permette di eseguire movimenti in un range completo, aumentando gradualmente la flessibilità senza stress eccessivo sulle articolazioni.</p><h3>4. Riduce il dolore alla schiena</h3><p>Rafforzando i muscoli di supporto e migliorando la postura, il Pilates Reformer può aiutare a ridurre il dolore cronico alla schiena e prevenire futuri problemi.</p><h3>5. Offre un allenamento completo</h3><p>Nonostante sia a basso impatto, il Pilates Reformer offre un allenamento completo che tonifica i muscoli, migliora la resistenza e può anche contribuire alla perdita di peso quando combinato con una dieta equilibrata.</p>",
    },
    excerpt: {
      rendered:
        "<p>Scopri i cinque principali benefici del Pilates Reformer e come questa pratica può migliorare la tua postura, forza e benessere generale.</p>",
    },
    date: "2023-05-15T10:00:00",
    modified: "2023-05-15T10:00:00",
    author: 1,
    author_name: "Laura Bianchi",
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Pilates+Reformer",
    categories: [1, 3],
    category_names: ["Pilates", "Benessere"],
  },
  {
    id: 2,
    slug: "guida-ems-training",
    title: {
      rendered: "Guida completa all'EMS Training: cos'è e come funziona",
    },
    content: {
      rendered:
        "<p>L'EMS (Electrical Muscle Stimulation) Training è una metodologia di allenamento innovativa che sta guadagnando popolarità. Ecco tutto quello che devi sapere:</p><h3>Cos'è l'EMS Training?</h3><p>L'EMS Training utilizza impulsi elettrici a bassa frequenza per stimolare i muscoli durante l'esercizio. Questi impulsi causano contrazioni muscolari più intense rispetto all'allenamento tradizionale, permettendo di ottenere risultati in meno tempo.</p><h3>Come funziona una sessione?</h3><p>Durante una sessione di EMS Training, indosserai una tuta speciale dotata di elettrodi posizionati sui principali gruppi muscolari. Mentre esegui esercizi semplici, la tuta invia impulsi elettrici ai tuoi muscoli, intensificando l'allenamento.</p><h3>Quali sono i benefici?</h3><p>- Efficienza: una sessione di 20 minuti equivale a circa 90 minuti di allenamento tradizionale<br>- Tonificazione muscolare rapida<br>- Miglioramento della postura<br>- Riduzione del dolore alla schiena<br>- Aumento della forza e della resistenza</p><h3>È adatto a tutti?</h3><p>L'EMS Training è generalmente sicuro per la maggior parte delle persone, ma ci sono alcune controindicazioni. Non è consigliato per donne in gravidanza, persone con pacemaker, epilessia, o determinate condizioni cardiache. È sempre meglio consultare un medico prima di iniziare.</p><h3>Quanto spesso dovrei allenarmi?</h3><p>Per risultati ottimali, si consiglia di fare 1-2 sessioni di EMS Training alla settimana. Poiché l'allenamento è intenso, il corpo ha bisogno di tempo per recuperare tra le sessioni.</p>",
    },
    excerpt: {
      rendered:
        "<p>Scopri cos'è l'EMS Training, come funziona, quali sono i suoi benefici e se è adatto a te in questa guida completa.</p>",
    },
    date: "2023-06-20T14:30:00",
    modified: "2023-06-20T14:30:00",
    author: 2,
    author_name: "Alessandro Verdi",
    featured_image_url: "/placeholder.svg?height=600&width=600&text=EMS+Training",
    categories: [2, 4],
    category_names: ["Fitness", "Tecnologia"],
  },
  {
    id: 3,
    slug: "alimentazione-pre-post-allenamento",
    title: {
      rendered: "Alimentazione pre e post allenamento: cosa mangiare per massimizzare i risultati",
    },
    content: {
      rendered:
        "<p>L'alimentazione gioca un ruolo fondamentale nel determinare i risultati del tuo allenamento. Ecco una guida su cosa mangiare prima e dopo l'esercizio fisico:</p><h3>Alimentazione pre-allenamento</h3><p>L'obiettivo principale dell'alimentazione pre-allenamento è fornire energia per la sessione di allenamento imminente. Idealmente, dovresti mangiare 1-3 ore prima dell'allenamento.</p><p><strong>Cosa mangiare:</strong></p><ul><li>Carboidrati a digestione lenta: avena, pane integrale, riso integrale</li><li>Proteine magre: yogurt greco, uova, petto di pollo</li><li>Grassi sani in piccole quantità: avocado, noci, semi</li></ul><p><strong>Esempi di spuntini pre-allenamento:</strong></p><ul><li>Yogurt greco con frutta e miele</li><li>Toast integrale con uova strapazzate</li><li>Banana con burro di mandorle</li></ul><h3>Alimentazione post-allenamento</h3><p>Dopo l'allenamento, il tuo corpo ha bisogno di nutrienti per riparare i muscoli e ricostituire le riserve di glicogeno. Idealmente, dovresti mangiare entro 30-60 minuti dopo l'allenamento.</p><p><strong>Cosa mangiare:</strong></p><ul><li>Proteine di alta qualità: pollo, pesce, tofu, whey protein</li><li>Carboidrati a rapido assorbimento: frutta, riso bianco, patate dolci</li><li>Antiossidanti: frutta e verdura colorata</li></ul><p><strong>Esempi di pasti post-allenamento:</strong></p><ul><li>Frullato proteico con banana e spinaci</li><li>Petto di pollo con riso e verdure</li><li>Salmone con patate dolci e broccoli</li></ul><h3>Idratazione</h3><p>Non dimenticare l'importanza dell'idratazione! Bevi acqua prima, durante e dopo l'allenamento per mantenere le prestazioni ottimali e favorire il recupero.</p>",
    },
    excerpt: {
      rendered:
        "<p>Scopri cosa mangiare prima e dopo l'allenamento per massimizzare i tuoi risultati e migliorare il recupero muscolare.</p>",
    },
    date: "2023-07-10T09:15:00",
    modified: "2023-07-10T09:15:00",
    author: 3,
    author_name: "Marco Rossi",
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Alimentazione+Sportiva",
    categories: [5, 6],
    category_names: ["Nutrizione", "Fitness"],
  },
]

export const fallbackGalleryImages = [
  {
    id: 1,
    slug: "sala-pilates",
    title: {
      rendered: "Sala Pilates",
    },
    content: {
      rendered:
        "<p>La nostra sala Pilates completamente attrezzata con Reformer, Cadillac e altri attrezzi professionali.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Sala+Pilates",
    acf: {
      category: "struttura",
    },
  },
  {
    id: 2,
    slug: "area-functional-training",
    title: {
      rendered: "Area Functional Training",
    },
    content: {
      rendered: "<p>Area dedicata all'allenamento funzionale con TRX, kettlebell, palle mediche e altro.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Functional+Training",
    acf: {
      category: "struttura",
    },
  },
  {
    id: 3,
    slug: "sala-ems",
    title: {
      rendered: "Sala EMS Training",
    },
    content: {
      rendered: "<p>La nostra sala dedicata all'EMS Training con attrezzature all'avanguardia.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=EMS+Training",
    acf: {
      category: "struttura",
    },
  },
  {
    id: 4,
    slug: "lezione-pilates-gruppo",
    title: {
      rendered: "Lezione di Pilates di Gruppo",
    },
    content: {
      rendered: "<p>Una delle nostre popolari lezioni di Pilates di gruppo.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Lezione+Pilates",
    acf: {
      category: "lezioni",
    },
  },
  {
    id: 5,
    slug: "personal-training",
    title: {
      rendered: "Sessione di Personal Training",
    },
    content: {
      rendered: "<p>Un trainer che segue un cliente durante una sessione personalizzata.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Personal+Training",
    acf: {
      category: "lezioni",
    },
  },
  {
    id: 6,
    slug: "area-relax",
    title: {
      rendered: "Area Relax",
    },
    content: {
      rendered: "<p>La nostra area relax dove i clienti possono riposarsi dopo l'allenamento.</p>",
    },
    featured_image_url: "/placeholder.svg?height=600&width=600&text=Area+Relax",
    acf: {
      category: "struttura",
    },
  },
]
