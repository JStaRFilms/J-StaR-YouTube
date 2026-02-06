import { z } from "zod";

export const FileNodeSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        name: z.string(),
        type: z.enum(['folder', 'markdown', 'script']),
        children: z.array(FileNodeSchema).optional(),
        highlighted: z.boolean().optional(),
    })
);

export type FileNode = z.infer<typeof FileNodeSchema>;
