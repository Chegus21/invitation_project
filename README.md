# Sistema de Invitaciones Digitales para XV Años

## 🎉 Características

- **Múltiples invitaciones**: Cada cliente tiene su propia URL única
- **Diseño personalizable**: Colores y estilos adaptables por cliente
- **Animaciones elegantes**: Transiciones suaves y efectos visuales
- **Responsive**: Optimizado para móvil y desktop
- **RSVP integrado**: Confirmación vía WhatsApp y teléfono
- **Countdown animado**: Cuenta regresiva hasta el evento
- **Timeline interactivo**: Progreso visual del itinerario

## 🔗 Sistema de URLs

### Página principal (selector)
```
https://tu-dominio.com/
```

### Invitaciones individuales
```
https://tu-dominio.com/invitation/isabella-maria
https://tu-dominio.com/invitation/sofia-alejandra
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── InvitationTemplate.tsx    # Template principal de invitación
│   └── InvitationSelector.tsx    # Página de selección de invitaciones
├── data/
│   └── invitations.ts           # Base de datos de invitaciones
└── App.tsx                      # Router principal
```

## 🛠️ Cómo agregar nuevas invitaciones

1. **Edita el archivo `src/data/invitations.ts`**
2. **Agrega un nuevo objeto al `invitationsDatabase`**:

```typescript
"nueva-invitacion": {
  id: "nueva-invitacion",
  name: "Nombre de la Quinceañera",
  eventDate: "2024-08-15T19:00:00",
  parentsNames: ["Padre 1", "Padre 2"],
  // ... resto de datos
}
```

3. **La nueva invitación estará disponible en**:
   - Lista: `https://tu-dominio.com/`
   - Directa: `https://tu-dominio.com/invitation/nueva-invitacion`

## 💼 Para Vender el Servicio

### Links únicos para cada cliente:
- **Isabella María**: `/invitation/isabella-maria`
- **Sofía Alejandra**: `/invitation/sofia-alejandra`

### Ventajas comerciales:
- ✅ Cada cliente tiene su URL exclusiva
- ✅ Fácil de compartir y recordar
- ✅ Diseño profesional y elegante
- ✅ Funcionalidades completas (RSVP, mapas, timeline)
- ✅ Responsive para todos los dispositivos
- ✅ Animaciones de calidad premium

## 🎨 Personalización

Cada invitación puede tener:
- **Colores personalizados** (rosa, azul, púrpura, etc.)
- **Información única** (nombres, fechas, direcciones)
- **Imágenes personalizadas** (fotos de la quinceañera, lugares)
- **Timeline específico** (horarios del evento)

## 📱 Funcionalidades Incluidas

- [x] Header con nombre y fecha
- [x] Countdown animado
- [x] Sección de padres
- [x] Calendario interactivo
- [x] Sección de padrinos
- [x] Mapas de ubicación (iglesia y recepción)
- [x] Timeline con progreso visual
- [x] Mesa de regalos
- [x] Código de vestimenta
- [x] Hashtag del evento
- [x] RSVP (WhatsApp + Teléfono)
- [x] Footer promocional
- [x] Invitaciones personalizadas por invitado

## 🚀 Despliegue

El sistema está listo para desplegarse en cualquier hosting que soporte React/Vite. Las rutas funcionan con React Router para navegación client-side.