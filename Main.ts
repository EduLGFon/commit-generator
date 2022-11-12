// setInterval(async () => {
const files = ['test', 'bah', 'main', 'index', 'data', 'log', 'output', 'source', 'api', 'server', 'prototypes'];
for (const file of files) {
    const random = Math.random().toPrecision(50);
    const data = convert(String(convert(random + '\n'))) as Uint8Array;
    await Deno.writeFile(`src/${file}.ts`, data, { create: true });
}

const commits = ['small bug fixes', 'fixing bugs', 'small improvements', 'updating old code', 'cleaning up this trash']
const commands = ['git add .', `git commit -m ${random(commits)}`, 'git push origin master'];

for (const cmd of commands) {
    const process = Deno.run({
        cmd: cmd.split(' '),
        stderr: 'piped',
        stdout: 'piped'
    });
    const status = await process.status();

    const output = convert(await process.output());
    const error = convert(await process.stderrOutput());

    if (status.code === 0) console.log(output);
    else console.log(error);

    process.close();
}
// }, 1_000 * 60 * 0);

function convert(data: string | BufferSource): string | Uint8Array {
    if (typeof data === "string")
        return new TextEncoder().encode(data);

    return new TextDecoder().decode(data);
}

function random(array: string[]) {
    return array[Math.random() * array.length];
}