// ============================================
// ESTADO DEL JUEGO
// ============================================

const gameState = {
    level: 1,
    currentQuestion: 0,
    totalQuestions: 6,
    lives: 4,
    points: 0,
    correctAnswers: 0,
    usedQuestions: new Set(),
    currentCategory: null,
    isSpinning: false,
    timer: null,
    timeLeft: 20,
    currentRotation: 0  // Ángulo actual de la ruleta en grados
};

// ============================================
// CONFIGURACIÓN DE CATEGORÍAS
// ============================================

const categories = [
    { id: 'deportes', name: 'Deportes', avatar: 'hincha.png', angle: 0 },
    { id: 'historia', name: 'Historia argentina', avatar: 'abuelita_mate.png', angle: 51.43 },
    { id: 'musica', name: 'Música nacional', avatar: 'rockera.png', angle: 102.86 },
    { id: 'geografia', name: 'Geografía argentina', avatar: 'carpincho_mate.png', angle: 154.29 },
    { id: 'cine', name: 'Cine y TV', avatar: 'director.png', angle: 205.71 },
    { id: 'tradiciones', name: 'Tradiciones y costumbres', avatar: 'gaucho.png', angle: 257.14 },
    { id: 'ciencia', name: 'Ciencia y tecnología', avatar: 'cientifica.png', angle: 308.57 }
];

// ============================================
// BANCO DE PREGUNTAS
// ============================================

