import { Composition } from 'remotion';
import { TopicShort1Composition, TopicShort1Schema } from './components/TopicShort1/TopicShort1Composition';
import { DesignSystemGen, designSystemGenSchema } from './Animations/DesignSystemGen';
import { HackerTerminal, HackerTerminalSchema } from './Animations/HackerTerminal';
import { BeforeAfterSplit, BeforeAfterSplitSchema } from './BRoll/BeforeAfterSplit';
import { UglyBeautifulFlash, UglyBeautifulFlashSchema } from './BRoll/UglyBeautifulFlash/UglyBeautifulFlash';
import { ProjectMontageGrid, ProjectMontageGridSchema } from './BRoll/ProjectMontageGrid/ProjectMontageGrid';
import { TransformationTeaser } from './BRoll/TransformationTeaser';
import { PromptTypingMadness } from './BRoll/PromptTypingMadness';
import { PromptTypingMadnessSchema } from './BRoll/PromptTypingMadness/types';
import { InstructionsVsKnowledge, InstructionsVsKnowledgeSchema } from './components/InstructionsVsKnowledge/InstructionsVsKnowledge';
import { VanillaAICringe } from './components/VanillaAICringe';
import { GarbageToGoldAlchemy, GarbageToGoldAlchemySchema } from './components/br08/GarbageToGoldAlchemy';
import { SkillsWorkflowsExplainer, SkillsWorkflowsExplainerSchema } from './components/br09/SkillsWorkflowsExplainer';
import { FolderStructure3D } from './components/br10/FolderStructure3D';
import { TeaserNextVideo, TeaserNextVideoSchema } from './components/br19/TeaserNextVideo';
import { InstallationSetup } from './InstallationSetup';
import { InstallationSetupSchema } from './InstallationSetup/schema';
import { AnniversaryGift, AnniversaryGiftSchema } from './AnniversaryGift';
import { AnniversaryCinematic, AnniversaryCinematicSchema } from './AnniversaryCinematic';
import { AnniversaryEditorial, AnniversaryEditorialSchema } from "./AnniversaryEditorial";
import { ChapterCards, ChapterCardsSchema } from './compositions/ChapterCards';
import { ExtractShort1Result } from './videos/Extract_Short_1_Result/ExtractShort1Result';
import { ExtractShort2Pain } from './videos/Extract_Short_2_Pain_Garbage_Alert/ExtractShort2Pain';
import { ExtractShort3ValueSkillsAreTheSecret, ExtractShort3ValueSchema } from './videos/Extract_Short_3_Value_Skills_Are_The_Secret/ExtractShort3Value';
import { ExtractShort2, ExtractShort2Schema } from './remotion/ExtractShort2/ExtractShort2';
import { TopicShort2QuickWin as TopicShort2QuickWinOld } from './remotion/Shorts/TopicShort2QuickWin/Composition';
import { Topic_Short_2_Quick_Win } from './videos/Topic_Short_2_Quick_Win/Topic_Short_2_Quick_Win';
import { Topic_Short_3_Story_Hook_500_Designer_Vs_Ai } from './videos/Topic_Short_3_Story_Hook_500_Designer_Vs_Ai/Topic_Short_3_Story_Hook_500_Designer_Vs_Ai';
import { TopicShort3 } from './compositions/TopicShort3/TopicShort3';
import './style.css'; // We'll create a basic css file

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="TopicShort1"
                component={TopicShort1Composition}
                schema={TopicShort1Schema}
                defaultProps={{
                    theme: 'light',
                }}
                durationInFrames={600} // 20 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="DesignSystemGen"
                component={DesignSystemGen}
                schema={designSystemGenSchema}
                defaultProps={{
                    primaryColor: "#6366f1",
                }}
                durationInFrames={360} // 6 seconds
                fps={60}
                width={1920}
                height={1080}
            />

            <Composition
                id="HackerTerminal"
                component={HackerTerminal}
                schema={HackerTerminalSchema}
                defaultProps={{
                    primaryColor: '#06b6d4',
                    accentColor: '#ec4899',
                    textColor: '#22c55e',
                }}
                durationInFrames={450} // 15 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="BeforeAfterSplit"
                component={BeforeAfterSplit}
                schema={BeforeAfterSplitSchema}
                defaultProps={{
                    beforeLabel: 'BEFORE',
                    afterLabel: 'AFTER',
                    impactText: 'Same AI. Different Result.',
                }}
                durationInFrames={150} // 5 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="UglyBeautifulFlash"
                component={UglyBeautifulFlash}
                schema={UglyBeautifulFlashSchema}
                defaultProps={{
                    uglyImageSrc: undefined,
                    beautifulImageSrc: undefined,
                    victoryText: 'First Try.',
                }}
                durationInFrames={105} // 3.5 seconds @ 30fps (extra 0.5s buffer)
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="ProjectMontageGrid"
                component={ProjectMontageGrid}
                schema={ProjectMontageGridSchema}
                defaultProps={{
                    imagePaths: undefined
                }}
                durationInFrames={150} // 5 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="TransformationTeaser"
                component={TransformationTeaser}
                durationInFrames={150} // 5 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="PromptTypingMadness"
                component={PromptTypingMadness}
                schema={PromptTypingMadnessSchema}
                defaultProps={{
                    prompt: `Build me a dashboard with Inter font at 14px semibold for headings and 13px regular for body text, use exact hex color #3b82f6 for primary action buttons with white text #ffffff, all cards should have 16px padding on all sides with 8px border-radius and subtle shadow rgba(0,0,0,0.1) 0 4px 6px, use CSS flexbox with 24px gap between elements, main background should be a gradient from #0f172a at top to #1e293b at bottom, sidebar should be exactly 256px wide with a slightly lighter background #1e293b, navigation items should have 12px padding and hover state with #334155 background, charts should use these exact colors in order: #3b82f6, #22c55e, #f59e0b, #ef4444, #8b5cf6. Make sure the header has a search bar with 40px height and a profile dropdown, also include a notification bell with a red dot if there are unread messages, table rows should have alternating background colors for readability, columns should be sortable with small arrow icons, mobile view needs a hamburger menu and bottom navigation tabs for core features, buttons should have a 150ms transition on hover with a slight scale effect, use SVG icons from Lucide-React for all interface elements, ensure 4.5:1 contrast ratio for accessibility on all text elements... AND I need a dark mode toggle that switches every single hex code accurately, plus a multi-tenant workspace switcher in the top left, a global search that handles keyboard shortcuts like Cmd+K, data tables must support server-side pagination and infinite scroll, the mobile response must be pixel perfect for every iPhone model from SE to 16 Pro Max, the charts should be interactive with tooltips and zoom functions, and don't forget the custom scrollbar styling to match the brand guide... and literally specify every single pixel's color, position, and transition timing for 100+ pages manually because I don't trust the AI to get it right without 10,000 words of instructions!`,
                    typingSpeed: 4,
                }}
                durationInFrames={150} // 5 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="InstructionsVsKnowledge"
                component={InstructionsVsKnowledge}
                schema={InstructionsVsKnowledgeSchema}
                defaultProps={{
                    instructions: [
                        "Use Inter font",
                        "Hex #3b82f6",
                        "16px padding",
                        "border-radius: 8px",
                        "width: 100%"
                    ],
                    knowledgeConcepts: [
                        "Typography Theory",
                        "Color Psychology",
                        "UX Patterns",
                        "Visual Hierarchy",
                        "Brand Identity"
                    ]
                }}
                durationInFrames={240} // 8 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="VanillaAICringe"
                component={VanillaAICringe}
                durationInFrames={180} // 6 seconds
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="GarbageToGoldAlchemy"
                component={GarbageToGoldAlchemy}
                schema={GarbageToGoldAlchemySchema}
                defaultProps={{
                    goldText: "Now let's turn it into gold.",
                }}
                durationInFrames={150} // 5 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="SkillsWorkflowsExplainer"
                component={SkillsWorkflowsExplainer}
                schema={SkillsWorkflowsExplainerSchema}
                defaultProps={{
                    skillStats: [
                        { iconName: 'Styles', text: '50+ Styles' },
                        { iconName: 'Palette', text: '97 Palettes' },
                        { iconName: 'Typography', text: '57 Fonts' },
                        { iconName: 'Ruler', text: '99 Rules' },
                    ],
                    workflowSteps: [
                        { label: 'Interview User', iconName: 'User' },
                        { label: 'Search Skills', iconName: 'Search' },
                        { label: 'Generate Design', iconName: 'Cpu' },
                        { label: 'Output Files', iconName: 'File' },
                    ],
                }}
                durationInFrames={240} // 8 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="FolderStructure3D"
                component={FolderStructure3D}
                durationInFrames={210} // 7 seconds @ 30fps
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="TeaserNextVideo"
                component={TeaserNextVideo}
                schema={TeaserNextVideoSchema}
                defaultProps={{
                    ctaText: "Watch next →",
                    nextVideoTitle: "From Mockup to Deployed App",
                    mockupSrc: undefined,
                    appPreviewSrc: undefined,
                }}
                durationInFrames={240} // 8 seconds @ 30fps
                fps={30}
                width={1920}

                height={1080}
            />

            <Composition
                id="InstallationSetup"
                component={InstallationSetup}
                schema={InstallationSetupSchema}
                defaultProps={{
                    highlightedAssistants: [
                        { flag: 'claude', name: 'Claude Code' },
                        { flag: 'cursor', name: 'Cursor' },
                        { flag: 'antigravity', name: 'Antigravity' },
                        { flag: 'opencode', name: 'OpenCode' },
                    ],
                    moreCount: 10,
                    successText: 'Design Brain Installed',
                }}
                durationInFrames={300}
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="AnniversaryGift"
                component={AnniversaryGift}
                schema={AnniversaryGiftSchema}
                defaultProps={{
                    startDate: "May 2nd, 2022",
                    proposalDate: "Jan 27th, 2026",
                    herName: "Enny",
                    hisName: "John",
                    comboName: "Jenny",
                }}
                durationInFrames={450} // 15 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="AnniversaryCinematic"
                component={AnniversaryCinematic}
                schema={AnniversaryCinematicSchema}
                defaultProps={{
                    herName: "Enny",
                    hisName: "John",
                    comboName: "Jenny",
                    date: "Jan 27, 2026",
                }}
                durationInFrames={450} // 15 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="AnniversaryEditorial"
                component={AnniversaryEditorial}
                schema={AnniversaryEditorialSchema}
                defaultProps={{
                    herName: "Enny",
                    hisName: "John",
                    comboName: "Jenny",
                }}
                durationInFrames={250} // Shorter, punchier (~8s)
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="ChapterCards"
                component={ChapterCards}
                schema={ChapterCardsSchema}
                defaultProps={{
                    cards: [
                        {
                            title: 'THE MYTH',
                            gradientStart: '#ff6b6b',
                            gradientEnd: '#feca57',
                            shapeColors: ['#ffffff', '#ffe66d', '#ff9f43'],
                        },
                        {
                            title: 'THE FIX',
                            gradientStart: '#48dbfb',
                            gradientEnd: '#0abde3',
                            shapeColors: ['#ffffff', '#c8d6e5', '#00d2d3'],
                        },
                        {
                            title: 'THE PROOF',
                            gradientStart: '#1dd1a1',
                            gradientEnd: '#10ac84',
                            shapeColors: ['#ffffff', '#badc58', '#26de81'],
                        },
                    ],
                }}
                durationInFrames={270} // 9 seconds @ 30fps (3 cards × 3 sec)
                fps={30}
                width={1920}
                height={1080}
            />

            <Composition
                id="ExtractShort1Result"
                component={ExtractShort1Result}
                durationInFrames={1800} // 60 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="ExtractShort2Pain"
                component={ExtractShort2Pain}
                durationInFrames={1800} // 60 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="ExtractShort3Value"
                component={ExtractShort3ValueSkillsAreTheSecret}
                schema={ExtractShort3ValueSchema}
                defaultProps={{
                    primaryColor: '#3B82F6',
                    secondaryColor: '#8B5CF6',
                    backgroundColor: '#111827',
                    textColor: '#FFFFFF',
                }}
                durationInFrames={1800} // 60 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="ExtractShort2"
                component={ExtractShort2}
                schema={ExtractShort2Schema}
                durationInFrames={1800} // 60 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="TopicShort2QuickWin"
                component={Topic_Short_2_Quick_Win}
                durationInFrames={480} // 16 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="TopicShort3StoryHook"
                component={Topic_Short_3_Story_Hook_500_Designer_Vs_Ai}
                durationInFrames={600} // 20 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

            <Composition
                id="TopicShort3"
                component={TopicShort3}
                durationInFrames={750} // 25 seconds @ 30fps
                fps={30}
                width={1080}
                height={1920}
            />

        </>
    );
};
