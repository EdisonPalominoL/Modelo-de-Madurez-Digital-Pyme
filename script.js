/*
 * ============================================
 * SISTEMA DE EVALUACIÓN DE MADUREZ TECNOLÓGICA
 * ============================================
 * 
 * Autor: Edison Palomino Landeta
 * Universidad Ténica Particular de Loja 
 * Fecha: 20/12/2025
 */

// ============================================
// CONFIGURACIÓN DEL MODELO DE MADUREZ
// ============================================

/*
 * Configuración de niveles de madurez y sus umbrales
 */
const nivelesMadurez = {
    nivel1: { min: 1.0, max: 1.9, nombre: 'Nivel 1 - Inicial', descripcion: 'La organización tiene prácticas de TI muy básicas o inexistentes. No hay procesos estructurados ni políticas definidas.' },
    nivel2: { min: 2.0, max: 2.9, nombre: 'Nivel 2 - Gestionado', descripcion: 'Existen algunos procesos y políticas básicas, pero no están completamente implementados ni documentados.' },
    nivel3: { min: 3.0, max: 3.9, nombre: 'Nivel 3 - Definido', descripcion: 'Los procesos están definidos y documentados. Se implementan de manera consistente en la organización.' },
    nivel4: { min: 4.0, max: 4.4, nombre: 'Nivel 4 - Controlado', descripcion: 'Los procesos están bien gestionados, medidos y controlados. Se realizan mejoras continuas.' },
    nivel5: { min: 4.5, max: 5.0, nombre: 'Nivel 5 - Experto', descripcion: 'La organización tiene prácticas de TI maduras y optimizadas. Se implementan mejoras continuas basadas en métricas y mejores prácticas.' }
};

/*
 * Configuración de dimensiones y sus pesos
 */
const dimensiones = {
    gobierno: {
        nombre: 'Dirección y Gobernanza',
        weight: 0.20, // 20% del puntaje total
        questions: ['gobierno_1', 'gobierno_2', 'gobierno_3', 'gobierno_4']
    },
    infraestructura: {
        nombre: 'Infraestructura Tecnológica',
        weight: 0.15, // 15% del puntaje total
        questions: ['infraestructura_1', 'infraestructura_2', 'infraestructura_3', 'infraestructura_4']
    },
    seguridad: {
        nombre: 'Seguridad de la Información',
        weight: 0.20, // 20% del puntaje total
        questions: ['seguridad_1', 'seguridad_2', 'seguridad_3', 'seguridad_4']
    },
    procesos: {
        nombre: 'Procesos y Automatización',
        weight: 0.15, // 15% del puntaje total
        questions: ['procesos_1', 'procesos_2', 'procesos_3', 'procesos_4']
    },
    cliente: {
        nombre: 'Experiencia del Cliente',
        weight: 0.10, // 10% del puntaje total
        questions: ['cliente_1', 'cliente_2', 'cliente_3', 'cliente_4']
    },
    datos: {
        nombre: 'Gestión de Datos',
        weight: 0.10, // 10% del puntaje total
        questions: ['datos_1', 'datos_2', 'datos_3', 'datos_4']
    },
    cultura: {
        nombre: 'Personas y Cultura Digital',
        weight: 0.10, // 10% del puntaje total
        questions: ['cultura_1', 'cultura_2', 'cultura_3', 'cultura_4']
    }
};


const subdimensionesPorDimension = {
    gobierno: [
        'Estrategia',
        'Liderazgo',
        'Alineación Estratégica de TI',
        'Monitoreo y Evaluación de TI'
    ],
    procesos: [
        'Integración de Datos',
        'Estandarización de Procesos',
        'Mejora Continua',
        'Automatización de Procesos'
    ],
    infraestructura: [
        'Conectividad',
        'Gestión de Activos',
        'Continuidad del Negocio',
        'Escalabilidad Tecnológica'
    ],
    seguridad: [
        'Políticas y Cumplimiento',
        'Evaluación y Control de Riesgos',
        'Gestión de Incidentes',
        'Controles de Protección'
    ],
    cliente: [
        'Omnicanalidad',
        'Analítica de Clientes',
        'Gestión de Feedback',
        'Gestión de Relación con el Cliente'
    ],
    datos: [
        'Arquitectura de Datos',
        'Gobernanza y Calidad de Datos',
        'Analítica de Negocio',
        'Protección de Datos'
    ],
    cultura: [
        'Conciencia Digital',
        'Gestión de Talento y Capacitación',
        'Flexibilidad Laboral',
        'Colaboración Digital'
    ]
};

