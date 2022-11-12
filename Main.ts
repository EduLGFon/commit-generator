function translate(data: string | BufferSource): string | Uint8Array {
    if (typeof data === "string")
        return new TextEncoder().encode(data);

    return new TextDecoder().decode(data);
}

// setInterval(async () => {
const random = Math.random().toPrecision(50);
const data = translate(random + '\n') as Uint8Array;
await Deno.writeFile('./test.txt', data);

const commands = ['git add .', `git commit -m ${Math.random().toFixed(5)}`, 'git push origin master'];

for (const cmd of commands) {
    const process = Deno.run({
        cmd: cmd.split(' '),
        stderr: 'piped',
        stdout: 'piped'
    });
    const status = await process.status();

    const output = translate(await process.output());
    const error = translate(await process.stderrOutput());

    if (status.code === 0) console.log(output);
    else console.log(error);

    process.close();
}
// }, 1_000 * 60 * 0);