const questions = {
    1: {
        deportes: [
            { id: 'd1-1', pregunta: '¿En qué año Argentina ganó su primera Copa del Mundo?', opciones: ['1978', '1986', '2022', '1990'], respuestaCorrecta: 1 },
            { id: 'd1-2', pregunta: '¿Quién es el máximo goleador histórico de la selección argentina?', opciones: ['Diego Maradona', 'Lionel Messi', 'Gabriel Batistuta', 'Hernán Crespo'], respuestaCorrecta: 1 },
            { id: 'd1-3', pregunta: '¿Cuántas veces ganó Argentina la Copa América hasta 2021?', opciones: ['13 veces', '15 veces', '17 veces', '19 veces'], respuestaCorrecta: 1 },
            { id: 'd1-4', pregunta: '¿En qué deporte se destacó Guillermo Vilas?', opciones: ['Fútbol', 'Tenis', 'Básquet', 'Boxeo'], respuestaCorrecta: 1 },
            { id: 'd1-5', pregunta: '¿Qué equipo de fútbol tiene más títulos de Primera División en Argentina?', opciones: ['Boca Juniors', 'River Plate', 'Racing', 'Independiente'], respuestaCorrecta: 0 }
        ],
        historia: [
            { id: 'h1-1', pregunta: '¿En qué año se declaró la independencia de Argentina?', opciones: ['1810', '1816', '1820', '1825'], respuestaCorrecta: 1 },
            { id: 'h1-2', pregunta: '¿Quién fue el primer presidente constitucional de Argentina?', opciones: ['Bernardino Rivadavia', 'Juan Manuel de Rosas', 'Bartolomé Mitre', 'Domingo Faustino Sarmiento'], respuestaCorrecta: 0 },
            { id: 'h1-3', pregunta: '¿Qué día se celebra la Revolución de Mayo?', opciones: ['9 de julio', '25 de mayo', '20 de junio', '17 de agosto'], respuestaCorrecta: 1 },
            { id: 'h1-4', pregunta: '¿Dónde se firmó el Acta de la Independencia?', opciones: ['Buenos Aires', 'Tucumán', 'Córdoba', 'Mendoza'], respuestaCorrecta: 1 },
            { id: 'h1-5', pregunta: '¿Quién fue conocido como "El Libertador"?', opciones: ['José de San Martín', 'Manuel Belgrano', 'Mariano Moreno', 'Juan José Castelli'], respuestaCorrecta: 0 }
        ],
        musica: [
            { id: 'm1-1', pregunta: '¿Qué banda argentina es conocida por la canción "Muchacha ojos de papel"?', opciones: ['Soda Stereo', 'Los Fabulosos Cadillacs', 'Almendra', 'Serú Girán'], respuestaCorrecta: 2 },
            { id: 'm1-2', pregunta: '¿Quién es el autor de "Cambalache"?', opciones: ['Carlos Gardel', 'Enrique Santos Discépolo', 'Astor Piazzolla', 'Atahualpa Yupanqui'], respuestaCorrecta: 1 },
            { id: 'm1-3', pregunta: '¿Qué instrumento tocaba Astor Piazzolla?', opciones: ['Guitarra', 'Bandoneón', 'Piano', 'Violín'], respuestaCorrecta: 1 },
            { id: 'm1-4', pregunta: '¿Cuál es el nombre real de "El Flaco" Spinetta?', opciones: ['Luis Alberto', 'Gustavo Cerati', 'Charly García', 'Fito Páez'], respuestaCorrecta: 0 },
            { id: 'm1-5', pregunta: '¿Qué género musical es característico de Carlos Gardel?', opciones: ['Rock', 'Tango', 'Folclore', 'Cumbia'], respuestaCorrecta: 1 }
        ],
        geografia: [
            { id: 'g1-1', pregunta: '¿Cuál es la capital de Argentina?', opciones: ['Córdoba', 'Buenos Aires', 'Rosario', 'Mendoza'], respuestaCorrecta: 1 },
            { id: 'g1-2', pregunta: '¿Cuál es la montaña más alta de Argentina?', opciones: ['Cerro Mercedario', 'Aconcagua', 'Cerro Tupungato', 'Monte Pissis'], respuestaCorrecta: 1 },
            { id: 'g1-3', pregunta: '¿Qué río forma parte de la frontera entre Argentina y Uruguay?', opciones: ['Río Paraná', 'Río Uruguay', 'Río de la Plata', 'Río Colorado'], respuestaCorrecta: 1 },
            { id: 'g1-4', pregunta: '¿En qué provincia se encuentra el Glaciar Perito Moreno?', opciones: ['Chubut', 'Santa Cruz', 'Tierra del Fuego', 'Neuquén'], respuestaCorrecta: 1 },
            { id: 'g1-5', pregunta: '¿Cuántas provincias tiene Argentina?', opciones: ['22', '23', '24', '25'], respuestaCorrecta: 2 }
        ],
        cine: [
            { id: 'c1-1', pregunta: '¿Qué película argentina ganó el Oscar a Mejor Película Extranjera en 1985?', opciones: ['La historia oficial', 'El secreto de sus ojos', 'Nueve reinas', 'Relatos salvajes'], respuestaCorrecta: 0 },
            { id: 'c1-2', pregunta: '¿Quién dirigió "El secreto de sus ojos"?', opciones: ['Juan José Campanella', 'Pablo Trapero', 'Damián Szifrón', 'Lucrecia Martel'], respuestaCorrecta: 0 },
            { id: 'c1-3', pregunta: '¿Qué actor argentino interpretó a Che Guevara en "Diarios de motocicleta"?', opciones: ['Ricardo Darín', 'Gael García Bernal', 'Diego Luna', 'Benicio del Toro'], respuestaCorrecta: 1 },
            { id: 'c1-4', pregunta: '¿Cuál es el nombre del programa de TV argentino conocido por "¿Quién quiere ser millonario?"?', opciones: ['ShowMatch', 'Susana Giménez', 'El show de Videomatch', 'No hay programa así'], respuestaCorrecta: 2 },
            { id: 'c1-5', pregunta: '¿Qué película de 2014 fue nominada al Oscar?', opciones: ['Relatos salvajes', 'El clan', 'La patota', 'Zama'], respuestaCorrecta: 0 }
        ],
        tradiciones: [
            { id: 't1-1', pregunta: '¿Qué se toma tradicionalmente en Argentina con bombilla?', opciones: ['Café', 'Té', 'Mate', 'Chocolate'], respuestaCorrecta: 2 },
            { id: 't1-2', pregunta: '¿Qué día se celebra el Día de la Tradición?', opciones: ['10 de noviembre', '25 de mayo', '9 de julio', '20 de junio'], respuestaCorrecta: 0 },
            { id: 't1-3', pregunta: '¿Qué comida típica argentina se hace con carne a la parrilla?', opciones: ['Empanadas', 'Asado', 'Locro', 'Humita'], respuestaCorrecta: 1 },
            { id: 't1-4', pregunta: '¿En qué mes se celebra tradicionalmente el Día del Amigo en Argentina?', opciones: ['Mayo', 'Junio', 'Julio', 'Agosto'], respuestaCorrecta: 2 },
            { id: 't1-5', pregunta: '¿Qué baile tradicional argentino es patrimonio de la humanidad?', opciones: ['Tango', 'Chacarera', 'Zamba', 'Cueca'], respuestaCorrecta: 0 }
        ],
        ciencia: [
            { id: 's1-1', pregunta: '¿Quién fue el primer argentino en ganar un Premio Nobel en Ciencias?', opciones: ['Luis Federico Leloir', 'César Milstein', 'Bernardo Houssay', 'Mario Bunge'], respuestaCorrecta: 2 },
            { id: 's1-2', pregunta: '¿Qué significa CONICET?', opciones: ['Consejo Nacional de Investigaciones Científicas y Técnicas', 'Centro Nacional de Investigación Científica', 'Comisión Nacional de Investigación', 'Consejo Nacional de Ciencia'], respuestaCorrecta: 0 },
            { id: 's1-3', pregunta: '¿Qué científico argentino desarrolló la técnica de los anticuerpos monoclonales?', opciones: ['Luis Leloir', 'César Milstein', 'Bernardo Houssay', 'René Favaloro'], respuestaCorrecta: 1 },
            { id: 's1-4', pregunta: '¿En qué año se fundó el CONICET?', opciones: ['1956', '1958', '1960', '1962'], respuestaCorrecta: 1 },
            { id: 's1-5', pregunta: '¿Qué médico argentino desarrolló la técnica del bypass coronario?', opciones: ['René Favaloro', 'Luis Agote', 'Salvador Mazza', 'Ramón Carrillo'], respuestaCorrecta: 0 }
        ]
    },
    2: {
        deportes: [
            { id: 'd2-1', pregunta: '¿En qué año se fundó el Club Atlético River Plate?', opciones: ['1898', '1901', '1905', '1910'], respuestaCorrecta: 1 },
            { id: 'd2-2', pregunta: '¿Cuántos goles hizo Diego Maradona en la Copa del Mundo 1986?', opciones: ['4', '5', '6', '7'], respuestaCorrecta: 1 },
            { id: 'd2-3', pregunta: '¿Qué tenista argentino ganó el Abierto de Estados Unidos en 2009?', opciones: ['David Nalbandian', 'Juan Martín del Potro', 'Guillermo Coria', 'Gastón Gaudio'], respuestaCorrecta: 1 },
            { id: 'd2-4', pregunta: '¿En qué deporte se destacó Emanuel Ginóbili?', opciones: ['Fútbol', 'Básquet', 'Tenis', 'Vóley'], respuestaCorrecta: 1 },
            { id: 'd2-5', pregunta: '¿Qué equipo ganó la Copa Libertadores 2018?', opciones: ['Boca Juniors', 'River Plate', 'Racing', 'Independiente'], respuestaCorrecta: 1 }
        ],
        historia: [
            { id: 'h2-1', pregunta: '¿Quién fue el creador de la bandera argentina?', opciones: ['José de San Martín', 'Manuel Belgrano', 'Mariano Moreno', 'Bernardino Rivadavia'], respuestaCorrecta: 1 },
            { id: 'h2-2', pregunta: '¿En qué batalla San Martín cruzó los Andes?', opciones: ['Batalla de Chacabuco', 'Batalla de Maipú', 'Batalla de San Lorenzo', 'Batalla de Salta'], respuestaCorrecta: 0 },
            { id: 'h2-3', pregunta: '¿Qué presidente argentino fue conocido como "El Restaurador"?', opciones: ['Juan Manuel de Rosas', 'Bartolomé Mitre', 'Domingo Sarmiento', 'Julio Argentino Roca'], respuestaCorrecta: 0 },
            { id: 'h2-4', pregunta: '¿En qué año se sancionó la Ley Sáenz Peña (voto secreto)?', opciones: ['1910', '1912', '1914', '1916'], respuestaCorrecta: 1 },
            { id: 'h2-5', pregunta: '¿Quién fue el primer presidente elegido por voto popular en Argentina?', opciones: ['Hipólito Yrigoyen', 'Marcelo T. de Alvear', 'Julio Argentino Roca', 'Bartolomé Mitre'], respuestaCorrecta: 0 }
        ],
        musica: [
            { id: 'm2-1', pregunta: '¿Qué álbum de Soda Stereo fue lanzado en 1990?', opciones: ['Canción Animal', 'Dynamo', 'Sueño Stereo', 'Signos'], respuestaCorrecta: 0 },
            { id: 'm2-2', pregunta: '¿Quién compuso "Adiós Nonino"?', opciones: ['Astor Piazzolla', 'Carlos Gardel', 'Aníbal Troilo', 'Osvaldo Pugliese'], respuestaCorrecta: 0 },
            { id: 'm2-3', pregunta: '¿Qué banda argentina tiene el álbum "Bocanada"?', opciones: ['Soda Stereo', 'Babasónicos', 'Gustavo Cerati', 'Los Fabulosos Cadillacs'], respuestaCorrecta: 2 },
            { id: 'm2-4', pregunta: '¿Quién es conocido como "El Negro" Fontova?', opciones: ['Fito Páez', 'Charly García', 'León Gieco', 'Mercedes Sosa'], respuestaCorrecta: 2 },
            { id: 'm2-5', pregunta: '¿Qué cantante argentina es conocida como "La Negra"?', opciones: ['Mercedes Sosa', 'Violeta Rivas', 'Palito Ortega', 'Sandro'], respuestaCorrecta: 0 }
        ],
        geografia: [
            { id: 'g2-1', pregunta: '¿Cuál es la provincia más grande de Argentina?', opciones: ['Santa Cruz', 'Buenos Aires', 'Chubut', 'Río Negro'], respuestaCorrecta: 0 },
            { id: 'g2-2', pregunta: '¿Qué ciudad es conocida como "La Docta"?', opciones: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'], respuestaCorrecta: 1 },
            { id: 'g2-3', pregunta: '¿En qué provincia se encuentra el Parque Nacional Iguazú?', opciones: ['Misiones', 'Corrientes', 'Entre Ríos', 'Formosa'], respuestaCorrecta: 0 },
            { id: 'g2-4', pregunta: '¿Cuál es el río más largo de Argentina?', opciones: ['Río Paraná', 'Río Uruguay', 'Río Colorado', 'Río Negro'], respuestaCorrecta: 0 },
            { id: 'g2-5', pregunta: '¿Qué ciudad es la capital de la provincia de Mendoza?', opciones: ['San Rafael', 'Mendoza', 'Godoy Cruz', 'Luján de Cuyo'], respuestaCorrecta: 1 }
        ],
        cine: [
            { id: 'c2-1', pregunta: '¿Quién dirigió "Nueve reinas"?', opciones: ['Fabian Bielinsky', 'Pablo Trapero', 'Juan José Campanella', 'Damián Szifrón'], respuestaCorrecta: 0 },
            { id: 'c2-2', pregunta: '¿Qué película argentina ganó el Oscar en 2009?', opciones: ['El secreto de sus ojos', 'La historia oficial', 'Relatos salvajes', 'Nueve reinas'], respuestaCorrecta: 0 },
            { id: 'c2-3', pregunta: '¿Quién interpretó a "El Perro" Santillán en "El lado oscuro del corazón"?', opciones: ['Ricardo Darín', 'Federico Luppi', 'Darío Grandinetti', 'Guillermo Francella'], respuestaCorrecta: 1 },
            { id: 'c2-4', pregunta: '¿Qué programa de TV fue creado por Marcelo Tinelli?', opciones: ['ShowMatch', 'Susana Giménez', 'CQC', 'Los profesionales de siempre'], respuestaCorrecta: 0 },
            { id: 'c2-5', pregunta: '¿Quién dirigió "Zama"?', opciones: ['Lucrecia Martel', 'Pablo Trapero', 'Damián Szifrón', 'Lisandro Alonso'], respuestaCorrecta: 0 }
        ],
        tradiciones: [
            { id: 't2-1', pregunta: '¿Qué se dice tradicionalmente cuando se comparte el mate?', opciones: ['"Salud"', '"Gracias"', '"Buen provecho"', 'No se dice nada'], respuestaCorrecta: 1 },
            { id: 't2-2', pregunta: '¿En qué provincia se celebra la Fiesta Nacional de la Vendimia?', opciones: ['San Juan', 'Mendoza', 'La Rioja', 'Catamarca'], respuestaCorrecta: 1 },
            { id: 't2-3', pregunta: '¿Qué comida típica se come el 25 de mayo?', opciones: ['Asado', 'Locro', 'Empanadas', 'Pastelitos'], respuestaCorrecta: 1 },
            { id: 't2-4', pregunta: '¿Qué significa "che" en el lenguaje argentino?', opciones: ['Amigo', 'Interjección para llamar atención', 'Ambos', 'Ninguno'], respuestaCorrecta: 2 },
            { id: 't2-5', pregunta: '¿Qué día se celebra el Día del Gaucho?', opciones: ['10 de noviembre', '6 de diciembre', '20 de junio', '9 de julio'], respuestaCorrecta: 1 }
        ],
        ciencia: [
            { id: 's2-1', pregunta: '¿Qué Premio Nobel ganó Bernardo Houssay?', opciones: ['Medicina', 'Química', 'Física', 'Economía'], respuestaCorrecta: 0 },
            { id: 's2-2', pregunta: '¿En qué año ganó el Nobel Luis Leloir?', opciones: ['1968', '1970', '1972', '1974'], respuestaCorrecta: 1 },
            { id: 's2-3', pregunta: '¿Qué descubrió Luis Leloir?', opciones: ['Los anticuerpos monoclonales', 'El metabolismo de los carbohidratos', 'La insulina', 'El bypass coronario'], respuestaCorrecta: 1 },
            { id: 's2-4', pregunta: '¿Dónde realizó sus investigaciones más importantes René Favaloro?', opciones: ['Argentina', 'Estados Unidos', 'Francia', 'Inglaterra'], respuestaCorrecta: 1 },
            { id: 's2-5', pregunta: '¿Qué científico argentino trabajó con la estructura del ADN?', opciones: ['Luis Leloir', 'César Milstein', 'Mario Bunge', 'Ninguno'], respuestaCorrecta: 1 }
        ]
    },
    3: {
        deportes: [
            { id: 'd3-1', pregunta: '¿En qué año se fundó la Asociación del Fútbol Argentino (AFA)?', opciones: ['1891', '1893', '1895', '1897'], respuestaCorrecta: 1 },
            { id: 'd3-2', pregunta: '¿Cuántos títulos de Primera División tiene Racing Club?', opciones: ['16', '17', '18', '19'], respuestaCorrecta: 2 },
            { id: 'd3-3', pregunta: '¿Qué boxeador argentino fue campeón mundial en peso pesado?', opciones: ['Carlos Monzón', 'Sergio Maravilla Martínez', 'Ninguno', 'Lucas Matthysse'], respuestaCorrecta: 2 },
            { id: 'd3-4', pregunta: '¿En qué año ganó Argentina la medalla de oro en básquet en los Juegos Olímpicos?', opciones: ['2000', '2004', '2008', 'Nunca'], respuestaCorrecta: 3 },
            { id: 'd3-5', pregunta: '¿Qué tenista argentino llegó a la final de Wimbledon?', opciones: ['David Nalbandian', 'Guillermo Coria', 'Gastón Gaudio', 'Juan Martín del Potro'], respuestaCorrecta: 0 }
        ],
        historia: [
            { id: 'h3-1', pregunta: '¿Quién fue el primer gobernador de Buenos Aires después de la Revolución de Mayo?', opciones: ['Cornelio Saavedra', 'Mariano Moreno', 'Manuel Belgrano', 'Juan José Castelli'], respuestaCorrecta: 0 },
            { id: 'h3-2', pregunta: '¿En qué año se sancionó la Constitución Nacional argentina?', opciones: ['1850', '1853', '1856', '1860'], respuestaCorrecta: 1 },
            { id: 'h3-3', pregunta: '¿Qué batalla ganó San Martín en Chile?', opciones: ['Chacabuco', 'Maipú', 'San Lorenzo', 'Cancha Rayada'], respuestaCorrecta: 1 },
            { id: 'h3-4', pregunta: '¿Quién fue conocido como "El Padre de la Patria"?', opciones: ['José de San Martín', 'Manuel Belgrano', 'Mariano Moreno', 'Bernardino Rivadavia'], respuestaCorrecta: 0 },
            { id: 'h3-5', pregunta: '¿En qué año se fundó la Universidad de Buenos Aires?', opciones: ['1818', '1821', '1824', '1827'], respuestaCorrecta: 1 }
        ],
        musica: [
            { id: 'm3-1', pregunta: '¿Qué álbum de Charly García fue lanzado en 1982?', opciones: ['Yendo de la cama al living', 'Clics modernos', 'Piano bar', 'Parte de la religión'], respuestaCorrecta: 1 },
            { id: 'm3-2', pregunta: '¿Quién compuso "Balada para un loco"?', opciones: ['Astor Piazzolla', 'Horacio Ferrer', 'Aníbal Troilo', 'Osvaldo Pugliese'], respuestaCorrecta: 0 },
            { id: 'm3-3', pregunta: '¿Qué banda tiene el álbum "Ritmo y Blues" de 1993?', opciones: ['Los Fabulosos Cadillacs', 'Babasónicos', 'Divididos', 'La Renga'], respuestaCorrecta: 0 },
            { id: 'm3-4', pregunta: '¿Quién es el autor de "Sólo le pido a Dios"?', opciones: ['León Gieco', 'Mercedes Sosa', 'Fito Páez', 'Charly García'], respuestaCorrecta: 0 },
            { id: 'm3-5', pregunta: '¿Qué cantante es conocido como "El Flaco"?', opciones: ['Luis Alberto Spinetta', 'Gustavo Cerati', 'Charly García', 'Fito Páez'], respuestaCorrecta: 0 }
        ],
        geografia: [
            { id: 'g3-1', pregunta: '¿Cuál es la ciudad más austral del mundo?', opciones: ['Ushuaia', 'Río Gallegos', 'Punta Arenas', 'El Calafate'], respuestaCorrecta: 0 },
            { id: 'g3-2', pregunta: '¿En qué provincia se encuentra el Cerro de los Siete Colores?', opciones: ['Jujuy', 'Salta', 'Catamarca', 'Tucumán'], respuestaCorrecta: 0 },
            { id: 'g3-3', pregunta: '¿Qué lago comparten Argentina y Chile?', opciones: ['Lago Nahuel Huapi', 'Lago Argentino', 'Lago Buenos Aires', 'Lago Viedma'], respuestaCorrecta: 2 },
            { id: 'g3-4', pregunta: '¿Cuál es la segunda ciudad más poblada de Argentina?', opciones: ['Córdoba', 'Rosario', 'Mendoza', 'La Plata'], respuestaCorrecta: 0 },
            { id: 'g3-5', pregunta: '¿En qué provincia se encuentra la Península Valdés?', opciones: ['Chubut', 'Santa Cruz', 'Río Negro', 'Neuquén'], respuestaCorrecta: 0 }
        ],
        cine: [
            { id: 'c3-1', pregunta: '¿Quién dirigió "La Ciénaga"?', opciones: ['Lucrecia Martel', 'Pablo Trapero', 'Daniel Burman', 'Adrián Caetano'], respuestaCorrecta: 0 },
            { id: 'c3-2', pregunta: '¿Qué película de Ricardo Darín ganó el Goya a Mejor Película Iberoamericana?', opciones: ['El secreto de sus ojos', 'Nueve reinas', 'Relatos salvajes', 'La odisea de los giles'], respuestaCorrecta: 3 },
            { id: 'c3-3', pregunta: '¿Quién interpretó a "El Turco" en "Nueve reinas"?', opciones: ['Ricardo Darín', 'Gastón Pauls', 'Leticia Bredice', 'Pablo Echarri'], respuestaCorrecta: 1 },
            { id: 'c3-4', pregunta: '¿Qué programa de TV fue conocido por "¿Quién quiere ser millonario?"?', opciones: ['ShowMatch', 'Susana Giménez', 'El show de Videomatch', 'No hay programa así'], respuestaCorrecta: 0 },
            { id: 'c3-5', pregunta: '¿Quién dirigió "La historia oficial"?', opciones: ['Luis Puenzo', 'Héctor Olivera', 'Fernando Solanas', 'María Luisa Bemberg'], respuestaCorrecta: 0 }
        ],
        tradiciones: [
            { id: 't3-1', pregunta: '¿Qué significa "quilombo" en el lunfardo argentino?', opciones: ['Confusión o lío', 'Lugar de baile', 'Comida típica', 'Ninguno'], respuestaCorrecta: 0 },
            { id: 't3-2', pregunta: '¿En qué provincia se celebra la Fiesta Nacional del Sol?', opciones: ['San Juan', 'Mendoza', 'La Rioja', 'Catamarca'], respuestaCorrecta: 0 },
            { id: 't3-3', pregunta: '¿Qué se come tradicionalmente en Navidad en Argentina?', opciones: ['Asado', 'Pavo', 'Vitel toné', 'Todas las anteriores'], respuestaCorrecta: 3 },
            { id: 't3-4', pregunta: '¿Qué significa "boludo" en el lenguaje argentino coloquial?', opciones: ['Solo insulto', 'Puede ser amigable o insulto', 'Solo amigable', 'Ninguno'], respuestaCorrecta: 1 },
            { id: 't3-5', pregunta: '¿Qué día se celebra el Día de la Pachamama?', opciones: ['1 de agosto', '15 de agosto', '1 de septiembre', '15 de septiembre'], respuestaCorrecta: 0 }
        ],
        ciencia: [
            { id: 's3-1', pregunta: '¿Qué Premio Nobel ganó César Milstein?', opciones: ['Medicina', 'Química', 'Física', 'Economía'], respuestaCorrecta: 0 },
            { id: 's3-2', pregunta: '¿En qué año ganó el Nobel César Milstein?', opciones: ['1982', '1984', '1986', '1988'], respuestaCorrecta: 1 },
            { id: 's3-3', pregunta: '¿Qué institución científica argentina es la más importante?', opciones: ['INTA', 'CONICET', 'INTI', 'CNEA'], respuestaCorrecta: 1 },
            { id: 's3-4', pregunta: '¿Quién fue el primer director del CONICET?', opciones: ['Bernardo Houssay', 'Luis Leloir', 'César Milstein', 'René Favaloro'], respuestaCorrecta: 0 },
            { id: 's3-5', pregunta: '¿Qué médico argentino desarrolló la técnica de la transfusión de sangre?', opciones: ['Luis Agote', 'René Favaloro', 'Salvador Mazza', 'Ramón Carrillo'], respuestaCorrecta: 0 }
        ]
    }
};

// ============================================
// FUNCIONES DE SONIDO
// ============================================

function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'spin':
                oscillator.frequency.value = 200;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 2);
                break;
            case 'correct':
                oscillator.frequency.value = 523.25; // Do
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'incorrect':
                oscillator.frequency.value = 200;
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
            case 'level':
                const notes = [523.25, 659.25, 783.99]; // Do, Mi, Sol
                notes.forEach((freq, i) => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    osc.type = 'sine';
                    gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                    osc.start(audioContext.currentTime + i * 0.1);
                    osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
                });
                break;
        }
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// ============================================
// PANTALLA DE CARGA
// ============================================