/*
 Base de conocimiento para recomendaciones específicas por dimensión y nivel
 */
const recomendaciones = {
    gobierno: {
        debil: [
            'Desarrollar una estrategia de TI alineada con los objetivos del negocio',
            'Establecer un comité de TI o designar un responsable de TI con autoridad para tomar decisiones',
            'Implementar revisiones periódicas (trimestrales o semestrales) del desempeño de TI',
            'Definir y documentar un presupuesto anual de TI con seguimiento mensual'
        ],
        medio: [
            'Refinar la estrategia de TI incorporando métricas de valor al negocio',
            'Formalizar el comité de TI con reuniones regulares y actas documentadas',
            'Implementar un sistema de reportes ejecutivos sobre el estado de TI',
            'Establecer un proceso de aprobación de inversiones en TI basado en ROI'
        ],
        fuerte: [
            'Optimizar la estrategia de TI mediante análisis de tendencias tecnológicas',
            'Implementar un modelo de gobernanza de TI basado en marcos como COBIT o ITIL',
            'Establecer KPIs de TI vinculados a objetivos de negocio',
            'Automatizar el seguimiento presupuestario y la gestión de proyectos de TI'
        ]
    },
    infraestructura: {
        debil: [
            'Realizar una auditoría de la infraestructura actual para identificar puntos críticos',
            'Establecer un plan de mantenimiento preventivo para equipos de TI',
            'Implementar un sistema de respaldo (backup) automático y probar la recuperación regularmente',
            'Evaluar la migración de servicios críticos a la nube para mejorar disponibilidad'
        ],
        medio: [
            'Optimizar la infraestructura de red para mejorar rendimiento y seguridad',
            'Implementar monitoreo proactivo de la infraestructura (con el uso de herramientas como Dynatrace)',
            'Establecer un plan de recuperación ante desastres (DRP) documentado y probado',
            'Adoptar infraestructura como servicio (IaaS) para servicios no críticos'
        ],
        fuerte: [
            'Implementar arquitectura de alta disponibilidad para servicios críticos',
            'Automatizar el aprovisionamiento y gestión de infraestructura (DevOps)',
            'Establecer múltiples sitios de respaldo y replicación en tiempo real',
            'Adoptar un modelo de infraestructura híbrida o multi-cloud para resiliencia'
        ]
    },
    seguridad: {
        debil: [
            'Desarrollar e implementar una política de seguridad de la información (referencia: ISO/IEC 27001)',
            'Implementar controles de acceso básicos: usuarios únicos, contraseñas seguras, permisos por roles',
            'Realizar una evaluación inicial de riesgos de seguridad',
            'Establecer un plan básico de respuesta ante incidentes de seguridad'
        ],
        medio: [
            'Ampliar la política de seguridad con procedimientos específicos por área',
            'Implementar autenticación de dos factores (2FA) para accesos críticos',
            'Realizar auditorías de seguridad periódicas (anuales o semestrales)',
            'Establecer un equipo de respuesta ante incidentes (CSIRT) con procedimientos documentados'
        ],
        fuerte: [
            'Implementar un Sistema de Gestión de Seguridad de la Información (SGSI) completo',
            'Adoptar un modelo de seguridad de confianza cero (Zero Trust)',
            'Realizar pruebas de penetración y auditorías de seguridad continuas',
            'Implementar monitoreo de seguridad 24/7 (SIEM) y respuesta automatizada a amenazas'
        ]
    },
    procesos: {
        debil: [
            'Documentar los procesos críticos del negocio identificando entradas, salidas y responsables',
            'Identificar procesos repetitivos que pueden ser automatizados',
            'Evaluar la integración entre sistemas existentes para eliminar duplicación de datos',
            'Establecer métricas básicas para medir la eficiencia de procesos clave'
        ],
        medio: [
            'Formalizar procesos mediante diagramas de flujo y procedimientos documentados',
            'Implementar automatización para procesos de alto volumen y bajo valor agregado',
            'Establecer integraciones entre sistemas mediante APIs',
            'Implementar un sistema de gestión de procesos (BPM) para seguimiento y mejora'
        ],
        fuerte: [
            'Optimizar procesos mediante metodologías como Lean o Six Sigma',
            'Implementar automatización inteligente (RPA, IA) para procesos complejos',
            'Establecer una arquitectura de integración empresarial (EAI)',
            'Implementar mejora continua mediante ciclos PDCA y análisis de métricas en tiempo real'
        ]
    },
    cliente: {
        debil: [
            'Identificar y documentar los canales de atención actuales (web, redes sociales, WhatsApp, teléfono) para facilitar futuras integraciones',
            'Establecer un registro básico del historial de interacciones con clientes en una hoja de cálculo',
            'Implementar encuestas sencillas para recolectar feedback de clientes, asegurando el consentimiento informado',
            'Evaluar la necesidad de un sistema CRM alineado con los objetivos estratégicos del negocio'
        ],
        medio: [
            'Integrar los canales de atención mediante APIs para ofrecer una experiencia omnicanal coherente',
            'Implementar un sistema CRM centralizado que consolide historial, interacciones y datos de clientes y métricas de desempeño definidas',
            'Utilizar herramientas digitales para recolectar feedback automatizado y analizarlo mediante dashboards',
            'Definir acuerdos de nivel de servicio (SLA) para los canales de atención'
        ],
        fuerte: [
            'Desplegar una plataforma integral de experiencia del cliente que unifique todos los canales en tiempo real',
            'Aplicar análisis avanzado sobre los datos del cliente para personalizar ofertas y contenidos',
            'Implementar un sistema de gestión de feedback proactivo que integre múltiples fuentes y genere acciones automáticas',
            'Establecer un proceso de mejora continua de la experiencia del cliente basado en métricas de negocio'
        ]
    },
    datos: {
        debil: [
            'Centralizar datos críticos en un sistema único o base de datos centralizada',
            'Establecer procesos básicos de limpieza y validación de datos',
            'Implementar reportes básicos para la toma de decisiones operativas',
            'Definir políticas básicas de protección y privacidad de datos'
        ],
        medio: [
            'Implementar un almacén de datos (Data Warehouse) para análisis consolidado',
            'Establecer procesos de calidad de datos con validación y limpieza automatizada',
            'Adoptar herramientas de Business Intelligence (BI) para análisis y visualización',
            'Implementar políticas de retención y eliminación de datos según normativas'
        ],
        fuerte: [
            'Implementar un Data Lake para análisis avanzado y Big Data',
            'Establecer gobernanza de datos con roles, responsabilidades y estándares definidos',
            'Adoptar análisis predictivo y machine learning para toma de decisiones estratégicas',
            'Implementar cumplimiento completo de normativas (LOPDP) con auditorías regulares'
        ]
    },
    cultura: {
        debil: [
            'Desarrollar un plan de capacitación en competencias digitales para todo el personal',
            'Realizar campañas de sensibilización sobre la importancia de la transformación digital',
            'Involucrar a la dirección en la promoción activa de iniciativas tecnológicas',
            'Establecer canales de comunicación para compartir conocimientos tecnológicos internamente'
        ],
        medio: [
            'Implementar un programa estructurado de capacitación con evaluación de competencias',
            'Crear incentivos para la adopción de nuevas tecnologías y herramientas',
            'Establecer un comité de transformación digital con representación de todas las áreas',
            'Implementar una plataforma de gestión del conocimiento para compartir mejores prácticas'
        ],
        fuerte: [
            'Desarrollar un programa de certificación interna en competencias digitales',
            'Implementar una cultura de innovación con laboratorios de experimentación tecnológica',
            'Establecer métricas de madurez digital por área y seguimiento continuo',
            'Crear comunidades de práctica internas para compartir experiencias y aprendizajes tecnológicos'
        ]
    }
};

