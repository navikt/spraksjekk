"use client";
import { useEffect, createContext } from "react";
import * as amplitude from '@amplitude/analytics-browser';
import { init, track } from "@amplitude/analytics-browser";
import { BaseEvent } from "@amplitude/analytics-types";
import { userAgentEnrichmentPlugin } from '@amplitude/plugin-user-agent-enrichment-browser';

export const AmplitudeContext = createContext({});

// @ts-ignore
const AmplitudeContextProvider = ({children}) => {
    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            amplitude.add(uaPlugin);
            init("5e09ebca1787d232040df47170af11e0", undefined, {
                serverUrl: "https://amplitude.nav.no/collect",
                serverZone: "EU",
                defaultTracking: {
                    pageViews: true,
                    sessions: true,
                },
            });
        }
    }, []);

    const trackAmplitudeEvent = (eventName: string | BaseEvent, eventProperties: Record<string, any> | undefined) => {
        track(eventName, eventProperties);
    };

    const value = { trackAmplitudeEvent };

    const uaPlugin = userAgentEnrichmentPlugin({
        osName: true,
        osVersion: true,
        deviceManufacturer: true,
        deviceModel: true,
    });

    return (
        <AmplitudeContext.Provider value={value}>
            {children}
        </AmplitudeContext.Provider>
    );
};

export default AmplitudeContextProvider;