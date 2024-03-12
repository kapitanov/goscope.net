<script setup lang="ts">
import { GITHUB_ISSUES_URL } from '~/const';
</script>
<template>
    <div>
        <TextTitle>
            Privacy Policy
        </TextTitle>

        <TextParagraph>
            <p>
                We are committed to protecting and respecting your privacy. This privacy policy describes and governs our
                information
                collection, use, and sharing practices. Before you submit/upload any information or file to our website,
                please
                carefully review this policy.
            </p>
        </TextParagraph>

        <TextParagraph header="Preliminary">
            <p>
                We DO NOT keep or inspect any information (e.g.: text, settings) or files submitted/uploaded to our website.
                We DO NOT ask for, or require any personal information (e.g.: names, usernames, passwords, email addresses,
                credit
                cards) at our website
            </p>
        </TextParagraph>

        <TextParagraph header="Data controller">
            <p>
                For the purpose of data protection laws applicable to you in the location from which you provide your
                information, we
                are the "data controller" of the information you provide to our website. There may be other controllers as
                well
                (e.g.:
                advertisers), and we encourage you to consult their privacy policies to learn more about their privacy
                practices.
            </p>
            <p>
                Our primary data controller's might be contacted via GitHub issues at
                <Hyperlink :href="GITHUB_ISSUES_URL" />
            </p>
        </TextParagraph>

        <TextParagraph header="Data storage and usage purposes">
            <p>
                Please note that this privacy policy applies only to information collected through our website and not to
                any
                information you may provide to any third-party sites to which we may link.
            </p>
            <ul class="list-disc ms-4">
                <li>
                    We make use of web server log files. The information inside these log files includes IP address,
                    date/time
                    stamp,
                    referring/exit page, and type of browser. We use this information solely to administer our website.
                </li>
                <li>
                    We use third-party web analytics service Google Analytics.
                </li>
            </ul>
        </TextParagraph>

        <TextParagraph>
            <p>
                We and our third-party service providers (detailed above) may also store and collect data related to your
                use of
                our website for the following purposes. Please note that by rejecting any or all of them, you may not have
                access to certain features or offerings of our website.
            </p>
            <ul class="list-disc ms-4">
                <li>
                    <strong>Use precise geolocation data.</strong> Your precise geolocation data can be used in support of
                    one
                    or more purposes. "Precise"
                    means your location can be accurate to within several meters.
                </li>
                <li>
                    <strong>Actively scan device characteristics for identification.</strong> Your device can be identified
                    based on a scan of your device's
                    unique combination of characteristics.
                </li>
                <li>
                    <strong>Measure content performance.</strong> The performance and effectiveness of content that you see
                    or
                    interact with can be measured.
                </li>
                <li>
                    <strong>Apply market research to generate audience insights.</strong> Market research can be used to
                    learn
                    more about the audiences who
                    visit particular sites/apps.
                </li>
                <li>
                    <strong>Develop and improve products.</strong> Your data can be used to improve existing systems or
                    software
                    and to develop new products.
                </li>
                <li>
                    <strong>Store and/or access information on a device.</strong> Cookies, device identifiers, or other
                    information can be stored or accessed
                    on your device for the above purposes presented to you.
                </li>
            </ul>
        </TextParagraph>

        <TextParagraph header="Data retention">
            <p>
                Our Google Analytics service is configured to store data that is associated with cookies, user identifiers,
                or
                advertising identifiers for up to 14 months.
            </p>
        </TextParagraph>
    </div>
</template>