// 文案数据 —— 转写自 ../content/script.yaml（构建期常量，不在运行时解析 YAML）

export interface Kicker {
  en: string;
  zh: string;
}

export interface DefKeyword {
  wordEn: string;
  wordZh: string;
  textEn: string;
  textZh: string;
}

export interface TermItem {
  termEn: string;
  termZh: string;
  textEn: string;
  textZh: string;
}

export interface BranchItem {
  termEn: string;
  termZh: string;
  textZh: string;
  group?: string;
  bridge?: boolean;
}

export interface PairItem {
  leftEn: string;
  leftZh: string;
  rightEn: string;
  rightZh: string;
  noteEn: string;
  noteZh: string;
}

// ---------- S1 opening ----------
export const OPENING = {
  kicker: { en: "CHAPTER 1 · INVITATIONS TO LINGUISTICS", zh: "语言学总论 · 第 1 组" } as Kicker,
  titleLine1: "Same sentence.",
  titleLine2: "Different meanings.",
  titleZh: "同一句话，不同的人听出不同的意思",
  quote: "“You’re really something.”",
  quoteNote: "— a compliment? an accusation?",
  bodyPre: "Language is far more complex than we assume. Before anything else, let’s get two things straight: ",
  bodyEm1: "language",
  bodyMid: ", and ",
  bodyEm2: "linguistics",
  bodyEnd: ".",
  bodyZh: "语言比我们以为的复杂得多。这一章，先把「语言」和「语言学」这两件事讲清楚。",
};

// ---------- S2 definition ----------
export const DEFINITION = {
  kicker: { en: "01 · WHAT IS LANGUAGE", zh: "语言的定义" } as Kicker,
  // 句子按关键词切片，便于依次点亮
  sentence: {
    pre: "Language is a ",
    kw1: "system",
    mid1: " of ",
    kw2: "arbitrary",
    mid2: " ",
    kw3: "vocal",
    mid3: " symbols used for ",
    kw4: "human",
    post: " communication.",
  },
  titleZh: "语言是用于人类交际的、任意的有声符号系统",
  keywords: [
    {
      wordEn: "SYSTEM",
      wordZh: "系统性",
      textEn: "Language is organized by rules — not a random pile of symbols.",
      textZh: "语言是按规则组织的系统，不是杂乱的符号堆砌",
    },
    {
      wordEn: "ARBITRARY",
      wordZh: "任意性",
      textEn: "No necessary link between a word and the thing it names. Why is a dog called gǒu?",
      textZh: "词与所指事物之间没有必然联系——「狗」为什么叫 gǒu？",
    },
    {
      wordEn: "VOCAL",
      wordZh: "声音媒介",
      textEn: "Speech is primary; writing is derived from it.",
      textZh: "口语是第一性的，文字是派生的",
    },
    {
      wordEn: "HUMAN",
      wordZh: "人类独有",
      textEn: "Animal call systems never show all the design features of language.",
      textZh: "动物交际系统不具备语言的全部识别特征",
    },
  ] as DefKeyword[],
};

// ---------- S3 features ----------
export const FEATURES = {
  kicker: { en: "02 · DESIGN FEATURES", zh: "识别特征" } as Kicker,
  titleEn: "What makes language, language?",
  titleZh: "是什么让语言成为语言？五个识别特征",
  items: [
    {
      termEn: "Arbitrariness",
      termZh: "任意性",
      textEn: "No natural bond between signifier and signified.",
      textZh: "能指与所指无自然联系（索绪尔）",
    },
    {
      termEn: "Duality",
      termZh: "二重性",
      textEn: "Meaningless sounds × meaningful units — a two-level structure of extreme efficiency.",
      textZh: "无意义的语音层 × 有意义的符号层，双层结构效率极高",
    },
    {
      termEn: "Creativity",
      termZh: "创造性",
      textEn: "Finite means, infinite use — recursion makes new sentences endless.",
      textZh: "有限手段，无限使用（递归造句）",
    },
    {
      termEn: "Displacement",
      termZh: "移位性",
      textEn: "We can talk about what is not here and not now — past, future, fiction.",
      textZh: "可以谈论不在此时此地的事物：过去、未来、虚构",
    },
    {
      termEn: "Cultural Transmission",
      termZh: "文化传递",
      textEn: "Language travels by teaching and learning, not by genes.",
      textZh: "语言靠教与学传递，不是靠基因",
    },
  ] as TermItem[],
};

