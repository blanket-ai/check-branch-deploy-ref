# check-branch-deploy-ref
This returns the branch name of the base ref if a given PR has been merged to the default branch, otherwise this 
returns the name of the PR branch. We use this for determining which branch we should use for deploying, but this might
be useful for other purposes as well.   

## Screenshots
> If applicable, include logo/demo screenshot, diagrams, etc. Or references to them.

## Motivation
Github Actions currently doesn't have a "built-in" way (other than using the Github API itself) to say whether a given
PR has been merged or not. If a more "built-in" way ever appears, we can discard this project.   

## Installation
This is meant to be used as a step in a Github workflow, hence there's not much else to do than to add this step to your
workflow.

```yaml
      - uses: blanket-ai/check-branch-deploy-ref@master
        id: get-deploy-branch
        name: Get deploy ref
        with:
          pr_number: some-PR-number
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Requirements
The only requirements for making this work, apart from using Github Actions is specify `GITHUB_TOKEN` as an environment
variable to the action. Github already supplies a default `GITHUB_TOKEN`, so copying the `env` stanza above as-is should
be enough. 

You also need to specify the PR which you are interested in finding out whether it has been merged or not. That is the 
`pr_number` input variable above. 

## Usage
A more complete example, using the machine-learning-apps/actions-chatops action:

```yaml
name: example-deploy-flow
on:
  issue_comment:
    types: [created, edited]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - id: trigger
        name: Listen for PR Comments
        uses: machine-learning-apps/actions-chatops@master
        with:
          TRIGGER_PHRASE: "/deploy"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: blanket-ai/check-branch-deploy-ref@master
        id: get-deploy-branch
        name: Get deploy ref
        with:
          pr_number: ${{ steps.trigger.outputs.PULL_REQUEST_NUMBER }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Testing
TODO

## Deployment / Publication
This is hosted as a Github action. As long as `node_modules` is checked in and everything has been merged and pushed on
Github we're good.
