export async function POST(req) {
  try {
    const { html, name } = await req.json();
    if (!html) return Response.json({ error: "No HTML provided" }, { status: 400 });

    const token = process.env.VERCEL_TOKEN;
    if (!token) return Response.json({ error: "No VERCEL_TOKEN set in .env.local" }, { status: 500 });

    // Sanitize name for use as project/deployment name
    const slug = (name || "startup")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) + "-" + Date.now().toString(36);

    // Deploy via Vercel API — single file deployment
    const deployRes = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: slug,
        target: "production",
        files: [
          {
            file: "index.html",
            data: html,
            encoding: "utf-8",
          },
        ],
        projectSettings: {
          framework: null,
          buildCommand: null,
          outputDirectory: null,
          installCommand: null,
        },
      }),
    });

    const deployData = await deployRes.json();

    if (!deployRes.ok) {
      throw new Error(deployData?.error?.message || `Vercel error ${deployRes.status}`);
    }

    const deploymentId = deployData.id;
    if (!deploymentId) throw new Error("No deployment ID returned");

    // Poll until ready (max 30s)
    let url = null;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const statusRes = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statusData = await statusRes.json();

      if (statusData.readyState === "READY" || statusData.status === "READY") {
        url = `https://${statusData.url || statusData.alias?.[0] || slug + ".vercel.app"}`;
        break;
      }
      if (statusData.readyState === "ERROR" || statusData.status === "ERROR") {
        throw new Error("Deployment failed on Vercel's end.");
      }
    }

    if (!url) {
      // Return the likely URL even if polling times out
      url = `https://${slug}.vercel.app`;
    }

    return Response.json({ url });
  } catch (err) {
    console.error("Publish error:", err);
    return Response.json({ error: err.message || "Failed to publish" }, { status: 500 });
  }
}