// ---------- S4 functions ----------
export const FUNCTIONS = {
  kicker: { en: "03 · FUNCTIONS OF LANGUAGE", zh: "语言的功能" } as Kicker,
  titleEn: "Seven jobs for one tool.",
  titleZh: "一件工具，七种用途",
  items: [
    { termEn: "Informative", termZh: "信息功能", textEn: "Stating facts — the major function of language.", textZh: "陈述事实——语言最主要的功能" },
    { termEn: "Interpersonal", termZh: "人际功能", textEn: "Maintaining social relations and identities.", textZh: "维持社会关系与身份" },
    { termEn: "Performative", termZh: "施为功能", textEn: "Saying is doing: “I declare…”, “I apologize.”", textZh: "说话即做事（「我宣布…」「我道歉」）" },
    { termEn: "Emotive", termZh: "感情功能", textEn: "Expressing attitudes and emotions.", textZh: "表达态度与情绪" },
    { termEn: "Phatic", termZh: "寒暄功能", textEn: "“吃了吗？” — not for information, but for connection.", textZh: "不为信息，只为接通关系" },
    { termEn: "Recreational", termZh: "娱乐功能", textEn: "Poetry, jokes, wordplay — language for sheer fun.", textZh: "诗歌、段子、文字游戏" },
    { termEn: "Metalingual", termZh: "元语言功能", textEn: "Using language to talk about language — linguistics itself runs on it.", textZh: "用语言谈论语言——语言学本身就在用它" },
  ] as TermItem[],
};

// ---------- S5 linguistics ----------
export const LINGUISTICS = {
  kicker: { en: "04 · WHAT IS LINGUISTICS", zh: "什么是语言学" } as Kicker,
  titlePre: "Linguistics is the ",
  titleEm: "scientific",
  titlePost: " study of language.",
  titleZh: "语言学是对语言的科学研究",
  bodyEn:
    "“Scientific” is the load-bearing word. A linguistic analysis answers to three principles, and knowledge grows in a loop.",
  bodyZh: "关键在「科学」二字。三条准则约束分析，一个循环推进认识：观察语料 → 概括假设 → 验证修正。",
  principles: [
    { termEn: "Exhaustiveness", termZh: "穷尽性", textEn: "Account for all the relevant data, not just the convenient examples.", textZh: "覆盖所有相关语料，不只挑顺手的例子" },
    { termEn: "Consistency", termZh: "一致性", textEn: "No self-contradiction anywhere in the analysis.", textZh: "分析内部不得自相矛盾" },
    { termEn: "Economy", termZh: "经济性", textEn: "Of two equally valid accounts, the simpler one wins.", textZh: "同样有效时，越简洁的解释越好" },
  ] as TermItem[],
  loop: [
    { en: "OBSERVE DATA", zh: "观察语料" },
    { en: "FORM HYPOTHESIS", zh: "概括假设" },
    { en: "TEST & REVISE", zh: "验证修正" },
  ],
};

