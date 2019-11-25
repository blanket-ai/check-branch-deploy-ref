const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const prNumber = core.getInput('pr_number');
    const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

    let pr = await octokit.pulls.get({
      ...github.context.repo,
      pull_number: prNumber,
    });

    console.log(JSON.stringify(pr));

    // Find all the checks that have run (or are currently running) on a given ref.
    //let isMerged = await octokit.pulls.checkIfMerged({
    //  ...github.context.repo,
    //  pull_number: prNumber,
    //});

    throw new Error('test');
    //core.setOutput("status", result.status);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
