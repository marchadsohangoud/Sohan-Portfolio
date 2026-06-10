import { createFileRoute } from "@tanstack/react-router";
import { promises as fs } from "node:fs";
import path from "node:path";

type DownloadCounter = {
  count: number;
};

async function ensureCounterFile(counterPath: string) {
  try {
    await fs.access(counterPath);
  } catch {
    await fs.mkdir(path.dirname(counterPath), { recursive: true });
    await fs.writeFile(counterPath, JSON.stringify({ count: 0 }, null, 2), "utf-8");
  }
}

async function getAndIncrementCounter(counterPath: string) {
  await ensureCounterFile(counterPath);

  const raw = await fs.readFile(counterPath, "utf-8");
  const parsed = JSON.parse(raw) as DownloadCounter;
  const next = {
    count: Number.isFinite(parsed.count) ? parsed.count + 1 : 1,
  };

  await fs.writeFile(counterPath, JSON.stringify(next, null, 2), "utf-8");
  return next.count;
}

export const Route = createFileRoute("/download-resume")({
  server: {
    handlers: {
      GET: async () => {
        const root = process.cwd();
        const resumePath = path.join(root, "public", "resume.pdf");
        const counterPath = path.join(root, "data", "resume-downloads.json");

        await getAndIncrementCounter(counterPath);

        const fileBuffer = await fs.readFile(resumePath);

        return new Response(fileBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="Marchad-Sohan-Resume.pdf"',
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});