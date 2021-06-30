class Scene2 extends Phaser.Scene {

  constructor() {
    super("playGame");
  }

  create(){
    // this.background = this.add.image(0,0,"background");
    this.background = this.add.tileSprite(0,0,256,272,"background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.sprite( 256/2 - 50,272/2,"ship");
    this.ship2 = this.add.sprite( 256/2, 272/2,"ship2");
    this.ship3 = this.add.sprite( 256/2 + 50,272/2,"ship3");


    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up",{
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up",{
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });


    this.powerUps = this.physics.add.group();

    var maxObjects = 4;

    // for (var i = 0; i <= maxObjects; i++){
    //   var powerUp = this.physics.add.sprite(16,16,"power-up");
    //   this.powerUp.add(powerUp);
    //   // powerUp.setRandomPosition(0,0,game.config.width,game.config.height)
    // }

    this.ship1.play("ship1_admin");
    this.ship2.play("ship2_admin");
    this.ship3.play("ship3_admin");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown',this.destroyShip,this);

    this.add.text(20,20,"Play Game",{
      font: "25px Arial",
      fill: "yellow"
    })
  }


  moveShip(ship,speed){
    ship.y += speed;
    if (ship.y > 272){
      this.resetShipPos(ship)
    }
  }


  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0,256)
    ship.x = randomX;
  }

  update(){
    this.moveShip(this.ship1,1);
    this.moveShip(this.ship2,3);
    this.moveShip(this.ship3,2);

    this.background.tilePositionY -= 0.5;
  }

  destroyShip(pointer,gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
}
