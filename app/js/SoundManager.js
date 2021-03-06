import GameEventsConsumer from './GameEventsConsumer'
import BGM from './BGM'
const config = require('../config.json'),
	Enum = require('../enum.json'),
	song = require('../bgm.json')

export default class SoundManager extends GameEventsConsumer {
	constructor(emitter) {
		super(emitter)
		this.directory = config.game.soundDir
		this.name = 'SoundManager'
		// this.verbose = true
		this.sounds = {}
		this.bgm = new BGM(song)

		for (var key in config.game.sounds) {
			const filename = config.game.sounds[key]
			this.sounds[key] = new Audio(`./${this.directory}/${filename}`)
		}
	}

	onSpawn(type) {
		super.onSpawn(type)

		switch (type) {
			case Enum.GAME.TETROMINO.I:
				this.Play('SPAWN_I')
				break
			case Enum.GAME.TETROMINO.J:
				this.Play('SPAWN_J')
				break
			case Enum.GAME.TETROMINO.Z:
				this.Play('SPAWN_Z')
				break
			case Enum.GAME.TETROMINO.O:
				this.Play('SPAWN_O')
				break
			case Enum.GAME.TETROMINO.S:
				this.Play('SPAWN_S')
				break
			case Enum.GAME.TETROMINO.L:
				this.Play('SPAWN_L')
				break
			case Enum.GAME.TETROMINO.T:
				this.Play('SPAWN_T')
				break
		}
	}

	onLine(linesCleared) {
		super.onLine(linesCleared)

		switch (linesCleared) {
			case 4:
				this.Play('CLAPPING')
			default:
				this.Play('LINE_CLEAR')
		}
	}

	onPlace() {
		super.onPlace()
		this.Play('PLACED')
	}

	onPause() {
		super.onPause()
		this.bgm.Pause()
	}

	onUnpause() {
		super.onUnpause()
		this.bgm.Play()
	}

	Play(name, loop = false) {
		if (name.toLowerCase() === 'bgm') {
			this.bgm.Play()
			return
		}
		if (name in this.sounds) {
			const sound = this.sounds[name]
			sound.play()
			sound.loop = !!loop
		}
	}

	Pause(name) {
		if (name.toLowerCase() === 'bgm') {
			this.bgm.Pause()
			return
		}
		if (name in this.sounds) {
			const sound = this.sounds[name]
			sound.pause()
		}
	}
}