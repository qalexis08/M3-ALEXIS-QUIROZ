# Carpeta Assets

Esta carpeta está destinada para almacenar recursos adicionales del juego.

## Sonidos

El juego actualmente usa Web Audio API para generar sonidos dinámicamente, por lo que no requiere archivos de audio externos. Sin embargo, si deseas usar archivos de audio personalizados, puedes agregarlos aquí y modificar la función `playSound()` en `script.js`.

### Archivos de audio sugeridos (opcional):
- `spin.mp3` - Sonido de ruleta girando
- `correct.mp3` - Sonido de respuesta correcta
- `incorrect.mp3` - Sonido de respuesta incorrecta
- `level-complete.mp3` - Sonido al completar un nivel
- `game-over.mp3` - Sonido de game over

## Imágenes

Las imágenes de los personajes (hincha.png, abuelita_mate.png, etc.) deben estar en la raíz del proyecto, no en esta carpeta, ya que el HTML las referencia directamente desde la raíz.

