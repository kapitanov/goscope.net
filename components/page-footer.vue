<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import moment from 'moment';
import { GITHUB_URL, githubCommitUrl } from '../const';
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
    <div class="flex flex-col md:flex-row text-sm">
      <div class="w-full md:w-auto">
        &copy; {{ year }}
        Built at {{ buildDate }} from commit
        <PageFooterLink :href="githubCommitUrl(commit)" target="_blank">{{ commit }}</PageFooterLink>.
        <Beta>(This is a beta version)</Beta>
      </div>
      <div class="grow-0 md:grow">
      </div>
      <div class="w-full md:w-auto">
        <PageFooterLink href="/terms">Terms and conditions</PageFooterLink> |
        <PageFooterLink href="/privacy-policy" style="display: inline-block;">Privacy policy</PageFooterLink> |
        <PageFooterLink :href="GITHUB_URL" target="_blank" style="display: inline-block;">Source code</PageFooterLink>
      </div>
    </div>
  </div>
</template>
