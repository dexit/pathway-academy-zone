import { execFileSync } from "node:child_process"

const git = (...args) => {
  try {
    return execFileSync("git", args, { cwd: "/vercel/share/v0-project", encoding: "utf8", maxBuffer: 50 * 1024 * 1024 })
  } catch (e) {
    return `ERR: ${e.message}\n${e.stderr ?? ""}`
  }
}

console.log("=== fetch ===")
console.log(git("fetch", "origin", "main", "run-here", "--prune"))

console.log("=== counts (left=run-here, right=main) ===")
console.log(git("rev-list", "--left-right", "--count", "origin/run-here...origin/main"))

console.log("=== main commits not in run-here ===")
console.log(git("log", "--oneline", "origin/run-here..origin/main"))

console.log("=== run-here commits not in main ===")
console.log(git("log", "--oneline", "origin/main..origin/run-here"))

console.log("=== files changed (main vs run-here) ===")
console.log(git("diff", "--stat", "origin/run-here...origin/main"))

console.log("=== merge-base ===")
console.log(git("merge-base", "origin/main", "origin/run-here"))