// ============================================
// VARIABLES GLOBALES
// ============================================

let graficoRadar = null;
let graficoBarras = null;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeProgressTracking();
    initializeFormSubmission();
});

/*
 * Inicializa el seguimiento del progreso de la encuesta
 */
function initializeProgressTracking() {
    const formulario = document.getElementById('formularioEvaluacion');
    const barraProgreso = document.querySelector('.barraProgreso');
    const textoProgreso = document.getElementById('textoProgreso');
    const totalPreguntas = Object.values(dimensiones).reduce((sum, dim) => sum + dim.questions.length, 0);

    formulario.addEventListener('change', function() {
        const formData = new FormData(formulario);
        let preguntasRespondidas = 0;

        // Contar únicamente las preguntas de las dimensiones (radios)
        Object.keys(dimensiones).forEach(dimensionKey => {
            const dimension = dimensiones[dimensionKey];
            dimension.questions.forEach(nombrePregunta => {
                if (formData.get(nombrePregunta)) {
                    preguntasRespondidas++;
                }
            });
        });

        const progreso = (preguntasRespondidas / totalPreguntas) * 100;
        
        // Actualizar la barra de progreso mediante CSS variable
        barraProgreso.style.setProperty('--progress-width', `${progreso}%`);
        
        // Actualizar texto
        textoProgreso.textContent = `${Math.round(progreso)}%`;
    });
}

