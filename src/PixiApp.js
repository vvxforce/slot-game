import SlotMachine from "./SlotMachine";

export default class PixiApp {
    constructor() {
        this.create();
        this.createSpinButton();
    }

    create() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            transparent: false,
            antialias: true
        });

        this.app.gameContainer = new PIXI.Container()
        this.app.stage.addChildAt(this.app.gameContainer, 0)
        document.body.appendChild(this.app.view);
        window.app = this.app;
        this.slotMachine = new SlotMachine(app, {
            reelWidth: 150,
            symbolHeight: 65,
            symbols: [
                'assets/M00_000.jpg', 'assets/M01_000.jpg', 'assets/M02_000.jpg',
                'assets/M03_000.jpg', 'assets/M04_000.jpg', 'assets/M05_000.jpg',
                'assets/M06_000.jpg', 'assets/M07_000.jpg', 'assets/M08_000.jpg',
                'assets/M10_000.jpg', 'assets/M11_000.jpg', 'assets/M12_000.jpg'
            ],
            cols: 5,
            rows: 12,
            // чи правильно тут чи краще винести прям в класі ап як окрему змінну???
            isPlaying: false
        });
    }

    createSpinButton() {
        const bottom = new PIXI.Graphics();
        bottom.beginFill(0x000000);
        bottom.drawRect(0, this.app.screen.height * .65, this.app.screen.width, 250);
        bottom.endFill();
        this.app.stage.addChild(bottom);

        const spinButton = new PIXI.Text('Spin', {
            fontSize: 72,
            fill: '#FFF',
        });
        spinButton.interactive = true;
        spinButton.buttonMode = true;
        spinButton.x = this.app.renderer.width / 2 - spinButton.width / 2;
        spinButton.y = this.app.renderer.height * .75;
        this.app.stage.addChild(spinButton);
        spinButton.on('pointerdown', () => {
            if (!this.slotMachine.options.isPlaying) {
                this.slotMachine.start()
                this.slotMachine.options.isPlaying = true;
            }
        })
    }

    start() {
        this.app.ticker.add();
    }

    stop() {
        this.app.ticker.stop()
    }
}