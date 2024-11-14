export default class SlotMachine {
    constructor(app, options = {}) {
        options = {
            reelWidth: 150,
            symbolHeight: 65,
            rows: 12,
            cols: 5,
            isPlaying: false,
            ...options
        }
        this.options = options;
        this.app = app;
        this.reelWidth = options.reelWidth;
        this.reels = [];
        this.createReels();
    }

    createReels() {
        const reelHeight = this.options.symbolHeight * this.options.rows
        this.reelHeight = reelHeight;
        this.reelContainer = new PIXI.Container();
        this.reelContainer.x = this.app.screen.width * 0.035;
        this.app.stage.addChild(this.reelContainer);

        for (let i = 0; i < this.options.cols; i++) {
            const reel = new PIXI.Container();
            reel.x = i * this.reelWidth;
            reel.scale.set(2)
            this.reelContainer.addChild(reel);
            this.reels.push(reel);

            for (let j = 0; j < this.options.rows; j++) {
                const symbol = PIXI.Sprite.from(this.options.symbols[gsap.utils.random(1, this.options.rows - 1, 1)]);
                symbol.y = j * this.options.symbolHeight;
                symbol.scale.set(1);
                reel.addChild(symbol);
            }
        }
    }

    start() {
        for (const reel of this.reels) {
            this.startSpin(reel)
        }
    }

    startSpin(reel) {
        const delay = Math.random() * 0.5
        reel.children.forEach((symbol) => {
            gsap.timeline({ delay })
                .to(symbol, 1, {
                    y: '+=' +
                        this.reelHeight,
                    ease: 'none',
                    onUpdate: () => {
                        if (symbol.y + this.options.symbolHeight >= this.reelHeight) {
                            symbol.y -= this.reelHeight
                        }
                    },
                    onComplete: () => { this.options.isPlaying = false; }
                })
        })
    }
}