/*
 * Inicializa el manejo del envío del formulario
 */
function initializeFormSubmission() {
    const formulario = document.getElementById('formularioEvaluacion');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar que todas las preguntas estén respondidas
        const erroresValidacion = validarFormularioCompleto();
        if (erroresValidacion.length > 0) {
            mostrarPantallaError(erroresValidacion);
            return;
        }

        // Asegurar que la pantalla de error esté oculta en caso de validación correcta
        const pantallaError = document.getElementById('pantallaError');
        if (pantallaError) {
            pantallaError.style.display = 'none';
        }
        
        // Obtener nombre de la empresa
        const nombreEmpresa = document.getElementById('nombreEmpresa').value.trim();
        
        // Recopilar respuestas
        const respuestas = recopilarRespuestas();
        
        // Calcular puntajes
        const puntajes = calcularPuntajes(respuestas);
        
        // Determinar nivel de madurez
        const nivelMadurez = determinarNivelMadurez(puntajes.global);
        
        // Mostrar resultados
        mostrarResultados(puntajes, nivelMadurez, nombreEmpresa);
        
        // Generar recomendaciones
        const recomendaciones = generarRecomendaciones(puntajes);
        mostrarRecomendaciones(recomendaciones);
        
        // Scroll a resultados
        document.getElementById('seccionResultados').scrollIntoView({ behavior: 'smooth' });
    });
}   

// ============================================
// RECOPILACIÓN DE DATOS
// ============================================

/*
 * Recopila todas las respuestas del formulario
 * @returns {Object} Objeto con las respuestas organizadas por dimensión
 */
function recopilarRespuestas() {
    const formulario = document.getElementById('formularioEvaluacion');
    const formData = new FormData(formulario);
    const respuestas = {};
    
    // Organizar respuestas por dimensión
    Object.keys(dimensiones).forEach(dimensionKey => {
        const dimension = dimensiones[dimensionKey];
        respuestas[dimensionKey] = [];
        
        dimension.questions.forEach(nombrePregunta => {
            const value = formData.get(nombrePregunta);
            if (value) {
                respuestas[dimensionKey].push(parseInt(value));
            }
        });
    });
    
    return respuestas;
}

// ============================================
// VALIDACIÓN DEL FORMULARIO
// ============================================

/*
 * Valida que todas las preguntas de cada dimensión estén respondidas y que el nombre de la empresa esté ingresado
 * Además, marca visualmente en rojo TODOS los campos incompletos.
 * @returns {Array} Lista de errores por dimensión y nombre de empresa (vacío si todo está completo)
 */