// ---------- S6 branches ----------
export const BRANCHES = {
  kicker: { en: "05 · THE MAP OF LINGUISTICS", zh: "语言学分支地图" } as Kicker,
  titleEn: "One discipline, many doors.",
  titleZh: "一门学科，许多入口",
  bodyZh: "核心分支对应本课程后续章节，由各小组依次展开；宏观分支把语言接向社会、心智、应用——以及计算。",
  hub: { en: "LINGUISTICS", zh: "语言学" },
  coreLabel: { en: "CORE", zh: "核心分支" },
  macroLabel: { en: "MACRO", zh: "宏观分支" },
  core: [
    { termEn: "Phonetics", termZh: "语音学", textZh: "语音的物理与生理" },
    { termEn: "Phonology", termZh: "音系学", textZh: "语音在系统中的组织规律", group: "第 2 组" },
    { termEn: "Morphology", termZh: "形态学", textZh: "词的内部结构", group: "第 3 组" },
    { termEn: "Syntax", termZh: "句法学", textZh: "句子结构", group: "第 4 组" },
    { termEn: "Semantics", termZh: "语义学", textZh: "意义" },
    { termEn: "Pragmatics", termZh: "语用学", textZh: "语境中的意义" },
  ] as BranchItem[],
  macro: [
    { termEn: "Sociolinguistics", termZh: "社会语言学", textZh: "语言与社会" },
    { termEn: "Psycholinguistics", termZh: "心理语言学", textZh: "语言与心智" },
    { termEn: "Applied Linguistics", termZh: "应用语言学", textZh: "语言教学与实际问题" },
    { termEn: "Computational Linguistics", termZh: "计算语言学", textZh: "← 通往 Part 3 的桥", bridge: true },
  ] as BranchItem[],
};

// ---------- S7 distinctions ----------
export const DISTINCTIONS = {
  kicker: { en: "06 · FOUR KEY DISTINCTIONS", zh: "四对重要区分" } as Kicker,
  titleEn: "Draw the lines first.",
  titleZh: "先把界限划清楚",
  items: [
    { leftEn: "Prescriptive", leftZh: "规定式", rightEn: "Descriptive", rightZh: "描写式", noteEn: "Linguistics describes facts; it does not legislate correctness.", noteZh: "语言学描写事实，不规定对错" },
    { leftEn: "Synchronic", leftZh: "共时", rightEn: "Diachronic", rightZh: "历时", noteEn: "A frozen slice of one moment vs. the long movie of change.", noteZh: "某一时刻的切片 vs 历史演变的长镜头" },
    { leftEn: "Langue", leftZh: "语言", rightEn: "Parole", rightZh: "言语", noteEn: "Saussure: the shared social system vs. individual actual use.", noteZh: "索绪尔：社会共享的系统 vs 个人的实际使用" },
    { leftEn: "Competence", leftZh: "语言能力", rightEn: "Performance", rightZh: "语言运用", noteEn: "Chomsky: internalized knowledge vs. actual performance.", noteZh: "乔姆斯基：内在知识 vs 实际表现" },
  ] as PairItem[],
};

// ---------- S8 closing ----------
export const CLOSING = {
  kicker: { en: "NOW EXPLORE", zh: "进入图谱" } as Kicker,
  titlePre: "Every classic concept is a ",
  titleEm: "signpost",
  titlePost: " to the unexplored.",
  titleZh: "总论里的每个经典概念，都是通向未至之境的路标",
  bodyEn:
    "The full network is below — drag it, search it, open every node. Then keep scrolling: where does language go when meaning becomes geometry?",
  bodyZh: "完整概念网络就在下方——拖拽、搜索、点开每一个节点。继续往下：当意义变成几何，语言将去向何处？",
};

// ---------- S9 research teaser + 署名 ----------
export const RESEARCH = {
  kicker: { en: "NEXT · PART 3 PREVIEW", zh: "研究预告" } as Kicker,
  titleEn: "The Semantic Manifold Hypothesis",
  titleZh: "语义流形假说",
  teaserEn:
    "Meaning is not a bag of discrete symbols — it is a smooth manifold living in a high-dimensional continuous latent space.",
  teaserZh: "意义不是离散符号的集合，而是高维连续潜空间中的一张光滑流形。",
  signature: "Chen Jingyu & Zhang Zhaoyang · Group 1",
  signatureZh: "杭州电子科技大学 · 英语语言学概论",
};
