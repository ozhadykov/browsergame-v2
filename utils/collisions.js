export class Collisions {

  static collision(player, block) {
    return (
      player.position.y + player.height >= block.position.y &&
      player.position.y <= block.position.y + block.height &&
      player.position.x <= block.position.x + block.width &&
      player.position.x + player.width >= block.position.x
    )
  }
}