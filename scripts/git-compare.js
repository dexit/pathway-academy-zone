import { execSync } from "node:child_process"

const sh = (cmd) => {
  try {
    return execSync(cmd, { cwd: "/vercel/share/v0-project", encoding: "utf8" })
  } catch (e) {
    return `ERR: ${e.message}`
  }
}

console.log("=== fetch ===")
console.log(sh("git fetch origin main run-here 2>&1 | tail -5"))

console.log("=== counts (left=run-here, right=main) ===")
console.log(sh("git rev-list --left-right --count origin/run-here...origin/main"))

console.log("=== main commits not in run-here ===")
console.log(sh("git log origin/run-here..origin/main --oneline"))

console.log("=== run-here commits not in main ===")
console.log(sh("git log origin/main..origin/run-here --oneline"))

console.log("=== files changed on main vs run-here ===")
console.log(sh("git diff --stat origin/run-here...origin/main"))

console.log("=== merge-base ===")
console.log(sh("git merge-base origin/run-here origin/main"))
