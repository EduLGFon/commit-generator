let count = 0;

// setInterval(async () => {
const files = ['test', 'bah', 'main', 'index', 'data', 'log', 'output', 'source', 'api', 'server', 'prototypes'];
for (const file of files) {
    const random = Math.random().toPrecision(50);
    const data = convert(String(convert(random + '\n'))) as Uint8Array;
    await Deno.writeFile(`src/${file}.ts`, data, { create: true });
}

// const commits = ['small bug fixes', 'fixing bugs', 'small improvements', 'updating old code', 'cleaning up this trash']
const commands = ['deno fmt src/', 'git add .', `git commit -m "commit${++count}"`, 'git push origin master'];

for (const cmd of commands) {
    const process = Deno.run({
        cmd: cmd.split(' '),
        stderr: 'piped',
        stdout: 'piped'
    });

    // const output = convert(await process.output());
    const error = convert(await process.stderrOutput());

    const log = convert(`commit ${count} at ${getDate()}\n - ${error}`) as Uint8Array;
    await Deno.writeFile('log.txt', log)

    process.close();
}
// }, 1_000 * 60 * 60 * 4);
//  1s    1m   1h   4h

function convert(data: string | BufferSource): string | Uint8Array {
    if (typeof data === "string")
        return new TextEncoder().encode(data);

    return new TextDecoder().decode(data);
}

function getDate() {
    const now = new Date();

    return `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}`;
}

// function random(array: string[]) {
//     return array[Math.floor(Math.random() * array.length)];
// }