function validarFormularioCompleto() {
    const formulario = document.getElementById('formularioEvaluacion');
    const formData = new FormData(formulario);
    const errores = [];

    // Limpiar estados de error previos
    document.querySelectorAll('.preguntaItem.preguntaError').forEach(item => {
        item.classList.remove('preguntaError');
    });
    const inputNombreEmpresa = document.getElementById('nombreEmpresa');
    if (inputNombreEmpresa) {
        inputNombreEmpresa.classList.remove('inputError');
    }

    // Validar nombre de la empresa
    const nombreEmpresa = document.getElementById('nombreEmpresa');
    if (!nombreEmpresa || !nombreEmpresa.value.trim()) {
        errores.push({
            tipo: 'nombreEmpresa',
            mensaje: 'Nombre de la empresa',
            descripcion: 'Debe ingresar el nombre de su empresa para continuar.'
        });

        if (nombreEmpresa) {
            nombreEmpresa.classList.add('inputError');
        }
    }

    // Validar preguntas de cada dimensión
    Object.keys(dimensiones).forEach(dimensionKey => {
        const dimension = dimensiones[dimensionKey];
        const missingQuestions = [];

        dimension.questions.forEach(nombrePregunta => {
            if (!formData.get(nombrePregunta)) {
                missingQuestions.push(nombrePregunta);

                // Marcar visualmente la pregunta incompleta
                const input = formulario.querySelector(`input[name="${nombrePregunta}"]`);
                if (input) {
                    const preguntaItem = input.closest('.preguntaItem');
                    if (preguntaItem) {
                        preguntaItem.classList.add('preguntaError');
                    }
                }
            }
        });

        if (missingQuestions.length > 0) {
            errores.push({
                tipo: 'dimension',
                dimensionKey: dimensionKey,
                dimensionNombre: dimension.nombre,
                totalPreguntas: dimension.questions.length,
                preguntasRespondidas: dimension.questions.length - missingQuestions.length,
                preguntasFaltantes: missingQuestions.length,
                primeraPreguntaFaltante: missingQuestions[0]
            });
        }
    });

    return errores;
}

/*
 * Muestra una pantalla de error indicando las dimensiones con preguntas sin responder y el nombre de la empresa si falta
 * @param {Array} errores - Lista de errores generada por validarFormularioCompleto
 */
function mostrarPantallaError(errores) {
    const pantallaError = document.getElementById('pantallaError');
    const listaErrores = document.getElementById('listaErrores');
    const btnCerrarError = document.getElementById('btnCerrarError');

    if (!pantallaError || !listaErrores) return;

    listaErrores.innerHTML = '';

    errores.forEach(error => {
        const li = document.createElement('li');
        if (error.tipo === 'nombreEmpresa') {
            li.innerHTML = `<strong>${error.mensaje}</strong>: ${error.descripcion}`;
        } else if (error.tipo === 'dimension') {
            li.innerHTML = `<strong>${error.dimensionNombre}</strong>: has respondido ${error.preguntasRespondidas} de ${error.totalPreguntas} preguntas.`;
        }
        listaErrores.appendChild(li);
    });

    pantallaError.style.display = 'flex';

    if (btnCerrarError) {
        btnCerrarError.onclick = function() {
            pantallaError.style.display = 'none';

            // Enfocar el primer error encontrado
            if (errores.length > 0) {
                const primerError = errores[0];
                if (primerError.tipo === 'nombreEmpresa') {
                    enfocarCampoNombreEmpresa();
                } else if (primerError.tipo === 'dimension' && primerError.primeraPreguntaFaltante) {
                    enfocarPregunta(primerError.primeraPreguntaFaltante);
                }
            }
        };
    }
}

/*
 * Enfoca visualmente la primera pregunta incompleta de una dimensión
 * @param {string} nombrePregunta - Nombre (atributo "name") de la pregunta
 */
function enfocarPregunta(nombrePregunta) {
    const input = document.querySelector(`input[name="${nombrePregunta}"]`);
    if (!input) return;

    const preguntaItem = input.closest('.preguntaItem');
    if (!preguntaItem) return;

    preguntaItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    preguntaItem.classList.add('preguntaError');
}

/*
 * Enfoca visualmente el campo del nombre de la empresa cuando está vacío
 */
