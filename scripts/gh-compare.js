const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ""
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "v0-compare",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

const repo = "dexit/pathway-academy-zone"

async function get(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers })
  if (!res.ok) {
    return { error: `${res.status} ${res.statusText}`, body: await res.text() }
  }
  return res.json()
}

const branches = ["main", "run-here", "dev", "replica-and-wp-theme-11092855290918997639"]

for (const b of branches) {
  const data = await get(`/repos/${repo}/branches/${encodeURIComponent(b)}`)
  if (data.error) {
    console.log(`[${b}] ERR ${data.error}`)
    continue
  }
  console.log(`[${b}] ${data.commit.sha.slice(0, 7)} — ${data.commit.commit.message.split("\n")[0]}`)
  console.log(`        date: ${data.commit.commit.author.date}  author: ${data.commit.commit.author.name}`)
}

console.log("\n=== COMPARE run-here...main ===")
const cmp = await get(`/repos/${repo}/compare/run-here...main`)
if (cmp.error) {
  console.log("ERR", cmp.error, cmp.body?.slice(0, 400))
} else {
  console.log(`status: ${cmp.status}  ahead_by(main): ${cmp.ahead_by}  behind_by(main): ${cmp.behind_by}`)
  console.log(`merge_base_commit: ${cmp.merge_base_commit?.sha?.slice(0, 7)}`)
  console.log("\n-- commits on main not in run-here --")
  for (const c of cmp.commits ?? []) {
    console.log(`  ${c.sha.slice(0, 7)} ${c.commit.message.split("\n")[0]}`)
  }
  console.log("\n-- files changed --")
  for (const f of cmp.files ?? []) {
    console.log(`  ${f.status.padEnd(10)} +${f.additions} -${f.deletions}  ${f.filename}`)
  }
}

console.log("\n=== COMPARE main...run-here (commits on run-here not in main) ===")
const cmp2 = await get(`/repos/${repo}/compare/main...run-here`)
if (cmp2.error) {
  console.log("ERR", cmp2.error)
} else {
  console.log(`ahead_by(run-here): ${cmp2.ahead_by}  behind_by(run-here): ${cmp2.behind_by}`)
  for (const c of cmp2.commits ?? []) {
    console.log(`  ${c.sha.slice(0, 7)} ${c.commit.message.split("\n")[0]}`)
  }
}
