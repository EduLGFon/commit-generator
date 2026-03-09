let totalCommitsPushed = 1
const fileNames = [
	'prototypes', // name of every file
	'functions', // to be created
	'commands', // in the src folder
	'classes',
	'logging',
	'handler',
	'server',
	'output',
	'events',
	'gemini',
	'index',
	'input',
	'eval',
	'gpt',
	'api',
]

const commitTitles = [
	'fix small bugs',
	'fix string errors',
	'speed up code execution',
	'fix undefined string',
	'refactor code logic',
	'cleanup code',
	'fix typos',
]
const encode = (str: string) => new TextEncoder().encode(str)
const decode = (buf: BufferSource) => new TextDecoder().decode(buf)

main()
setInterval(main, 1_000 * 60 * 60 * 24)
// call main() again every 24h

async function main() {
	for (let i = 0; i < 5; i++) {
		const file = getARandomOne(fileNames)

		const randomNum = Math.random().toPrecision(50)
		const data = encode(String(encode(String(encode(randomNum)))))
		// it creates a huge string with random numbers

		Deno.writeFile(`src/${file}.ts`, data, { create: true })
	}

	const cmds: [string, string[]][] = [
		['deno', ['fmt', 'src/']],
		['git', ['add', 'src/']],
		['git', ['commit', '-m', getARandomOne(commitTitles)]],
		['git', ['push', 'origin', 'master']],
	]

	let text = `commit ${totalCommitsPushed} at ${getDate()}\n- `
	for (const c of cmds) {
		const command = new Deno.Command(c[0], {
			args: c[1],
			stderr: 'piped',
			stdout: 'piped',
		})

		const { stdout } = await command.output()
		const out = decode(stdout)

		if (out) text += out
	}
	Deno.writeFile('log.txt', encode(text), { append: true })
	totalCommitsPushed++
}

function getDate() {
	const now = new Date()

	return `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}`
}

function getARandomOne(array: string[]) {
	return array[Math.floor(Math.random() * array.length)]
}
