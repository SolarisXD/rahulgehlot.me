"use client";

import type { ComponentType } from "react";
import { skillsContent } from "@/content/skills";
import { useTheme } from "next-themes";
import {
  Brain,
  BracketsCurly,
  ChatTeardropText,
  Cloud,
  Database,
  Globe,
  Sparkle,
  SquaresFour,
  UsersThree,
} from "@phosphor-icons/react";
import { Code2 } from "lucide-react";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  cloud: Cloud,
  squares: SquaresFour,
  server: Database,
  brain: Brain,
  brackets: BracketsCurly,
  tools: Sparkle,
  idea: Sparkle,
};

const iconSrcMap: Record<string, string> = {
  react: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
  next: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
  tailwind: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
  api: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openapiinitiative.svg",
  node: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nodedotjs.svg",
  express: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/express.svg",
  fastapi: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/fastapi.svg",
  sqlite: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sqlite.svg",
  mongo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mongodb.svg",
  mysql: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mysql.svg",
  pytorch: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pytorch.svg",
  numpy: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/numpy.svg",
  sklearn: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/scikitlearn.svg",
  pandas: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/pandas.svg",
  gemini: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlegemini.svg",
  azure: "/azureai-color.svg",
  opencode: "/opencode-logo-light.svg",
  claude: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/claude.svg",
  javascript: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/javascript.svg",
  python: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg",
  cpp: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cplusplus.svg",
  git: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg",
  github: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg",
  jest: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/jest.svg",
  vscode: "/vscode.svg",
  figma: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/figma.svg",
  stitch: "/antigravity-color.svg",
  antigravity: "/antigravity-color.svg",
  render: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg",
  vercel: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
};

const iconColorMap: Record<string, string> = {
  react: "#61DAFB",
  next: "#FFFFFF",
  tailwind: "#38BDF8",
  api: "#6BA539",
  node: "#5FA04E",
  express: "#FFFFFF",
  fastapi: "#009688",
  sqlite: "#003B57",
  mongo: "#47A248",
  mysql: "#4479A1",
  pytorch: "#EE4C2C",
  numpy: "#4DABCF",
  sklearn: "#F7931E",
  pandas: "#150458",
  gemini: "#4285F4",
  azure: "#0078D4",
  opencode: "#74AA9C",
  claude: "#D97757",
  javascript: "#F7DF1E",
  python: "#3776AB",
  cpp: "#00599C",
  git: "#F05032",
  github: "#FFFFFF",
  jest: "#C21325",
  vscode: "#007ACC",
  figma: "#F24E1E",
  render: "#46E3B7",
  vercel: "#FFFFFF",
};

const rawColorIconKeys = new Set(["antigravity", "azure", "opencode","stitch"]);

export default function Skills() {
  const { languages, softSkills, techStack } = skillsContent;
  const { resolvedTheme } = useTheme();
  const openCodeIcon = resolvedTheme === "dark" ? "/opencode-logo-light.svg" : "/opencode-logo-dark.svg";

  return (
    <div className="space-y-10 text-slate-900 dark:text-white">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300 flex items-center justify-center">
          <Code2 size={18} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">Skills</h2>
          <p className="text-sm text-slate-500 dark:text-foreground/50">My Gear</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        <div className="space-y-8">
          {languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe size={16} className="text-cyan-600 dark:text-cyan-300" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                  Languages
                </h3>
              </div>
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.name} className="flex items-baseline gap-4">
                    <span className="text-sm text-slate-900 dark:text-white">{language.name}</span>
                    <span className="ml-auto text-xs text-cyan-700 dark:text-cyan-300 font-semibold text-right">
                      {language.level}
                    </span>
                    {language.detail && (
                      <span className="text-xs text-slate-500 dark:text-foreground/50">{language.detail}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {softSkills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UsersThree size={18} className="text-violet-500 dark:text-violet-300" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                  Soft Skills
                </h3>
              </div>
              <div className="flex flex-col items-start gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex w-fit rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ChatTeardropText size={16} className="text-emerald-500 dark:text-emerald-300" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">
                Tech Stack
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {techStack.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 transition-all hover:ring-slate-300 dark:bg-[#1F2023] dark:ring-white/10 dark:hover:bg-[#24262B]"
              >
                <div className="flex items-center gap-2">
                  {(() => {
                    const GroupIcon = group.icon ? iconMap[group.icon] ?? Sparkle : Sparkle;

                    return <GroupIcon size={14} className="text-cyan-600 dark:text-cyan-300" />;
                  })()}
                  <div>
                    <h4 className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-widest">
                      {group.title}
                    </h4>
                    {group.note && (
                      <span className="text-[10px] text-slate-500 dark:text-foreground/40">{group.note}</span>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => {
                    const iconSrc = item.icon === "opencode"
                      ? openCodeIcon
                      : item.icon
                        ? iconSrcMap[item.icon]
                        : undefined;
                    const iconColor = item.icon ? iconColorMap[item.icon] : undefined;
                    const useRawIcon = item.icon ? rawColorIconKeys.has(item.icon) : false;

                    return (
                      <li
                        key={item.label}
                        className="inline-flex w-fit items-center gap-3 rounded-xl bg-slate-100 px-2 py-2 text-xs text-slate-700 mx-1 dark:bg-white/[0.015] dark:text-foreground/70"
                      >
                        {iconSrc ? (
                          useRawIcon ? (
                            <img src={iconSrc} alt="" className="h-4 w-4" loading="lazy" />
                          ) : (
                            <span
                              className="h-4 w-4"
                              style={{
                                backgroundColor: iconColor ?? "currentColor",
                                maskImage: `url(${iconSrc})`,
                                WebkitMaskImage: `url(${iconSrc})`,
                                maskRepeat: "no-repeat",
                                WebkitMaskRepeat: "no-repeat",
                                maskSize: "contain",
                                WebkitMaskSize: "contain",
                                maskPosition: "center",
                                WebkitMaskPosition: "center",
                              }}
                            />
                          )
                        ) : (
                          <Sparkle size={14} className="text-cyan-300" />
                        )}
                        <span>{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