function enfocarCampoNombreEmpresa() {
    const campoNombre = document.getElementById('nombreEmpresa');
    if (!campoNombre) return;

    const campoEmpresa = campoNombre.closest('.campoEmpresa');
    if (campoEmpresa) {
        campoEmpresa.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        campoNombre.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    campoNombre.classList.add('inputError');
    campoNombre.focus();
}

// ============================================
// CÁLCULO DE PUNTAJES
// ============================================

/*
 * Calcula los puntajes por dimensión y el puntaje global
 * @param {Object} respuestas - Respuestas recopiladas del formulario
 * @returns {Object} Objeto con puntajes por dimensión y global
 */
function calcularPuntajes(respuestas) {
    const puntajes = {
        dimensiones: {},
        global: 0
    };
    
    // Calcular puntaje por dimensión (promedio de respuestas)
    Object.keys(dimensiones).forEach(dimensionKey => {
        const dimension = dimensiones[dimensionKey];
        const respuestasDimension = respuestas[dimensionKey];
        
        if (respuestasDimension.length > 0) {
            const sum = respuestasDimension.reduce((acc, val) => acc + val, 0);
            puntajes.dimensiones[dimensionKey] = sum / respuestasDimension.length;
        } else {
            puntajes.dimensiones[dimensionKey] = 0;
        }
    });
    
    // Calcular puntaje global ponderado
    // Fórmula: Σ(puntaje_dimensión × peso_dimensión)
    Object.keys(dimensiones).forEach(dimensionKey => {
        const dimension = dimensiones[dimensionKey];
        puntajes.global += puntajes.dimensiones[dimensionKey] * dimension.weight;
    });
    
    // Redondear a 1 decimal
    puntajes.global = Math.round(puntajes.global * 10) / 10;
    Object.keys(puntajes.dimensiones).forEach(key => {
        puntajes.dimensiones[key] = Math.round(puntajes.dimensiones[key] * 10) / 10;
    });
    
    return puntajes;
}

/*
 * Determina el nivel de madurez basado en el puntaje global
 * @param {number} valorScore - Puntaje global de madurez
 * @returns {Object} Objeto con información del nivel de madurez
 */
function determinarNivelMadurez(valorScore) {
    for (const [nivelKey, nivel] of Object.entries(nivelesMadurez)) {
        if (valorScore >= nivel.min && valorScore <= nivel.max) {
            return {
                key: nivelKey,
                nombre: nivel.nombre,
                descripcion: nivel.descripcion,
                puntaje: valorScore
            };
        }
    }
    
    // Fallback (no debería ocurrir)
    return {
        key: 'nivel1',
        nombre: nivelesMadurez.nivel1.nombre,
        descripcion: nivelesMadurez.nivel1.descripcion,
        puntaje: valorScore
    };
}

// ============================================
// VISUALIZACIÓN DE RESULTADOS
// ============================================

/*
 * Muestra los resultados de la evaluación
 * @param {Object} puntajes - Puntajes calculados
 * @param {Object} nivelMadurez - Nivel de madurez determinado
 */
function mostrarResultados(puntajes, nivelMadurez, nombreEmpresa) {
    // Ocultar formulario y mostrar resultados
    document.getElementById('formularioEvaluacion').style.display = 'none';
    document.getElementById('seccionResultados').style.display = 'block';
    
    // Mostrar información de la empresa
    if (nombreEmpresa && nombreEmpresa.trim() !== '') {
        document.getElementById('nombreEmpresaResultado').textContent = nombreEmpresa;
    } else {
        document.getElementById('nombreEmpresaResultado').textContent = 'Empresa no especificada';
    }
    
    // Mostrar fecha de evaluación
    const fecha = new Date();
    const opcionesFecha = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    const opcionesHora = {
        hour: '2-digit',
        minute: '2-digit'
    };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    document.getElementById('fechaEvaluacion').textContent = 
        `Evaluación realizada el ${fechaFormateada} a las ${horaFormateada}`;
    
    // Mostrar puntaje global y nivel
    document.getElementById('valorScore').textContent = nivelMadurez.puntaje.toFixed(1);
    document.getElementById('nivelMadurez').textContent = nivelMadurez.nombre;
    document.getElementById('descripcionNivelMadurez').textContent = nivelMadurez.descripcion;
    
    // Crear gráficas
    crearGraficoRadar(puntajes.dimensiones);
    crearGraficoBarras(puntajes.dimensiones);
    
    // Mostrar puntajes por dimensión
    mostrarPuntajesDimension(puntajes.dimensiones);
}

/*
 * Crea la gráfica radar
 * @param {Object} puntajesDimension - Puntajes por dimensión
 */
function crearGraficoRadar(puntajesDimension) {
    const ctx = document.getElementById('graficoRadar').getContext('2d');
    
    // Destruir gráfica anterior si existe
    if (graficoRadar) {
        graficoRadar.destroy();
    }
    
    const labels = Object.keys(puntajesDimension).map(key => dimensiones[key].nombre);
    const data = Object.values(puntajesDimension);
    
    graficoRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntaje de Madurez',
                data: data,
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Puntaje: ${context.parsed.r.toFixed(1)}`;
                        }
                    }
                }
            }
        }
    });
}

/*
 * Crea la gráfica de barras
 * @param {Object} puntajesDimension - Puntajes por dimensión
 */
    function crearGraficoBarras(puntajesDimension) {
    const ctx = document.getElementById('graficoBarras').getContext('2d');
    
    // Destruir gráfica anterior si existe
    if (graficoBarras) {
        graficoBarras.destroy();
    }
    
    const labels = Object.keys(puntajesDimension).map(key => dimensiones[key].nombre);
    const data = Object.values(puntajesDimension);
    
    // Colores según el puntaje
    const backgroundColors = data.map(puntaje => {
        if (puntaje < 2) return 'rgba(239, 68, 68, 0.7)'; // Rojo (débil)
        if (puntaje < 3) return 'rgba(245, 158, 11, 0.7)'; // Naranja (medio)
        if (puntaje < 4) return 'rgba(37, 99, 235, 0.7)'; // Azul (bueno)
        return 'rgba(16, 185, 129, 0.7)'; // Verde (excelente)
    });
    
    graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Puntaje',
                data: data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Puntaje (1-5)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Puntaje: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                }
            }
        }
    });
}

/*
 * Muestra los puntajes detallados por dimensión,
 * incluyendo un menú desplegable con el detalle de cada subdimensión (cada pregunta).
 * @param {Object} puntajesDimension - Puntajes promedio por dimensión
 */
function mostrarPuntajesDimension(puntajesDimension) {
    const container = document.getElementById('puntajesDimensionesLista');
    container.innerHTML = '';
    
    Object.keys(puntajesDimension).forEach(dimensionKey => {
        const puntaje = puntajesDimension[dimensionKey];
        const dimension = dimensiones[dimensionKey];
        
        // Determinar clase CSS según el puntaje
        let scoreClass = 'debil';
        if (puntaje >= 3 && puntaje < 4) {
            scoreClass = 'medio';
        } else if (puntaje >= 4) {
            scoreClass = 'fuerte';
        }

        // Obtener detalle de subdimensiones (una por cada pregunta)
        const subdimensiones = obtenerDetalleSubdimensiones(dimensionKey);
        const tieneDetalle = subdimensiones.length > 0;

        let detalleHTML = '';
        if (tieneDetalle) {
            const itemsSub = subdimensiones.map(sub => `
                <li class="subdimensionItem">
                    <div class="subdimensionTitulo">${sub.nombre}</div>
                    <div class="subdimensionValor">${sub.valor.toFixed(1)}</div>
                </li>
            `).join('');

            detalleHTML = `
                <div class="dimensionDetalle">
                    <ul class="listaSubdimensiones">
                        ${itemsSub}
                    </ul>
                </div>
            `;
        }
        
        const item = document.createElement('div');
        item.className = `puntajeDimensionItem ${scoreClass}`;
        item.innerHTML = `
            <div class="dimensionHeader">
                <div class="dimensionHeaderInfo">
                    <span class="nombreDimensionPuntaje">${dimension.nombre}</span>
                    <span class="valorDimensionPuntaje">${puntaje.toFixed(1)}</span>
                </div>
                ${tieneDetalle ? `
                    <button type="button" class="btnToggleDetalle" aria-expanded="false">
                        Ver detalle
                    </button>
                ` : ''}
            </div>
            ${detalleHTML}
        `;
        
        container.appendChild(item);

        // Agregar comportamiento de desplegable si hay detalle
        if (tieneDetalle) {
            const btnToggle = item.querySelector('.btnToggleDetalle');
            const detalle = item.querySelector('.dimensionDetalle');
            if (btnToggle && detalle) {
                btnToggle.addEventListener('click', () => {
                    const isOpen = detalle.classList.toggle('abierto');
                    btnToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    btnToggle.textContent = isOpen ? 'Ocultar detalle' : 'Ver detalle';
                });
            }
        }
    });
}

/*
 * Obtiene el detalle de subdimensiones (una por cada pregunta) para una dimensión.
 * Cada subdimensión se compone del texto de la pregunta y el valor seleccionado (1-5).
 * @param {string} dimensionKey - Clave de la dimensión (gobierno, infraestructura, etc.)
 * @returns {Array<{nombre: string, valor: number}>}
 */
function obtenerDetalleSubdimensiones(dimensionKey) {
    const formulario = document.getElementById('formularioEvaluacion');
    if (!formulario) return [];

    const formData = new FormData(formulario);
    const dimension = dimensiones[dimensionKey];
    if (!dimension) return [];

    const detalles = [];

    dimension.questions.forEach((nombrePregunta, index) => {
        const valor = Number(formData.get(nombrePregunta));
        if (!valor) {
            return;
        }

        // Nombre conceptual de la subdimensión según el modelo definido
        const labelsDimension = subdimensionesPorDimension[dimensionKey];
        let nombreSubdimension = (labelsDimension && labelsDimension[index])
            ? labelsDimension[index]
            : `Subdimensión ${index + 1}`;

        detalles.push({
            nombre: nombreSubdimension,
            valor: valor
        });
    });

    return detalles;
}

// ============================================
// GENERACIÓN DE RECOMENDACIONES
// ============================================

/*
 * Genera recomendaciones basadas en los puntajes obtenidos
 * Regla: solo se omiten recomendaciones cuando una dimensión
 * tiene un puntaje promedio máximo (>= 5.0).
 * @param {Object} puntajes - Puntajes calculados
 * @returns {Array} Array de objetos con recomendaciones por dimensión
 */
function generarRecomendaciones(puntajes) {
    const listaRecomendaciones = [];
    const UMBRAL_SIN_RECOMENDACIONES = 5.0;
    
    Object.keys(puntajes.dimensiones).forEach(dimensionKey => {
        const puntajeDimension = puntajes.dimensiones[dimensionKey];
        const dimension = dimensiones[dimensionKey];

        // Si la dimensión ya está en el nivel máximo (>= 5.0), no se generan recomendaciones
        if (puntajeDimension >= UMBRAL_SIN_RECOMENDACIONES) {
            return;
        }

        // Determinar categoría de recomendaciones según el puntaje de la dimensión
        let categoria = 'debil';
        if (puntajeDimension >= 2 && puntajeDimension < 3) {
            categoria = 'medio';
        } else if (puntajeDimension >= 3) {
            categoria = 'fuerte';
        }
        
        // Acceder al objeto global de recomendaciones
        const dimensionRecommendaciones = recomendaciones[dimensionKey][categoria] || 
                                          recomendaciones[dimensionKey]['debil'];
        
        if (dimensionRecommendaciones && dimensionRecommendaciones.length > 0) {
            listaRecomendaciones.push({
                dimension: dimension.nombre,
                puntaje: puntajeDimension,
                categoria: categoria,
                acciones: dimensionRecommendaciones
            });
        }
    });
    
    // Ordenar por puntaje (menor primero, priorizar las más débiles)
    listaRecomendaciones.sort((a, b) => a.puntaje - b.puntaje);
    
    return listaRecomendaciones;
}

/*
 * Muestra las recomendaciones en la interfaz
 * @param {Array} recomendaciones - Array de recomendaciones generadas
 */
function mostrarRecomendaciones(recomendaciones) {
    const contenedor = document.getElementById('recomendacionesLista');
    contenedor.innerHTML = '';
    
    if (recomendaciones.length === 0) {
        contenedor.innerHTML = `
            <div class="recomendacionItem">
                <p style="color: var(--secondary-color); font-weight: 600;">
                    ¡Felicitaciones! Todas las dimensiones están en un nivel adecuado. 
                    Continúe con las mejoras continuas para mantener y optimizar el nivel de madurez.
                </p>
            </div>
        `;
        return;
    }
    
    recomendaciones.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recomendacionItem';
        
        const actionsList = rec.acciones.map(action => 
            `<li>${action}</li>`
        ).join('');
        
        item.innerHTML = `
            <div class="nombreRecomendacion">
                ${rec.dimension} (Puntaje: ${rec.puntaje.toFixed(1)})
            </div>
            <p style="margin-bottom: 0.5rem; color: var(--text-secondary);">
                Esta dimensión requiere atención prioritaria. A continuación se presentan acciones concretas de mejora:
            </p>
            <ul class="accionesRecomendacion">
                ${actionsList}
            </ul>
        `;
        
        contenedor.appendChild(item);
    });
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/*
 * Actualiza la barra de progreso visualmente
 */
function updateProgressBar() {
    
}