function initLoadingScreen() {
    const progressBar = document.getElementById('progress-bar');
    let progress = 0;
    const duration = 4000; // 4 segundos mínimo
    const interval = 50;
    const increment = (100 / (duration / interval));
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                showScreen('game-screen');
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, interval);
}

// ============================================
// GESTIÓN DE PANTALLAS
// ============================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ============================================
// ACTUALIZACIÓN DE UI
// ============================================

function updateGameHeader() {
    document.getElementById('current-level').textContent = gameState.level;
    document.getElementById('current-question-num').textContent = `${gameState.currentQuestion}/${gameState.totalQuestions}`;
    document.getElementById('lives-count').textContent = gameState.lives;
    document.getElementById('points-display').textContent = gameState.points;
}

function updateQuestionHeader() {
    document.getElementById('question-level').textContent = gameState.level;
    document.getElementById('question-number').textContent = gameState.currentQuestion;
    document.getElementById('question-lives').textContent = gameState.lives;
    document.getElementById('question-points').textContent = gameState.points;
}

// ============================================
// RULETA
// ============================================

function spinWheel() {
    if (gameState.isSpinning) return;
    
    gameState.isSpinning = true;
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;
    
    playSound('spin');
    
    const wheel = document.getElementById('wheel');
    
    // Obtener el ángulo actual de la ruleta (o usar currentRotation si está disponible)
    // Si la ruleta tiene un transform aplicado, extraer el ángulo, sino usar currentRotation
    let currentAngle = gameState.currentRotation;
    
    // Generar un giro adicional aleatorio (entre 2 y 4 vueltas completas = 720 a 1440 grados)
    const minRotations = 2;
    const maxRotations = 4;
    const randomRotations = minRotations + Math.random() * (maxRotations - minRotations);
    const additionalRotation = randomRotations * 360; // Convertir vueltas a grados
    
    // Calcular el nuevo ángulo total
    const newRotation = currentAngle + additionalRotation;
    
    // Aplicar la animación desde el ángulo actual hasta el nuevo
    wheel.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${newRotation}deg)`;
    
    // Actualizar currentRotation después de la animación
    setTimeout(() => {
        gameState.currentRotation = newRotation;
        
        // Calcular la categoría basándose en el ángulo final real
        const finalAngle = newRotation % 360;
        const selectedCategory = getCategoryFromAngle(finalAngle);
        
        gameState.currentCategory = selectedCategory;
        gameState.isSpinning = false;
        spinButton.disabled = false;
        
        showCategoryModal(selectedCategory);
    }, 3000);
}

function getCategoryFromAngle(angle) {
    // Normalizar ángulo a 0-360
    const normalizedAngle = ((angle % 360) + 360) % 360;
    
    // Cada sector tiene 51.43 grados (360 / 7)
    const sectorSize = 360 / 7;
    
    // El indicador está arriba (0°). Cuando la ruleta gira, necesitamos saber
    // qué sector original está ahora debajo del indicador (en 180°).
    // Si la ruleta giró X grados en sentido horario, el sector que está en 180° ahora
    // estaba originalmente en (180 - X) mod 360
    
    const originalPosition = (180 - normalizedAngle + 360) % 360;
    
    // Calcular el índice del sector (0-6) basado en la posición original
    let sectorIndex = Math.floor(originalPosition / sectorSize);
    
    // Asegurar que esté en el rango 0-6
    sectorIndex = sectorIndex % 7;
    
    // Mapear a las categorías en orden
    // Orden: Deportes (0°), Historia (51.43°), Música (102.86°), Geografía (154.29°),
    //        Cine (205.71°), Tradiciones (257.14°), Ciencia (308.57°)
    const categoryOrder = ['deportes', 'historia', 'musica', 'geografia', 'cine', 'tradiciones', 'ciencia'];
    return categoryOrder[sectorIndex];
}

function showCategoryModal(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    document.getElementById('modal-category-name').textContent = category.name;
    document.getElementById('modal-avatar').src = category.avatar;
    document.getElementById('category-modal').classList.add('active');
}

// ============================================
// MODAL DE CATEGORÍA
// ============================================

document.getElementById('play-category-btn').addEventListener('click', () => {
    document.getElementById('category-modal').classList.remove('active');
    startQuestion();
});

document.getElementById('spin-again-btn').addEventListener('click', () => {
    document.getElementById('category-modal').classList.remove('active');
    loseLife();
    if (gameState.lives > 0) {
        // Volver a la ruleta
        document.getElementById('category-banner').textContent = 'Girá la ruleta para comenzar';
    }
});

// ============================================
// SISTEMA DE PREGUNTAS
// ============================================

function startQuestion() {
    const category = gameState.currentCategory;
    const level = gameState.level;
    
    // Obtener preguntas disponibles (no usadas)
    const availableQuestions = questions[level][category].filter(
        q => !gameState.usedQuestions.has(q.id)
    );
    
    if (availableQuestions.length === 0) {
        // Si no hay más preguntas, reutilizar
        const allQuestions = questions[level][category];
        const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        displayQuestion(randomQuestion, category);
    } else {
        const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        gameState.usedQuestions.add(randomQuestion.id);
        displayQuestion(randomQuestion, category);
    }
}

function displayQuestion(question, categoryId) {
    const category = categories.find(c => c.id === categoryId);
    
    document.getElementById('question-category-name').textContent = category.name;
    document.getElementById('question-avatar').src = category.avatar;
    document.getElementById('question-text').textContent = question.pregunta;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = opcion;
        button.addEventListener('click', () => checkAnswer(index, question.respuestaCorrecta));
        answersContainer.appendChild(button);
    });
    
    updateQuestionHeader();
    document.getElementById('category-banner').textContent = `Categoría: ${category.name}`;
    showScreen('question-screen');
    
    startTimer();
}

function startTimer() {
    gameState.timeLeft = 20;
    document.getElementById('timer-text').textContent = gameState.timeLeft;
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer-text').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            checkAnswer(-1, -1); // Respuesta incorrecta por tiempo
        }
    }, 1000);
}

function checkAnswer(selectedIndex, correctIndex) {
    clearInterval(gameState.timer);
    
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== correctIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    const feedback = document.getElementById('answer-feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    if (selectedIndex === correctIndex) {
        // Respuesta correcta
        playSound('correct');
        feedbackText.textContent = '¡Muy bien, compañero!';
        feedback.className = 'answer-feedback correct';
        gameState.points += 100 * gameState.level;
        gameState.correctAnswers++;
    } else {
        // Respuesta incorrecta
        playSound('incorrect');
        feedbackText.textContent = 'Uy, casi casi… Otra vez será.';
        feedback.className = 'answer-feedback incorrect';
        loseLife();
    }
    
    feedback.classList.remove('hidden');
    
    setTimeout(() => {
        feedback.classList.add('hidden');
        gameState.currentQuestion++;
        checkLevelProgress();
    }, 2000);
}

function loseLife() {
    gameState.lives--;
    if (gameState.lives <= 0) {
        gameState.lives = 0;
        showGameOver();
    }
}

// ============================================
// PROGRESO DEL NIVEL
// ============================================

function checkLevelProgress() {
    if (gameState.lives <= 0) {
        showGameOver();
        return;
    }
    
    if (gameState.currentQuestion < gameState.totalQuestions) {
        // Continuar en el mismo nivel
        showScreen('game-screen');
        updateGameHeader();
    } else {
        // Completó las 6 preguntas del nivel
        if (gameState.correctAnswers >= 4) {
            // Pasó el nivel
            if (gameState.level < 3) {
                showLevelComplete();
            } else {
                showVictory();
            }
        } else {
            // No pasó el nivel
            showGameOver('No alcanzaste las 4 respuestas correctas necesarias.');
        }
    }
}

function showLevelComplete() {
    playSound('level');
    document.getElementById('complete-level').textContent = gameState.level;
    document.getElementById('complete-correct').textContent = gameState.correctAnswers;
    document.getElementById('complete-points').textContent = gameState.points;
    showScreen('level-complete-screen');
}

document.getElementById('next-level-btn').addEventListener('click', () => {
    gameState.level++;
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.usedQuestions.clear();
    updateGameHeader();
    document.getElementById('category-banner').textContent = 'Girá la ruleta para comenzar';
    showScreen('game-screen');
});

// ============================================
// GAME OVER
// ============================================

function showGameOver(customMessage = null) {
    const message = customMessage || 'Te quedaste sin vidas. ¡A no aflojar! Volvés a empezar desde el Nivel 1.';
    document.getElementById('game-over-message').textContent = message;
    document.getElementById('game-over-level').textContent = gameState.level;
    document.getElementById('game-over-points').textContent = gameState.points;
    showScreen('game-over-screen');
}

document.getElementById('restart-btn').addEventListener('click', () => {
    resetGame();
    showScreen('game-screen');
});

// ============================================
// VICTORIA
// ============================================

function showVictory() {
    playSound('level');
    document.getElementById('victory-points').textContent = gameState.points;
    showScreen('victory-screen');
}

document.getElementById('play-again-btn').addEventListener('click', () => {
    resetGame();
    showScreen('game-screen');
});

// ============================================
// RESET DEL JUEGO
// ============================================

function resetGame() {
    gameState.level = 1;
    gameState.currentQuestion = 0;
    gameState.lives = 4;
    gameState.points = 0;
    gameState.correctAnswers = 0;
    gameState.usedQuestions.clear();
    gameState.currentCategory = null;
    gameState.isSpinning = false;
    gameState.currentRotation = 0; // Reiniciar la rotación de la ruleta
    
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    
    updateGameHeader();
    document.getElementById('category-banner').textContent = 'Girá la ruleta para comenzar';
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.getElementById('spin-button').addEventListener('click', spinWheel);

// Iniciar el juego cuando se carga la página
window.addEventListener('load', () => {
    // Asegurar que la ruleta esté en posición inicial
    const wheel = document.getElementById('wheel');
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    gameState.currentRotation = 0;
    
    initLoadingScreen();
});

