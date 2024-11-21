import {Platform} from "../classes/platform.js";
import {levels} from "../data/levels.js";

/**
 *
 * @param level
 * @returns {*[]}
 */
export const generatePlatformsForLevel = (level) => {
  const levelMarkup = levels[level].replace(/\s+/g, '').split('+')
  const platforms = []

  levelMarkup.forEach((levelRow, y) => {
    levelRow.split('').forEach((levelEl, x) => {
      // TODO: Define, what kind of platform should be created
      if (levelEl === 'P') {
        const platformEl = new Platform({
          position: {
            x: x * 30,
            y: y * 30,
          }
        })
        platforms.push(platformEl)
      }
    })
  })

  return platforms
}
