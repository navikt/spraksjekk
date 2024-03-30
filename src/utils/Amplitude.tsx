import * as amplitude from "@amplitude/analytics-browser";
import { userAgentEnrichmentPlugin } from '@amplitude/plugin-user-agent-enrichment-browser';

export const initAmplitude = () => {
    if (window.location.hostname === 'localhost') {
        return;
    }

    const uaPlugin = userAgentEnrichmentPlugin({
        osName: true,
        osVersion: true,
        deviceManufacturer: true,
        deviceModel: true,
    });

    amplitude.add(uaPlugin);

    amplitude.init("5e09ebca1787d232040df47170af11e0", undefined, {
        serverUrl: "https://amplitude.nav.no/collect",
        serverZone: "EU",
        defaultTracking: {
            pageViews: true,
            sessions: true,
        },
    });
};

export default initAmplitude;