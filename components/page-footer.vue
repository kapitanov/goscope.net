<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import moment from 'moment';
import { GITHUB_URL, MAINTAINER_NAME, MAINTAINER_URL, ICONS, githubCommitUrl } from '../const';
const year = new Date(Date.now()).getFullYear();
const config = useRuntimeConfig();

let buildDate = '{some date}';
if (config.public.buildDate) {
  buildDate = moment(config.public.buildDate).format('LL');
}

let commit = '{some commit}';
if (config.public.commitHash) {
  commit = `${config.public.commitHash}`;
}
</script>

<template>
  <div class="border-t-2 pt-4">
    <div class="flex text-sm">
      <div class="w-6/12 flex justify-start text-gray-800 items-center gap-1">
        <PageFooterLink :href="GITHUB_URL" target="_blank" style="display: inline-block;">
          <Icon :name="ICONS.GITHUB" />
          View on GitHub
        </PageFooterLink>
        <Icon :name="ICONS.COPYRIGHT" />
        {{ year }}
        <Beta>
          (This is a beta version)
        </Beta>
        Built by
        <PageFooterLink :href="MAINTAINER_URL" target="_blank" style="display: inline-block;">
          {{ MAINTAINER_NAME }}
        </PageFooterLink>
      </div>
      <div class="w-6/12 flex justify-end items-center place-items-center gap-1 ">
        Built at {{ buildDate }} from commit
        <PageFooterLink :href="githubCommitUrl(commit)" target="_blank" style="display: inline-block;">
          {{ commit }}
        </PageFooterLink>
      </div>
    </div>
  </div>
</template>
