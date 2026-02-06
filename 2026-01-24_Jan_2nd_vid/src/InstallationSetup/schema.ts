import { z } from "zod";

const AIAssistantSchema = z.object({
    flag: z.string(),
    name: z.string(),
});

export const InstallationSetupSchema = z.object({
    highlightedAssistants: z.array(AIAssistantSchema).default([
        { flag: 'claude', name: 'Claude Code' },
        { flag: 'cursor', name: 'Cursor' },
        { flag: 'antigravity', name: 'Antigravity' },
        { flag: 'opencode', name: 'OpenCode' },
    ]),
    moreCount: z.number().default(10), // "+10 more"
    successText: z.string().default("Design Brain Installed"),
});

export type InstallationSetupProps = z.infer<typeof InstallationSetupSchema>;
