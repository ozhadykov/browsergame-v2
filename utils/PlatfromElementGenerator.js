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
            x: x * 16,
            y: y * 16,
          },
          height: 0,
          width: 0,
          imageSrc: '../assets/platform/block.png'
        })
        platforms.push(platformEl)
      }
    })
  })

  return platforms
}
