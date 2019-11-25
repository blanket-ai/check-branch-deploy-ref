const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const prNumber = core.getInput('pr_number');
    const octokit = new github.GitHub(process.env.GITHUB_TOKEN);

    console.log(`Getting info about PR ${prNumber}`);

    let pr = await octokit.pulls.get({
      ...github.context.repo,
      pull_number: prNumber,
    });

    const ref = pr.merged ? pr.base.ref : pr.head.ref;

    console.log(`Using ref ${ref}`);

    core.setOutput("ref", ref);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
