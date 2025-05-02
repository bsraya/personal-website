import type { APIContext } from "astro";
import { html } from "satori-html";
import satori from "satori";
import { readFileSync } from "fs";
import { deslugify } from "@util/string";
import sharp from "sharp";

export async function GET({ params }: APIContext) {
    const { slug } = params;
    const page = slug === undefined ? "home" : slug;

    const markup = html(`
    <div
        style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; background-color: rgb(45,26,84); color: white; padding: 50px; font-family: 'Inter'; "
    >
        <div style="display: flex; align-items: center;">
            <img src="https://bsraya.com/static/icon-96x96.png" alt="icon" style="width: 50px; height: 50px; margin-right: 20px;" />
            <span style="font-size: 30px; font-weight: 600;">bsraya</span>
        </div>

        <div style="display: flex; font-size: 70px; font-weight: 600; margin-bottom: 20px;">
            <span>${deslugify(page)}</span>
        </div>
    </div>`);

    const svg: string = await satori(
        markup,
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Share Tech Mono",
                    data: readFileSync("node_modules/@fontsource/share-tech-mono/files/share-tech-mono-latin-400-normal.woff"),
                    style: "normal"
                }
            ]
        }
    )

    const png = await sharp(Buffer.from(svg)).png().toBuffer()

    return new Response(
        png,
        {
            status: 200,
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
            }
        }
    )
};